// Lesson.active.where(canceled_at: nil).complete.where(coach_id: 316).where('lessons.scheduled_time > ?', 30.days.ago).map do |l|
//   tt = ((l.summary.created_at - (l.scheduled_time + (l.duration * 60))) / 3600.0).round(2)
//   { label: "#{l.display_name} \n #{l.scheduled_time.strftime("%a %m-%d-%y")} \n Time: #{tt}", scheduled_time: l.scheduled_time, turnaround: tt }
// end
// _.as_json

export const turnaround = [
  {
    label: "Cristopher Sipes: Physics \n Sun 10-14-18 \n Time: 0.04",
    scheduled_time: "2018-10-14T09:30:00.000-04:00",
    turnaround: 0.04
  },
  {
    label:
      "Lucius Pfeffer: Test Prep - Math/Science \n Sat 10-13-18 \n Time: 0.48",
    scheduled_time: "2018-10-13T17:15:00.000-04:00",
    turnaround: 0.48
  },
  {
    label:
      "Altha Hettinger: ACT Math/Science Prep \n Sat 10-13-18 \n Time: 0.82",
    scheduled_time: "2018-10-13T14:30:00.000-04:00",
    turnaround: 0.82
  },
  {
    label:
      "Gisele Deckow: ACT Prep [Math/Science] \n Sat 10-13-18 \n Time: 1.79",
    scheduled_time: "2018-10-13T13:30:00.000-04:00",
    turnaround: 1.79
  },
  {
    label: "Trena Herman: Math Tutoring \n Sat 10-13-18 \n Time: 2.93",
    scheduled_time: "2018-10-13T12:20:00.000-04:00",
    turnaround: 2.93
  },
  {
    label:
      "Merrie Simonis: Test Prep- math/science  \n Sat 10-13-18 \n Time: 4.24",
    scheduled_time: "2018-10-13T11:00:00.000-04:00",
    turnaround: 4.24
  },
  {
    label: "Palma Watsica: ACT Prep [Math] \n Fri 10-12-18 \n Time: 0.76",
    scheduled_time: "2018-10-12T18:45:00.000-04:00",
    turnaround: 0.76
  },
  {
    label: "Son Bosco: ACT math/science \n Fri 10-12-18 \n Time: 0.32",
    scheduled_time: "2018-10-12T17:15:00.000-04:00",
    turnaround: 0.32
  },
  {
    label: "Theda Okuneva: ACT Math \n Fri 10-12-18 \n Time: 1.55",
    scheduled_time: "2018-10-12T16:00:00.000-04:00",
    turnaround: 1.55
  },
  {
    label: "Elodia Balistreri: ACT Science \n Fri 10-12-18 \n Time: 3.02",
    scheduled_time: "2018-10-12T14:45:00.000-04:00",
    turnaround: 3.02
  },
  {
    label:
      "Ryann Hermann: Test prep math/science \n Thu 10-11-18 \n Time: 0.08",
    scheduled_time: "2018-10-11T17:30:00.000-04:00",
    turnaround: 0.08
  },
  {
    label: "Sandie Emmerich: ACT math/science \n Thu 10-11-18 \n Time: 1.54",
    scheduled_time: "2018-10-11T16:15:00.000-04:00",
    turnaround: 1.54
  },
  {
    label:
      "Cornell Wuckert: Test prep math/science \n Thu 10-11-18 \n Time: 4.21",
    scheduled_time: "2018-10-11T15:00:00.000-04:00",
    turnaround: 4.21
  },
  {
    label: "Zonia Hilll: ACT Math and Science \n Thu 10-11-18 \n Time: 2.51",
    scheduled_time: "2018-10-11T15:00:00.000-04:00",
    turnaround: 2.51
  },
  {
    label:
      "Mahalia Ruecker: Test Prep- math/sciece \n Wed 10-10-18 \n Time: 0.69",
    scheduled_time: "2018-10-10T19:50:00.000-04:00",
    turnaround: 0.69
  },
  {
    label:
      "Val Bergstrom: Test Prep Math and Science \n Wed 10-10-18 \n Time: 1.99",
    scheduled_time: "2018-10-10T18:30:00.000-04:00",
    turnaround: 1.99
  },
  {
    label: "Anabel Wehner: ACT math/science \n Wed 10-10-18 \n Time: 2.97",
    scheduled_time: "2018-10-10T17:30:00.000-04:00",
    turnaround: 2.97
  },
  {
    label: "Rufus Bernier: Math tutoring \n Tue 10-09-18 \n Time: 0.61",
    scheduled_time: "2018-10-09T20:15:00.000-04:00",
    turnaround: 0.61
  },
  {
    label:
      "Rufina Huels: Test Prep- math/science  \n Tue 10-09-18 \n Time: 2.08",
    scheduled_time: "2018-10-09T19:00:00.000-04:00",
    turnaround: 2.08
  },
  {
    label: "Dennis Hansen: Test Prep \n Tue 10-09-18 \n Time: 3.54",
    scheduled_time: "2018-10-09T17:30:00.000-04:00",
    turnaround: 3.54
  },
  {
    label: "Venita Nitzsche: Test Prep - Math \n Tue 10-09-18 \n Time: 5.0",
    scheduled_time: "2018-10-09T16:00:00.000-04:00",
    turnaround: 5.0
  },
  {
    label: "Joya Beier: Test Prep-math/science \n Tue 10-09-18 \n Time: 6.23",
    scheduled_time: "2018-10-09T14:45:00.000-04:00",
    turnaround: 6.23
  },
  {
    label:
      "Lenore Tillman: ACT Prep Math and Science \n Mon 10-08-18 \n Time: 0.41",
    scheduled_time: "2018-10-08T20:00:00.000-04:00",
    turnaround: 0.41
  },
  {
    label: "Barrett Gulgowski: ACT Math/Science \n Mon 10-08-18 \n Time: 0.32",
    scheduled_time: "2018-10-08T16:30:00.000-04:00",
    turnaround: 0.32
  },
  {
    label:
      "Gisele Deckow: ACT Prep [Math/Science] \n Mon 10-08-18 \n Time: 1.29",
    scheduled_time: "2018-10-08T15:30:00.000-04:00",
    turnaround: 1.29
  },
  {
    label:
      "Merrie Simonis: Test Prep- math/science  \n Mon 10-08-18 \n Time: 6.1",
    scheduled_time: "2018-10-08T14:15:00.000-04:00",
    turnaround: 6.1
  },
  {
    label:
      "Lucius Pfeffer: Test Prep - Math/Science \n Mon 10-08-18 \n Time: 5.25",
    scheduled_time: "2018-10-08T11:30:00.000-04:00",
    turnaround: 5.25
  },
  {
    label: "Elodia Balistreri: ACT Science \n Mon 10-08-18 \n Time: 6.7",
    scheduled_time: "2018-10-08T10:00:00.000-04:00",
    turnaround: 6.7
  },
  {
    label: "Zonia Hilll: ACT Math and Science \n Sat 10-06-18 \n Time: 0.82",
    scheduled_time: "2018-10-06T13:30:00.000-04:00",
    turnaround: 0.82
  },
  {
    label: "Palma Watsica: ACT Prep [Math] \n Sat 10-06-18 \n Time: 2.3",
    scheduled_time: "2018-10-06T12:00:00.000-04:00",
    turnaround: 2.3
  },
  {
    label:
      "Altha Hettinger: ACT Math/Science Prep \n Sat 10-06-18 \n Time: 3.28",
    scheduled_time: "2018-10-06T11:00:00.000-04:00",
    turnaround: 3.28
  },
  {
    label: "Bart Zieme: Test Prep \n Sat 10-06-18 \n Time: 4.49",
    scheduled_time: "2018-10-06T09:45:00.000-04:00",
    turnaround: 4.49
  },
  {
    label: "Gerry Bahringer: AP Calculus BC \n Fri 10-05-18 \n Time: 0.37",
    scheduled_time: "2018-10-05T17:15:00.000-04:00",
    turnaround: 0.37
  },
  {
    label: "Theda Okuneva: ACT Math \n Fri 10-05-18 \n Time: 1.61",
    scheduled_time: "2018-10-05T16:00:00.000-04:00",
    turnaround: 1.61
  },
  {
    label:
      "Ryann Hermann: Test prep math/science \n Fri 10-05-18 \n Time: 3.09",
    scheduled_time: "2018-10-05T14:30:00.000-04:00",
    turnaround: 3.09
  },
  {
    label:
      "Cornell Wuckert: Test prep math/science \n Thu 10-04-18 \n Time: 0.47",
    scheduled_time: "2018-10-04T17:00:00.000-04:00",
    turnaround: 0.47
  },
  {
    label: "Sandie Emmerich: ACT math/science \n Thu 10-04-18 \n Time: 1.5",
    scheduled_time: "2018-10-04T16:15:00.000-04:00",
    turnaround: 1.5
  },
  {
    label:
      "Delcie Jones: Test Prep- math/sciecne  \n Wed 10-03-18 \n Time: 0.84",
    scheduled_time: "2018-10-03T21:00:00.000-04:00",
    turnaround: 0.84
  },
  {
    label:
      "Mahalia Ruecker: Test Prep- math/sciece \n Wed 10-03-18 \n Time: 1.98",
    scheduled_time: "2018-10-03T19:50:00.000-04:00",
    turnaround: 1.98
  },
  {
    label:
      "Val Bergstrom: Test Prep Math and Science \n Wed 10-03-18 \n Time: 3.29",
    scheduled_time: "2018-10-03T18:30:00.000-04:00",
    turnaround: 3.29
  },
  {
    label: "Anabel Wehner: ACT math/science \n Wed 10-03-18 \n Time: 4.14",
    scheduled_time: "2018-10-03T17:30:00.000-04:00",
    turnaround: 4.14
  },
  {
    label: "Jake Ward: Math \n Wed 10-03-18 \n Time: 0.51",
    scheduled_time: "2018-10-03T16:00:00.000-04:00",
    turnaround: 0.51
  },
  {
    label: "Rufus Bernier: Math tutoring \n Tue 10-02-18 \n Time: 0.17",
    scheduled_time: "2018-10-02T21:15:00.000-04:00",
    turnaround: 0.17
  },
  {
    label:
      "Rufina Huels: Test Prep- math/science  \n Tue 10-02-18 \n Time: 1.24",
    scheduled_time: "2018-10-02T20:10:00.000-04:00",
    turnaround: 1.24
  },
  {
    label: "Solomon Moore: Chem Tutoring \n Tue 10-02-18 \n Time: 2.38",
    scheduled_time: "2018-10-02T19:00:00.000-04:00",
    turnaround: 2.38
  },
  {
    label: "Dennis Hansen: Test Prep \n Tue 10-02-18 \n Time: 0.39",
    scheduled_time: "2018-10-02T17:30:00.000-04:00",
    turnaround: 0.39
  },
  {
    label: "Joya Beier: Test Prep-math/science \n Tue 10-02-18 \n Time: 1.34",
    scheduled_time: "2018-10-02T14:45:00.000-04:00",
    turnaround: 1.34
  },
  {
    label: "Marisa Hilll: Test Prep \n Mon 10-01-18 \n Time: 0.38",
    scheduled_time: "2018-10-01T20:10:00.000-04:00",
    turnaround: 0.38
  },
  {
    label:
      "Rufus Bernier: Test Prep Math and Science \n Mon 10-01-18 \n Time: 1.52",
    scheduled_time: "2018-10-01T19:00:00.000-04:00",
    turnaround: 1.52
  },
  {
    label:
      "Lenore Tillman: ACT Prep Math and Science \n Mon 10-01-18 \n Time: 0.23",
    scheduled_time: "2018-10-01T17:30:00.000-04:00",
    turnaround: 0.23
  },
  {
    label:
      "Lucius Pfeffer: Test Prep - Math/Science \n Sat 09-29-18 \n Time: 1.28",
    scheduled_time: "2018-09-29T17:15:00.000-04:00",
    turnaround: 1.28
  },
  {
    label: "Tamika Huels: Algebra Tutoring \n Sat 09-29-18 \n Time: 2.49",
    scheduled_time: "2018-09-29T16:00:00.000-04:00",
    turnaround: 2.49
  },
  {
    label:
      "Altha Hettinger: ACT Math/Science Prep \n Sat 09-29-18 \n Time: 3.39",
    scheduled_time: "2018-09-29T14:30:00.000-04:00",
    turnaround: 3.39
  },
  {
    label: "Anabel Wehner: ACT math/science \n Sat 09-29-18 \n Time: 0.06",
    scheduled_time: "2018-09-29T13:15:00.000-04:00",
    turnaround: 0.06
  },
  {
    label: "Palma Watsica: ACT Prep [Math] \n Sat 09-29-18 \n Time: 1.29",
    scheduled_time: "2018-09-29T12:00:00.000-04:00",
    turnaround: 1.29
  },
  {
    label:
      "Gisele Deckow: ACT Prep [Math/Science] \n Sat 09-29-18 \n Time: 0.06",
    scheduled_time: "2018-09-29T10:30:00.000-04:00",
    turnaround: 0.06
  },
  {
    label: "Bart Zieme: Test Prep \n Sat 09-29-18 \n Time: 1.04",
    scheduled_time: "2018-09-29T09:30:00.000-04:00",
    turnaround: 1.04
  },
  {
    label: "Cristopher Sipes: Physics \n Fri 09-28-18 \n Time: -0.91",
    scheduled_time: "2018-09-28T17:30:00.000-04:00",
    turnaround: -0.91
  },
  {
    label: "Theda Okuneva: ACT Math \n Fri 09-28-18 \n Time: 0.55",
    scheduled_time: "2018-09-28T15:00:00.000-04:00",
    turnaround: 0.55
  },
  {
    label: "Zonia Hilll: ACT Math and Science \n Thu 09-27-18 \n Time: 0.23",
    scheduled_time: "2018-09-27T20:00:00.000-04:00",
    turnaround: 0.23
  },
  {
    label:
      "Ryann Hermann: Test prep math/science \n Thu 09-27-18 \n Time: 1.02",
    scheduled_time: "2018-09-27T17:30:00.000-04:00",
    turnaround: 1.02
  },
  {
    label: "Sandie Emmerich: ACT math/science \n Thu 09-27-18 \n Time: 2.48",
    scheduled_time: "2018-09-27T16:15:00.000-04:00",
    turnaround: 2.48
  },
  {
    label:
      "Cornell Wuckert: Test prep math/science \n Thu 09-27-18 \n Time: 2.83",
    scheduled_time: "2018-09-27T15:00:00.000-04:00",
    turnaround: 2.83
  },
  {
    label:
      "Val Bergstrom: Test Prep Math and Science \n Wed 09-26-18 \n Time: 0.11",
    scheduled_time: "2018-09-26T18:30:00.000-04:00",
    turnaround: 0.11
  },
  {
    label: "Anabel Wehner: ACT math/science \n Wed 09-26-18 \n Time: 1.07",
    scheduled_time: "2018-09-26T17:30:00.000-04:00",
    turnaround: 1.07
  },
  {
    label: "Jake Ward: Math \n Wed 09-26-18 \n Time: 0.43",
    scheduled_time: "2018-09-26T16:00:00.000-04:00",
    turnaround: 0.43
  },
  {
    label: "Rufus Bernier: Math tutoring \n Tue 09-25-18 \n Time: 0.66",
    scheduled_time: "2018-09-25T20:15:00.000-04:00",
    turnaround: 0.66
  },
  {
    label:
      "Rufina Huels: Test Prep- math/science  \n Tue 09-25-18 \n Time: 1.89",
    scheduled_time: "2018-09-25T19:00:00.000-04:00",
    turnaround: 1.89
  },
  {
    label: "Dennis Hansen: Test Prep \n Tue 09-25-18 \n Time: 3.36",
    scheduled_time: "2018-09-25T17:30:00.000-04:00",
    turnaround: 3.36
  },
  {
    label: "Venita Nitzsche: Test Prep - Math \n Tue 09-25-18 \n Time: 4.83",
    scheduled_time: "2018-09-25T16:00:00.000-04:00",
    turnaround: 4.83
  },
  {
    label:
      "Rufus Bernier: Test Prep Math and Science \n Mon 09-24-18 \n Time: 0.39",
    scheduled_time: "2018-09-24T19:00:00.000-04:00",
    turnaround: 0.39
  },
  {
    label: "Solomon Moore: Chem Tutoring \n Mon 09-24-18 \n Time: 1.87",
    scheduled_time: "2018-09-24T17:30:00.000-04:00",
    turnaround: 1.87
  },
  {
    label:
      "Valentin McLaughlin: Math and Science \n Mon 09-24-18 \n Time: 3.35",
    scheduled_time: "2018-09-24T16:00:00.000-04:00",
    turnaround: 3.35
  },
  {
    label: "Anabel Wehner: ACT math/science \n Mon 09-24-18 \n Time: 4.5",
    scheduled_time: "2018-09-24T14:50:00.000-04:00",
    turnaround: 4.5
  },
  {
    label:
      "Delcie Jones: Test Prep- math/sciecne  \n Sun 09-23-18 \n Time: 0.67",
    scheduled_time: "2018-09-23T11:00:00.000-04:00",
    turnaround: 0.67
  },
  {
    label:
      "Lucius Pfeffer: Test Prep - Math/Science \n Sat 09-22-18 \n Time: 0.42",
    scheduled_time: "2018-09-22T17:30:00.000-04:00",
    turnaround: 0.42
  },
  {
    label: "Marisa Hilll: Test Prep \n Sat 09-22-18 \n Time: 2.15",
    scheduled_time: "2018-09-22T15:45:00.000-04:00",
    turnaround: 2.15
  },
  {
    label:
      "Altha Hettinger: ACT Math/Science Prep \n Sat 09-22-18 \n Time: 3.38",
    scheduled_time: "2018-09-22T14:30:00.000-04:00",
    turnaround: 3.38
  },
  {
    label: "Barrett Gulgowski: ACT Math/Science \n Sat 09-22-18 \n Time: 4.49",
    scheduled_time: "2018-09-22T13:20:00.000-04:00",
    turnaround: 4.49
  },
  {
    label: "Palma Watsica: ACT Prep [Math] \n Sat 09-22-18 \n Time: 5.79",
    scheduled_time: "2018-09-22T12:00:00.000-04:00",
    turnaround: 5.79
  },
  {
    label: "Bart Zieme: Test Prep \n Sat 09-22-18 \n Time: 0.3",
    scheduled_time: "2018-09-22T10:30:00.000-04:00",
    turnaround: 0.3
  },
  {
    label: "Cristopher Sipes: Physics \n Fri 09-21-18 \n Time: 0.4",
    scheduled_time: "2018-09-21T17:30:00.000-04:00",
    turnaround: 0.4
  },
  {
    label: "Theda Okuneva: ACT Math \n Fri 09-21-18 \n Time: 1.38",
    scheduled_time: "2018-09-21T16:00:00.000-04:00",
    turnaround: 1.38
  },
  {
    label: "Sandie Emmerich: ACT math/science \n Thu 09-20-18 \n Time: 3.12",
    scheduled_time: "2018-09-20T16:15:00.000-04:00",
    turnaround: 3.12
  },
  {
    label:
      "Ryann Hermann: Test prep math/science \n Thu 09-20-18 \n Time: 3.94",
    scheduled_time: "2018-09-20T15:10:00.000-04:00",
    turnaround: 3.94
  },
  {
    label:
      "Mahalia Ruecker: Test Prep- math/sciece \n Wed 09-19-18 \n Time: 0.61",
    scheduled_time: "2018-09-19T19:50:00.000-04:00",
    turnaround: 0.61
  },
  {
    label:
      "Val Bergstrom: Test Prep Math and Science \n Wed 09-19-18 \n Time: 1.92",
    scheduled_time: "2018-09-19T18:30:00.000-04:00",
    turnaround: 1.92
  },
  {
    label: "Anabel Wehner: ACT math/science \n Wed 09-19-18 \n Time: 2.91",
    scheduled_time: "2018-09-19T17:30:00.000-04:00",
    turnaround: 2.91
  },
  {
    label:
      "Gisele Deckow: ACT Prep [Math/Science] \n Wed 09-19-18 \n Time: 0.11",
    scheduled_time: "2018-09-19T16:00:00.000-04:00",
    turnaround: 0.11
  },
  {
    label:
      "Rufina Huels: Test Prep- math/science  \n Tue 09-18-18 \n Time: 0.67",
    scheduled_time: "2018-09-18T17:20:00.000-04:00",
    turnaround: 0.67
  },
  {
    label: "Venita Nitzsche: Test Prep - Math \n Tue 09-18-18 \n Time: 1.98",
    scheduled_time: "2018-09-18T16:00:00.000-04:00",
    turnaround: 1.98
  },
  {
    label: "Zonia Hilll: ACT Math and Science \n Mon 09-17-18 \n Time: -0.1",
    scheduled_time: "2018-09-17T20:20:00.000-04:00",
    turnaround: -0.1
  },
  {
    label:
      "Rufus Bernier: Test Prep Math and Science \n Mon 09-17-18 \n Time: -0.25",
    scheduled_time: "2018-09-17T19:00:00.000-04:00",
    turnaround: -0.25
  },
  {
    label: "Anabel Wehner: ACT math/science \n Mon 09-17-18 \n Time: 2.72",
    scheduled_time: "2018-09-17T16:00:00.000-04:00",
    turnaround: 2.72
  }
];
