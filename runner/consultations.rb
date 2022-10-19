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
pp_client_ids = Client.where(market_id: non_ab_market_ids)
min_consult_times_by_student = Consultation.group(:student_id).select('min(starts_at) AS starts_at, student_id')
first_consult_ids = Consultation.where("(starts_at, student_id) IN (?)", min_consult_times_by_student).select(:id)
pp_client_first_consults = Consultation.joins(:student).where(people: { client_id: pp_client_ids }, id: first_consult_ids)

weekly_report = []
sytd_report = []

week_starts.each do |week_start|
  puts "week_starting: #{week_start.to_s}"
  [
    ['Weekly', weekly_report, week_start.all_week],
    ['SYTD', sytd_report, lookup_sy_start(week_start)..week_start.end_of_week]
  ].each do |label, report, range|
    puts "- " + label

    consultations = pp_client_first_consults.where(starts_at: range)

    blob = {
      'SY Year' => lookup_sy_start(week_start).year,
      'SY Week' => lookup_sy_week(week_start),
      'Week Starting' => week_start.to_date.to_s,
      '1st Consultations' => consultations.count
    }

    ProjectType.find_each do |project_type|
      blob["#{project_type.name}"] = consultations.where(project_type: project_type).count
    end

    report << blob
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

# cat /Users/Powell/work/ridge/runner/consultations.rb | heroku run console --app=pp-dashboard-production --no-tty
