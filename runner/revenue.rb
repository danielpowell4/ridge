def lookup_sy_week(date_or_datetime)
  time = date_or_datetime.beginning_of_day
  sy_start = lookup_sy_start(time)

  weeks_since_start = (time.beginning_of_week - sy_start.beginning_of_week) / 1.week
  week_offset = 1 # first week 1, not 0

  weeks_since_start.to_i + week_offset
end

def lookup_sy_start(time)
  sy_start = Time.zone.local(time.year, 7)
  sy_start -= 1.year if sy_start > time
  sy_start
end

start_date = Time.zone.local(2018, 7, 2).to_date # start of SY18 # 4.weeks.ago.beginning_of_week.to_date
end_date = 1.week.ago.beginning_of_week.to_date

week_starts = (start_date..end_date).select { |date| date == date.beginning_of_week.to_date }

non_ab_market_ids = Market.where.not(name: 'ArborBridge').select(:id)

# limits
pp_billing_record_ids = BillingRecord.where(market_id: non_ab_market_ids).select(:id)
pp_lesson_ids = Lesson.not_deleted.joins(project: { students: :client }).where(clients: { market_id: non_ab_market_ids })

billing_item_types = %w[Lesson StrategySession ServicePackagePayment PracticeTestResult TestRegistrationFee ManualExpense MaterialRequest]

weekly_report = []
sytd_report = []

week_starts.each do |week_start|
  puts "week_starting: #{week_start.to_s}"
  [
    ['Weekly', weekly_report, week_start.all_week],
    ['SYTD', sytd_report, lookup_sy_start(week_start)..week_start.end_of_week]
  ].each do |label, report, range|
    puts "- " + label
    billing_records = BillingRecord.where(id: pp_billing_record_ids, created_at: range)
    approved_lessons = Lesson.eager_load(:summary).where(id: pp_lesson_ids, lesson_summaries: { approved_on: range })
    approved_lesson_hours = approved_lessons.total_hours

    row = {
      'SY Year' => lookup_sy_start(week_start).year,
      'SY Week' => lookup_sy_week(week_start),
      'Week Starting' => week_start.to_date.to_s,
      'Billed Rev' => billing_records.sum(:billed_amount).to_f
    }

    billing_item_types.each do |item_type|
      if item_type == 'Lesson'
        row["All #{item_type} Rev"] = billing_records.where(item_type: item_type).sum(:billed_amount).to_f

        ProjectType.order(:id).each do |project_type|
          project_type_lesson_ids = Lesson.joins(:project).where(projects: { project_type_id: project_type.id }).select(:id)
          row["#{project_type.name} #{item_type} Rev"] = billing_records.where(item_type: item_type, item_id: project_type_lesson_ids).sum(:billed_amount).to_f
        end
      elsif item_type == 'StrategySession'
        row["All #{item_type} Rev"] = billing_records.where(item_type: item_type).sum(:billed_amount).to_f

        ServiceType.where.not(strategy_session_stat_j: nil).order(:id).each do |service_type|
          service_strategy_session_ids = StrategySession.where(service_type_id: service_type.id).select(:id)
          row["#{service_type.name} StrategySession Rev"] =  billing_records.where(item_type: item_type, item_id: service_strategy_session_ids).sum(:billed_amount).to_f
        end
      else
        row["#{item_type} Rev"] = billing_records.where(item_type: item_type).sum(:billed_amount).to_f
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
