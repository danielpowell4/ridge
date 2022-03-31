class RecentCoachedLessonsByDay
  def initialize(coach:)
    @coach = coach
  end

  def to_send
    Lesson.find_by_sql(
      sql,
      start_date,
      start_date,
      end_date
    )
  end

  def start_date
    3.weeks.ago.beginning_of_week.to_date
  end

  def end_date
    Time.current.end_of_week.to_date
  end

  def sql
    "
      SELECT dateTable.day
      FROM
      (
          SELECT DATE(ADDDATE(?, INTERVAL @i:=@i+1 DAY)) AS DAY
          FROM (
            SELECT a.a
            FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
              CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
              CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
          ) a
          JOIN (SELECT @i := -1) r1
          WHERE
          @i < DATEDIFF(?, ?)
      ) AS dateTable
    "
  end
end


