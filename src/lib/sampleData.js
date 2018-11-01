/*
puts JSON.pretty_generate(Lesson.active.where(canceled_at: nil).complete.where(coach_id: 316).where('lessons.scheduled_time > ?', 30.days.ago).map do |l|
  tt = ((l.summary.created_at - (l.scheduled_time + (l.duration * 60))) / 3600.0).round(2)
  { label: "#{l.display_name} \n #{l.scheduled_time.strftime("%a %m-%d-%y")} \n Time: #{tt}", scheduled_time: l.scheduled_time, turnaround: tt }
end)
*/

export const turnaround = [
  {
    label:
      "Mildred Labadie: Test Prep Math and Science \n Mon 10-29-18 \n Time: 0.48",
    scheduled_time: "2018-10-29 17:30:00 -0400",
    turnaround: 0.48
  },
  {
    label: "Kenisha Labadie: Math tutor \n Mon 10-29-18 \n Time: 1.51",
    scheduled_time: "2018-10-29 16:30:00 -0400",
    turnaround: 1.51
  },
  {
    label: "Trula Jerde: ACT Prep [Math/Science] \n Sat 10-27-18 \n Time: 0.15",
    scheduled_time: "2018-10-27 14:30:00 -0400",
    turnaround: 0.15
  },
  {
    label: "Cecile Torphy: ACT Math/Science Prep \n Sat 10-27-18 \n Time: 0.06",
    scheduled_time: "2018-10-27 13:15:00 -0400",
    turnaround: 0.06
  },
  {
    label: "Pierre Legros: Test Prep \n Sat 10-27-18 \n Time: 2.79",
    scheduled_time: "2018-10-27 10:30:00 -0400",
    turnaround: 2.79
  },
  {
    label:
      "Gregorio Lesch: Test Prep - Math/Science \n Sat 10-27-18 \n Time: 3.77",
    scheduled_time: "2018-10-27 09:30:00 -0400",
    turnaround: 3.77
  },
  {
    label: "Walton Schowalter: ACT math/science \n Fri 10-26-18 \n Time: 0.86",
    scheduled_time: "2018-10-26 18:40:00 -0400",
    turnaround: 0.86
  },
  {
    label: "Calvin Pouros: Test Prep Math \n Fri 10-26-18 \n Time: 0.08",
    scheduled_time: "2018-10-26 17:00:00 -0400",
    turnaround: 0.08
  },
  {
    label: "Armando Walter: ACT math/science \n Fri 10-26-18 \n Time: 1.27",
    scheduled_time: "2018-10-26 16:00:00 -0400",
    turnaround: 1.27
  },
  {
    label:
      "Quinn Rolfson: Test prep math/science \n Fri 10-26-18 \n Time: 2.75",
    scheduled_time: "2018-10-26 14:30:00 -0400",
    turnaround: 2.75
  },
  {
    label:
      "Joesph Kunze: ACT Prep Math and Science \n Thu 10-25-18 \n Time: -0.03",
    scheduled_time: "2018-10-25 20:00:00 -0400",
    turnaround: -0.03
  },
  {
    label:
      "Marielle Jaskolski: ACT Math and Science \n Thu 10-25-18 \n Time: 0.93",
    scheduled_time: "2018-10-25 18:45:00 -0400",
    turnaround: 0.93
  },
  {
    label:
      "Calista Cassin: Test prep math/science \n Thu 10-25-18 \n Time: 2.57",
    scheduled_time: "2018-10-25 17:05:00 -0400",
    turnaround: 2.57
  },
  {
    label: "Georgiann Gerhold: ACT math/science \n Thu 10-25-18 \n Time: 3.64",
    scheduled_time: "2018-10-25 16:15:00 -0400",
    turnaround: 3.64
  },
  {
    label:
      "Myrl Turner: Test Prep- math/sciecne  \n Wed 10-24-18 \n Time: 0.68",
    scheduled_time: "2018-10-24 21:00:00 -0400",
    turnaround: 0.68
  },
  {
    label:
      "Cheryll Lueilwitz: Test Prep- math/sciece \n Wed 10-24-18 \n Time: 1.82",
    scheduled_time: "2018-10-24 19:50:00 -0400",
    turnaround: 1.82
  },
  {
    label:
      "Teressa Greenfelder: Test Prep Math and Science \n Wed 10-24-18 \n Time: 0.1",
    scheduled_time: "2018-10-24 18:30:00 -0400",
    turnaround: 0.1
  },
  {
    label: "Armando Walter: ACT math/science \n Wed 10-24-18 \n Time: 0.23",
    scheduled_time: "2018-10-24 17:30:00 -0400",
    turnaround: 0.23
  },
  {
    label: "Galen Effertz: Math \n Wed 10-24-18 \n Time: 1.46",
    scheduled_time: "2018-10-24 16:00:00 -0400",
    turnaround: 1.46
  },
  {
    label: "Alberto Reilly: ACT math \n Wed 10-24-18 \n Time: 2.69",
    scheduled_time: "2018-10-24 14:45:00 -0400",
    turnaround: 2.69
  },
  {
    label: "Mildred Labadie: Math tutoring \n Tue 10-23-18 \n Time: 0.83",
    scheduled_time: "2018-10-23 20:15:00 -0400",
    turnaround: 0.83
  },
  {
    label:
      "Chan Willms: Test Prep- math/science  \n Tue 10-23-18 \n Time: 2.06",
    scheduled_time: "2018-10-23 19:00:00 -0400",
    turnaround: 2.06
  },
  {
    label: "Jonelle Keebler: Chemistry Honors \n Tue 10-23-18 \n Time: 3.79",
    scheduled_time: "2018-10-23 17:30:00 -0400",
    turnaround: 3.79
  },
  {
    label: "Ada Hudson: ACT Math \n Tue 10-23-18 \n Time: 5.0",
    scheduled_time: "2018-10-23 16:00:00 -0400",
    turnaround: 5.0
  },
  {
    label:
      "Octavio Zulauf: Test Prep-math/science \n Tue 10-23-18 \n Time: 6.22",
    scheduled_time: "2018-10-23 14:45:00 -0400",
    turnaround: 6.22
  },
  {
    label:
      "Tod Carroll: Test Prep- math/science  \n Mon 10-22-18 \n Time: -0.69",
    scheduled_time: "2018-10-22 20:15:00 -0400",
    turnaround: -0.69
  },
  {
    label:
      "Mildred Labadie: Test Prep Math and Science \n Mon 10-22-18 \n Time: 0.59",
    scheduled_time: "2018-10-22 19:00:00 -0400",
    turnaround: 0.59
  },
  {
    label: "Alberto Reilly: ACT math \n Mon 10-22-18 \n Time: 4.78",
    scheduled_time: "2018-10-22 14:45:00 -0400",
    turnaround: 4.78
  },
  {
    label:
      "Gregorio Lesch: Test Prep - Math/Science \n Sat 10-20-18 \n Time: 0.52",
    scheduled_time: "2018-10-20 17:15:00 -0400",
    turnaround: 0.52
  },
  {
    label: "Cecile Torphy: ACT Math/Science Prep \n Sat 10-20-18 \n Time: 0.25",
    scheduled_time: "2018-10-20 14:30:00 -0400",
    turnaround: 0.25
  },
  {
    label: "Jesica Kreiger: ACT Math/Science \n Sat 10-20-18 \n Time: 1.45",
    scheduled_time: "2018-10-20 13:30:00 -0400",
    turnaround: 1.45
  },
  {
    label: "Pierre Legros: Test Prep \n Sat 10-20-18 \n Time: 0.69",
    scheduled_time: "2018-10-20 10:30:00 -0400",
    turnaround: 0.69
  },
  {
    label: "Walton Schowalter: ACT math/science \n Sat 10-20-18 \n Time: 1.27",
    scheduled_time: "2018-10-20 09:45:00 -0400",
    turnaround: 1.27
  },
  {
    label: "Hyman Wisoky: Physics \n Fri 10-19-18 \n Time: 0.02",
    scheduled_time: "2018-10-19 17:30:00 -0400",
    turnaround: 0.02
  },
  {
    label: "Walton Schowalter: ACT math/science \n Fri 10-19-18 \n Time: 0.92",
    scheduled_time: "2018-10-19 16:00:00 -0400",
    turnaround: 0.92
  },
  {
    label: "Nida Bednar: ACT Science \n Fri 10-19-18 \n Time: 1.9",
    scheduled_time: "2018-10-19 14:45:00 -0400",
    turnaround: 1.9
  },
  {
    label:
      "Joesph Kunze: ACT Prep Math and Science \n Thu 10-18-18 \n Time: 0.25",
    scheduled_time: "2018-10-18 20:00:00 -0400",
    turnaround: 0.25
  },
  {
    label:
      "Marielle Jaskolski: ACT Math and Science \n Thu 10-18-18 \n Time: 1.73",
    scheduled_time: "2018-10-18 18:30:00 -0400",
    turnaround: 1.73
  },
  {
    label:
      "Quinn Rolfson: Test prep math/science \n Thu 10-18-18 \n Time: 2.68",
    scheduled_time: "2018-10-18 17:30:00 -0400",
    turnaround: 2.68
  },
  {
    label: "Georgiann Gerhold: ACT math/science \n Thu 10-18-18 \n Time: 4.15",
    scheduled_time: "2018-10-18 16:15:00 -0400",
    turnaround: 4.15
  },
  {
    label:
      "Calista Cassin: Test prep math/science \n Thu 10-18-18 \n Time: 5.13",
    scheduled_time: "2018-10-18 15:00:00 -0400",
    turnaround: 5.13
  },
  {
    label: "Myrl Turner: Test Prep- math/sciecne  \n Wed 10-17-18 \n Time: 1.4",
    scheduled_time: "2018-10-17 21:00:00 -0400",
    turnaround: 1.4
  },
  {
    label:
      "Cheryll Lueilwitz: Test Prep- math/sciece \n Wed 10-17-18 \n Time: 2.53",
    scheduled_time: "2018-10-17 19:50:00 -0400",
    turnaround: 2.53
  },
  {
    label:
      "Teressa Greenfelder: Test Prep Math and Science \n Wed 10-17-18 \n Time: 3.78",
    scheduled_time: "2018-10-17 18:30:00 -0400",
    turnaround: 3.78
  },
  {
    label: "Armando Walter: ACT math/science \n Wed 10-17-18 \n Time: 4.74",
    scheduled_time: "2018-10-17 17:30:00 -0400",
    turnaround: 4.74
  },
  {
    label: "Galen Effertz: Math \n Wed 10-17-18 \n Time: 6.43",
    scheduled_time: "2018-10-17 16:00:00 -0400",
    turnaround: 6.43
  },
  {
    label: "Alberto Reilly: ACT math \n Wed 10-17-18 \n Time: 7.38",
    scheduled_time: "2018-10-17 14:45:00 -0400",
    turnaround: 7.38
  },
  {
    label: "Mildred Labadie: Math tutoring \n Tue 10-16-18 \n Time: 0.7",
    scheduled_time: "2018-10-16 20:15:00 -0400",
    turnaround: 0.7
  },
  {
    label:
      "Chan Willms: Test Prep- math/science  \n Tue 10-16-18 \n Time: 1.93",
    scheduled_time: "2018-10-16 19:00:00 -0400",
    turnaround: 1.93
  },
  {
    label: "Lelah Wisozk: Test Prep \n Tue 10-16-18 \n Time: 3.41",
    scheduled_time: "2018-10-16 17:30:00 -0400",
    turnaround: 3.41
  },
  {
    label: "Edythe Luettgen: Test Prep - Math \n Tue 10-16-18 \n Time: 0.05",
    scheduled_time: "2018-10-16 16:00:00 -0400",
    turnaround: 0.05
  },
  {
    label:
      "Octavio Zulauf: Test Prep-math/science \n Tue 10-16-18 \n Time: 1.33",
    scheduled_time: "2018-10-16 14:45:00 -0400",
    turnaround: 1.33
  },
  {
    label: "Jonelle Keebler: Chemistry Honors \n Mon 10-15-18 \n Time: 0.0",
    scheduled_time: "2018-10-15 20:30:00 -0400",
    turnaround: 0.0
  },
  {
    label:
      "Mildred Labadie: Test Prep Math and Science \n Mon 10-15-18 \n Time: 0.5",
    scheduled_time: "2018-10-15 19:00:00 -0400",
    turnaround: 0.5
  },
  {
    label: "Dominique Schamberger: Chem Tutoring \n Mon 10-15-18 \n Time: 0.56",
    scheduled_time: "2018-10-15 17:30:00 -0400",
    turnaround: 0.56
  },
  {
    label: "Alberto Reilly: ACT math \n Mon 10-15-18 \n Time: 2.04",
    scheduled_time: "2018-10-15 16:00:00 -0400",
    turnaround: 2.04
  },
  {
    label: "Hyman Wisoky: Physics \n Sun 10-14-18 \n Time: 0.04",
    scheduled_time: "2018-10-14 09:30:00 -0400",
    turnaround: 0.04
  },
  {
    label:
      "Gregorio Lesch: Test Prep - Math/Science \n Sat 10-13-18 \n Time: 0.48",
    scheduled_time: "2018-10-13 17:15:00 -0400",
    turnaround: 0.48
  },
  {
    label: "Cecile Torphy: ACT Math/Science Prep \n Sat 10-13-18 \n Time: 0.82",
    scheduled_time: "2018-10-13 14:30:00 -0400",
    turnaround: 0.82
  },
  {
    label: "Trula Jerde: ACT Prep [Math/Science] \n Sat 10-13-18 \n Time: 1.79",
    scheduled_time: "2018-10-13 13:30:00 -0400",
    turnaround: 1.79
  },
  {
    label: "Nita Koelpin: Math Tutoring \n Sat 10-13-18 \n Time: 2.93",
    scheduled_time: "2018-10-13 12:20:00 -0400",
    turnaround: 2.93
  },
  {
    label:
      "Tod Carroll: Test Prep- math/science  \n Sat 10-13-18 \n Time: 4.24",
    scheduled_time: "2018-10-13 11:00:00 -0400",
    turnaround: 4.24
  },
  {
    label: "Cheryl Weber: ACT Prep [Math] \n Fri 10-12-18 \n Time: 0.76",
    scheduled_time: "2018-10-12 18:45:00 -0400",
    turnaround: 0.76
  },
  {
    label: "Walton Schowalter: ACT math/science \n Fri 10-12-18 \n Time: 0.32",
    scheduled_time: "2018-10-12 17:15:00 -0400",
    turnaround: 0.32
  },
  {
    label: "Ada Hudson: ACT Math \n Fri 10-12-18 \n Time: 1.55",
    scheduled_time: "2018-10-12 16:00:00 -0400",
    turnaround: 1.55
  },
  {
    label: "Nida Bednar: ACT Science \n Fri 10-12-18 \n Time: 3.02",
    scheduled_time: "2018-10-12 14:45:00 -0400",
    turnaround: 3.02
  },
  {
    label:
      "Quinn Rolfson: Test prep math/science \n Thu 10-11-18 \n Time: 0.08",
    scheduled_time: "2018-10-11 17:30:00 -0400",
    turnaround: 0.08
  },
  {
    label: "Georgiann Gerhold: ACT math/science \n Thu 10-11-18 \n Time: 1.54",
    scheduled_time: "2018-10-11 16:15:00 -0400",
    turnaround: 1.54
  },
  {
    label:
      "Calista Cassin: Test prep math/science \n Thu 10-11-18 \n Time: 4.21",
    scheduled_time: "2018-10-11 15:00:00 -0400",
    turnaround: 4.21
  },
  {
    label:
      "Marielle Jaskolski: ACT Math and Science \n Thu 10-11-18 \n Time: 2.51",
    scheduled_time: "2018-10-11 15:00:00 -0400",
    turnaround: 2.51
  },
  {
    label:
      "Cheryll Lueilwitz: Test Prep- math/sciece \n Wed 10-10-18 \n Time: 0.69",
    scheduled_time: "2018-10-10 19:50:00 -0400",
    turnaround: 0.69
  },
  {
    label:
      "Teressa Greenfelder: Test Prep Math and Science \n Wed 10-10-18 \n Time: 1.99",
    scheduled_time: "2018-10-10 18:30:00 -0400",
    turnaround: 1.99
  },
  {
    label: "Armando Walter: ACT math/science \n Wed 10-10-18 \n Time: 2.97",
    scheduled_time: "2018-10-10 17:30:00 -0400",
    turnaround: 2.97
  },
  {
    label: "Mildred Labadie: Math tutoring \n Tue 10-09-18 \n Time: 0.61",
    scheduled_time: "2018-10-09 20:15:00 -0400",
    turnaround: 0.61
  },
  {
    label:
      "Chan Willms: Test Prep- math/science  \n Tue 10-09-18 \n Time: 2.08",
    scheduled_time: "2018-10-09 19:00:00 -0400",
    turnaround: 2.08
  },
  {
    label: "Lelah Wisozk: Test Prep \n Tue 10-09-18 \n Time: 3.54",
    scheduled_time: "2018-10-09 17:30:00 -0400",
    turnaround: 3.54
  },
  {
    label: "Edythe Luettgen: Test Prep - Math \n Tue 10-09-18 \n Time: 5.0",
    scheduled_time: "2018-10-09 16:00:00 -0400",
    turnaround: 5.0
  },
  {
    label:
      "Octavio Zulauf: Test Prep-math/science \n Tue 10-09-18 \n Time: 6.23",
    scheduled_time: "2018-10-09 14:45:00 -0400",
    turnaround: 6.23
  },
  {
    label:
      "Joesph Kunze: ACT Prep Math and Science \n Mon 10-08-18 \n Time: 0.41",
    scheduled_time: "2018-10-08 20:00:00 -0400",
    turnaround: 0.41
  },
  {
    label: "Jesica Kreiger: ACT Math/Science \n Mon 10-08-18 \n Time: 0.32",
    scheduled_time: "2018-10-08 16:30:00 -0400",
    turnaround: 0.32
  },
  {
    label: "Trula Jerde: ACT Prep [Math/Science] \n Mon 10-08-18 \n Time: 1.29",
    scheduled_time: "2018-10-08 15:30:00 -0400",
    turnaround: 1.29
  },
  {
    label: "Tod Carroll: Test Prep- math/science  \n Mon 10-08-18 \n Time: 6.1",
    scheduled_time: "2018-10-08 14:15:00 -0400",
    turnaround: 6.1
  },
  {
    label:
      "Gregorio Lesch: Test Prep - Math/Science \n Mon 10-08-18 \n Time: 5.25",
    scheduled_time: "2018-10-08 11:30:00 -0400",
    turnaround: 5.25
  },
  {
    label: "Nida Bednar: ACT Science \n Mon 10-08-18 \n Time: 6.7",
    scheduled_time: "2018-10-08 10:00:00 -0400",
    turnaround: 6.7
  },
  {
    label:
      "Marielle Jaskolski: ACT Math and Science \n Sat 10-06-18 \n Time: 0.82",
    scheduled_time: "2018-10-06 13:30:00 -0400",
    turnaround: 0.82
  },
  {
    label: "Cheryl Weber: ACT Prep [Math] \n Sat 10-06-18 \n Time: 2.3",
    scheduled_time: "2018-10-06 12:00:00 -0400",
    turnaround: 2.3
  },
  {
    label: "Cecile Torphy: ACT Math/Science Prep \n Sat 10-06-18 \n Time: 3.28",
    scheduled_time: "2018-10-06 11:00:00 -0400",
    turnaround: 3.28
  },
  {
    label: "Pierre Legros: Test Prep \n Sat 10-06-18 \n Time: 4.49",
    scheduled_time: "2018-10-06 09:45:00 -0400",
    turnaround: 4.49
  },
  {
    label: "Mariano Keebler: AP Calculus BC \n Fri 10-05-18 \n Time: 0.37",
    scheduled_time: "2018-10-05 17:15:00 -0400",
    turnaround: 0.37
  },
  {
    label: "Ada Hudson: ACT Math \n Fri 10-05-18 \n Time: 1.61",
    scheduled_time: "2018-10-05 16:00:00 -0400",
    turnaround: 1.61
  },
  {
    label:
      "Quinn Rolfson: Test prep math/science \n Fri 10-05-18 \n Time: 3.09",
    scheduled_time: "2018-10-05 14:30:00 -0400",
    turnaround: 3.09
  },
  {
    label:
      "Calista Cassin: Test prep math/science \n Thu 10-04-18 \n Time: 0.47",
    scheduled_time: "2018-10-04 17:00:00 -0400",
    turnaround: 0.47
  },
  {
    label: "Georgiann Gerhold: ACT math/science \n Thu 10-04-18 \n Time: 1.5",
    scheduled_time: "2018-10-04 16:15:00 -0400",
    turnaround: 1.5
  },
  {
    label:
      "Myrl Turner: Test Prep- math/sciecne  \n Wed 10-03-18 \n Time: 0.84",
    scheduled_time: "2018-10-03 21:00:00 -0400",
    turnaround: 0.84
  },
  {
    label:
      "Cheryll Lueilwitz: Test Prep- math/sciece \n Wed 10-03-18 \n Time: 1.98",
    scheduled_time: "2018-10-03 19:50:00 -0400",
    turnaround: 1.98
  },
  {
    label:
      "Teressa Greenfelder: Test Prep Math and Science \n Wed 10-03-18 \n Time: 3.29",
    scheduled_time: "2018-10-03 18:30:00 -0400",
    turnaround: 3.29
  },
  {
    label: "Armando Walter: ACT math/science \n Wed 10-03-18 \n Time: 4.15",
    scheduled_time: "2018-10-03 17:30:00 -0400",
    turnaround: 4.15
  },
  {
    label: "Galen Effertz: Math \n Wed 10-03-18 \n Time: 0.51",
    scheduled_time: "2018-10-03 16:00:00 -0400",
    turnaround: 0.51
  },
  {
    label: "Mildred Labadie: Math tutoring \n Tue 10-02-18 \n Time: 0.17",
    scheduled_time: "2018-10-02 21:15:00 -0400",
    turnaround: 0.17
  },
  {
    label:
      "Chan Willms: Test Prep- math/science  \n Tue 10-02-18 \n Time: 1.24",
    scheduled_time: "2018-10-02 20:10:00 -0400",
    turnaround: 1.24
  },
  {
    label: "Dominique Schamberger: Chem Tutoring \n Tue 10-02-18 \n Time: 2.38",
    scheduled_time: "2018-10-02 19:00:00 -0400",
    turnaround: 2.38
  },
  {
    label: "Lelah Wisozk: Test Prep \n Tue 10-02-18 \n Time: 0.39",
    scheduled_time: "2018-10-02 17:30:00 -0400",
    turnaround: 0.39
  },
  {
    label:
      "Octavio Zulauf: Test Prep-math/science \n Tue 10-02-18 \n Time: 1.34",
    scheduled_time: "2018-10-02 14:45:00 -0400",
    turnaround: 1.34
  }
];
