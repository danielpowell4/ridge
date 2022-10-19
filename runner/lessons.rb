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

start_date = Time.zone.local(2018, 7, 2).to_date # start of SY18
end_date = 1.week.ago.beginning_of_week.to_date

week_starts = (start_date..end_date).select { |date| date == date.beginning_of_week.to_date }

pp_service_type_ids = ServiceType.where(client_type: ClientType.private_prep).select(:id)
pp_lesson_ids = Lesson.not_deleted.joins(:project).where(projects: { service_type_id: pp_service_type_ids })

weekly_report = []
sytd_report = []

week_starts.each do |week_start|
  puts "week_starting: #{week_start.to_s}"
  [
    ['Weekly', weekly_report, week_start.all_week],
    ['SYTD', sytd_report, lookup_sy_start(week_start)..week_start.end_of_week]
  ].each do |label, report, range|
    puts "- " + label
    approved_lessons = Lesson.joins(:summary).where(id: pp_lesson_ids, lesson_summaries: { approved_on: range })

    blob = {
      'SY Year' => lookup_sy_start(week_start).year,
      'SY Week' => lookup_sy_week(week_start),
      'Week Starting' => week_start.to_date.to_s,
      'Approved Hours' => approved_lessons.total_hours
    }

    # by project type
    ProjectType.find_each do |project_type|
      project_type_project_ids = Project.where(project_type_id: project_type.id).select(:id)
      blob["#{project_type.name} Hours"] = approved_lessons.where(project_id: project_type_project_ids).total_hours
    end

    # by location
    LessonLocationCategory.available.each do |location_category|
      blob["#{location_category.name} Hours"] = approved_lessons.where(location_category: location_category).total_hours
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

# cat /Users/Powell/work/ridge/runner/lessons.rb | heroku run console --app=pp-dashboard-production --no-tty
