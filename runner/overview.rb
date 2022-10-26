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

start_date = 4.weeks.ago.beginning_of_week.to_date # Time.zone.local(2018, 7, 2).to_date # start of SY18
end_date = 1.week.ago.beginning_of_week.to_date

week_starts = (start_date..end_date).select { |date| date == date.beginning_of_week.to_date }

non_ab_market_ids = Market.where.not(name: 'ArborBridge').select(:id)
pp_service_type_ids = ServiceType.where(client_type: ClientType.private_prep).select(:id)
proxy_ss_lesson_ids = LessonSubjectsLesson.joins(:lesson_subject).where("lesson_subjects.name LIKE '%Strategy Session%'").select(:lesson_id)

# limits
pp_billing_record_ids = BillingRecord.where(market_id: non_ab_market_ids).select(:id)
pp_lesson_ids = Lesson.not_deleted.joins(project: { students: :client }).where(clients: { market_id: non_ab_market_ids })
pp_client_ids = Client.where(market_id: non_ab_market_ids)

pp_client_referrals = Referral.where(referred_type: 'Client', referred_id: pp_client_ids, referred_by_type: 'Client', referred_by_id: pp_client_ids)
pp_client_projects = Project.where(service_type_id: pp_service_type_ids)
pp_website_leads = ReferralType.website.referrals.where(referred_type: 'Client', referred_id: pp_client_ids)

min_consult_times_by_student = Consultation.group(:student_id).select('min(starts_at) AS starts_at, student_id')
first_consult_ids = Consultation.where("(starts_at, student_id) IN (?)", min_consult_times_by_student).select(:id)
pp_client_first_consults = Consultation.joins(:student).where(people: { client_id: pp_client_ids }, id: first_consult_ids)

# helpers
sat_act_project_type_id = ProjectType.find_by!(name: 'SAT/ACT Prep').id
online_lesson_cat = LessonLocationCategory.find_by!(name: 'Online')

weekly_report = []
sytd_report = []

week_starts.each do |start_date|
  puts "week_starting: #{start_date.to_s}"
  week_start = start_date.beginning_of_week # ensures date time
  [
    ['Weekly', weekly_report, week_start.all_week],
    ['SYTD', sytd_report, lookup_sy_start(week_start)..week_start.end_of_week]
  ].each do |label, report, range|
    puts "- " + label
    billing_records = BillingRecord.where(id: pp_billing_record_ids, created_at: range)
    approved_lessons = Lesson.joins(:summary).where(id: pp_lesson_ids, lesson_summaries: { approved_on: range })
    approved_lesson_hours = approved_lessons.total_hours

    sat_act_approved_lessons = approved_lessons.joins(:project).where(projects: { project_type_id: sat_act_project_type_id })
    sat_act_approved_hours = sat_act_approved_lessons.total_hours

    active_client_ids = billing_records.select(:client_id).distinct.pluck(:client_id)
    hours_per_client = active_client_ids.map do |client_id|
      client_lesson_ids = billing_records.where(client_id: client_id, item_type: 'Lesson').select(:item_id)
      Lesson.where(id: client_lesson_ids).total_hours || 0
    end
    hours_per_client_avg = hours_per_client.sum / [hours_per_client.count, 1].max # avoids ZeroDivisionError

    lesson_payroll_records = PayrollRecord.where(activity_type: 'Lesson', activity_id: approved_lessons.select(:id), duration: 1.., billing_rate: 1..)
    lesson_billing_records = BillingRecord.where(item_type: 'Lesson', item_id: lesson_payroll_records.select(:activity_id))
    salaried_records = lesson_payroll_records.where(counts_toward_quota: true)
    salaried_lessons = Lesson.where(id: salaried_records.select(:activity_id))

    online_lessons = approved_lessons.where(location_category: online_lesson_cat)
    online_payroll_records = PayrollRecord.where(activity_type: 'Lesson', activity_id: online_lessons.select(:id))
    online_bill_rates = online_payroll_records.pluck(:billing_rate).compact
    online_bill_rate_count = [online_bill_rates.count, 1].max
    in_person_payroll_records = lesson_payroll_records.where.not(id: online_payroll_records.select(:id))
    in_person_bill_rates = in_person_payroll_records.pluck(:billing_rate).compact
    in_person_bill_rate_count = [in_person_bill_rates.count, 1].max

    tutor_wages = lesson_payroll_records.select('(duration / 60.0) * pay_rate * duration_multiplier * pay_multiplier AS "wage"').map { |r| r['wage'] }.sum.to_f.round(2)
    lesson_billing_record_rev = BillingRecord.where(item_type: 'Lesson', item_id: lesson_payroll_records.select(:activity_id)).sum(:billed_amount).to_f.round(2)
    lesson_package_txn_rev = PurchasedServiceUnitTransaction.where(item_type: 'Lesson', item_id: lesson_payroll_records.select(:activity_id)).sum(:value).to_f.round(2)
    lesson_rev = lesson_billing_record_rev + lesson_package_txn_rev

    avg_pay_rate_percentage = tutor_wages / [lesson_rev, 1].max

    client_referrals = pp_client_referrals.where(created_at: range)
    projects_added = pp_client_projects.where(created_at: range)
    consultations = pp_client_first_consults.where(starts_at: range)
    website_leads = pp_website_leads.where(created_at: range)

    report << {
      'SY Year' => lookup_sy_start(week_start).year,
      'SY Week' => lookup_sy_week(week_start),
      'Week Starting' => week_start.to_date.to_s,
      'Billed Items' => billing_records.sum(:billed_amount).to_f,
      'Active Families' => active_client_ids.count,
      'Approved Hours' => approved_lesson_hours,
      'Hour per Client' => hours_per_client_avg.round(2).to_f,
      'Active Tutors' => approved_lessons.select(:coach_id).distinct.count,
      'Online %' => (online_lessons.total_hours / approved_lesson_hours).round(4).to_f,
      'Salaried Coach %' => (salaried_lessons.total_hours / approved_lesson_hours).round(4).to_f,
      'SAT/ACT Hours %' => (sat_act_approved_hours / approved_lesson_hours).round(4).to_f,
      'Tutor Pay Rate %' => avg_pay_rate_percentage.round(4).to_f,
      'Avg Online Bill Rate' => (online_bill_rates.sum / online_bill_rate_count).round(2).to_f,
      'Avg In-Person Bill Rate' => (in_person_bill_rates.sum / in_person_bill_rate_count).round(2).to_f,
      'Client Referrals' => client_referrals.count,
      'Contact Us Forms' => website_leads.count,
      'Projects Added' => projects_added.count,
      '1st Consultations' => consultations.count
    }
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

# cat /Users/Powell/work/ridge/runner/overview.rb | heroku run console --app=pp-dashboard-production --no-tty
