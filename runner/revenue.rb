def lookup_sy_week(date_or_datetime)
  time = date_or_datetime.beginning_of_day
  sy_start = lookup_sy_start(time)

  weeks_since_start = (time.beginning_of_week - sy_start.beginning_of_week) / 1.week
  week_offset = 1 # first week 1, not 0

  weeks_since_start.to_i + week_offset
end

def lookup_sy_start(date_or_datetime)
  time = date_or_datetime.beginning_of_day
  sy_start = Time.zone.local(time.year, 7)
  sy_start -= 1.year if sy_start > time
  sy_start
end

start_date = Time.zone.local(2018, 7, 2).to_date # start of SY18
end_date = 1.week.ago.beginning_of_week.to_date

week_starts = (start_date..end_date).select { |date| date == date.beginning_of_week.to_date }

# limits
pp_profiles = BillingProfile.joins(:client_type_assignment).where(client_type_assignments: { client_type_id: ClientType.private_prep.id })
pp_billing_record_ids = BillingRecord.where(billing_profile_id: pp_profiles.select(:id)).select(:id)

invoiced_packages = BillingRecord.where(item_type: 'ServicePackagePayment')
class_package_payments = ServicePackagePayment.where.not(id: invoiced_packages.select(:item_id)).where(promotion: false)
tpc_class_payment_ids = class_package_payments.joins(purchased_service_package: :service_package).where(service_packages: { service_type_id: ServiceType.test_prep_courses.id }).select(:id)

billing_item_types = [
  ['Lessons', ['Lesson']],
  ['Packages', ['ServicePackagePayment']],
  ['Strategy Sessions', ['StrategySession']],
  ['Practice Tests', ['PracticeTestResult', 'PracticeTestRegistration']],
  ['Test Fees', ['TestRegistrationFee']],
  ['Curriculum Fees', ['MaterialRequest']],
  ['Misc Billing', ['ManualExpense']]
]

weekly_report = []
sytd_report = []

week_starts.each do |start_date|
  puts "week_starting: #{start_date.to_s}"
  week_start = start_date.beginning_of_day

  [
    ['Weekly', weekly_report, week_start.all_week],
    ['SYTD', sytd_report, lookup_sy_start(week_start)..week_start.end_of_week]
  ].each do |label, report, range|
    puts "- " + label
    billing_records = BillingRecord.where(id: pp_billing_record_ids, created_at: range)
    class_payments = ServicePackagePayment.where(id: tpc_class_payment_ids, due_at: range)

    row = {
      'SY Year' => lookup_sy_start(week_start).year,
      'SY Week' => lookup_sy_week(week_start),
      'Week Starting' => week_start.to_date.to_s,
      'Class Payments' => class_payments.sum(:amount).to_f
    }

    row['All Items'] = billing_records.sum(:billed_amount).to_f + row['Class Payments']

    billing_item_types.each do |label, item_types|
      if label == 'Lessons'
        row["All #{label}"] = billing_records.where(item_type: item_types).sum(:billed_amount).to_f

        ProjectType.order(:id).each do |project_type|
          project_type_lesson_ids = Lesson.joins(:project).where(projects: { project_type_id: project_type.id }).select(:id)
          row["#{project_type.name} #{label}"] = billing_records.where(item_type: item_types, item_id: project_type_lesson_ids).sum(:billed_amount).to_f
        end
      elsif label == 'Strategy Sessions'
        row["All #{label}"] = billing_records.where(item_type: item_types).sum(:billed_amount).to_f

        ServiceType.where.not(strategy_session_stat_j: nil).order(:id).each do |service_type|
          service_strategy_session_ids = StrategySession.where(service_type_id: service_type.id).select(:id)
          row["#{service_type.name} #{label}"] =  billing_records.where(item_type: item_types, item_id: service_strategy_session_ids).sum(:billed_amount).to_f
        end
      else
        row[label] = billing_records.where(item_type: item_types).sum(:billed_amount).to_f
      end
    end

    report << row
  end
end

puts "\n\n\n\n\n"
puts "WEEKLY:"
puts "\n\n\n\n\n"
puts weekly_report.to_json

puts "\n\n\n\n\n"
puts "SYTD:"
puts "\n\n\n\n\n"
puts sytd_report.to_json
puts "\n\n\n\n\n"

# cat /Users/Powell/work/ridge/runner/revenue.rb | heroku run console --app=pp-dashboard-production --no-tty
