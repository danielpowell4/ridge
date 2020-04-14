/*
puts JSON.pretty_generate(Lesson.active.where(canceled_at: nil).complete.where(coach_id: 316).where('lessons.scheduled_time > ?', 30.days.ago).map do |l|
  tt = ((l.summary.created_at - (l.scheduled_time + (l.duration * 60))) / 3600.0).round(2)
  { label: "#{l.display_name} \n #{l.scheduled_time.strftime("%a %m-%d-%y")} \n Time: #{tt}", scheduled_time: l.scheduled_time, turnaround: tt }
end)
*/

export const turnaround = [
  {
    label: 'Ida Poulos: SAT Math \n Mon 02-04-19 \n Time: 0.78',
    scheduled_time: '2019-02-04 20:15:00 -0500',
    turnaround: 0.78,
  },
  {
    label: 'Jack Mansfield: Test Prep Math \n Mon 02-04-19 \n Time: 2.02',
    scheduled_time: '2019-02-04 19:00:00 -0500',
    turnaround: 2.02,
  },
  {
    label:
      'Andrew Athanasian: Test Prep Math and Science \n Mon 02-04-19 \n Time: 0.05',
    scheduled_time: '2019-02-04 18:00:00 -0500',
    turnaround: 0.05,
  },
  {
    label:
      'Julia Oppenheim: Test Prep Math and Science \n Mon 02-04-19 \n Time: 1.03',
    scheduled_time: '2019-02-04 16:45:00 -0500',
    turnaround: 1.03,
  },
  {
    label: 'Jonny Cohen: Test Prep- math/science \n Mon 02-04-19 \n Time: 2.41',
    scheduled_time: '2019-02-04 15:20:00 -0500',
    turnaround: 2.41,
  },
  {
    label: 'Justin Caccavo: ACT Prep [Math] \n Sun 02-03-19 \n Time: 0.69',
    scheduled_time: '2019-02-03 12:00:00 -0500',
    turnaround: 0.69,
  },
  {
    label:
      'Grace McCormick: ACT Math and Science  \n Sun 02-03-19 \n Time: 1.92',
    scheduled_time: '2019-02-03 10:30:00 -0500',
    turnaround: 1.92,
  },
  {
    label: 'Ellie Taylor: Test Prep Math/Science \n Sun 02-03-19 \n Time: 0.21',
    scheduled_time: '2019-02-03 09:30:00 -0500',
    turnaround: 0.21,
  },
  {
    label: 'Sammy Gordon: ACT Math and Science \n Sat 02-02-19 \n Time: 0.61',
    scheduled_time: '2019-02-02 16:30:00 -0500',
    turnaround: 0.61,
  },
  {
    label: 'Ryan Murphy: Test Prep- math/science \n Sat 02-02-19 \n Time: 0.5',
    scheduled_time: '2019-02-02 15:00:00 -0500',
    turnaround: 0.5,
  },
  {
    label: 'Brian Lippin: SAT Math \n Sat 02-02-19 \n Time: 2.14',
    scheduled_time: '2019-02-02 13:20:00 -0500',
    turnaround: 2.14,
  },
  {
    label:
      'Alexa Albanese: ACT Prep [Math/Science] \n Sat 02-02-19 \n Time: 0.36',
    scheduled_time: '2019-02-02 12:00:00 -0500',
    turnaround: 0.36,
  },
  {
    label:
      'Sydney Rothschild: Test Prep- math/science  \n Sat 02-02-19 \n Time: 0.37',
    scheduled_time: '2019-02-02 10:30:00 -0500',
    turnaround: 0.37,
  },
  {
    label: 'Jack Grier: Physics \n Fri 02-01-19 \n Time: -0.01',
    scheduled_time: '2019-02-01 20:15:00 -0500',
    turnaround: -0.01,
  },
  {
    label: 'Olivia Landau: ACT math and science \n Fri 02-01-19 \n Time: 0.98',
    scheduled_time: '2019-02-01 18:45:00 -0500',
    turnaround: 0.98,
  },
  {
    label:
      'Rebecca Sparacio: Test Prep - Math/Science \n Fri 02-01-19 \n Time: 0.41',
    scheduled_time: '2019-02-01 17:00:00 -0500',
    turnaround: 0.41,
  },
  {
    label:
      'Samantha Agulnick: Test Prep- math/science \n Fri 02-01-19 \n Time: 1.63',
    scheduled_time: '2019-02-01 15:45:00 -0500',
    turnaround: 1.63,
  },
  {
    label:
      'Hayden Leff: Test Prep Math and Science \n Fri 02-01-19 \n Time: 1.52',
    scheduled_time: '2019-02-01 14:30:00 -0500',
    turnaround: 1.52,
  },
  {
    label: 'Michael Scharfenberger: Test Prep \n Fri 02-01-19 \n Time: 3.0',
    scheduled_time: '2019-02-01 13:15:00 -0500',
    turnaround: 3.0,
  },
  {
    label: 'Jolie Nemshin: ACT Math and Science \n Thu 01-31-19 \n Time: 1.89',
    scheduled_time: '2019-01-31 19:15:00 -0500',
    turnaround: 1.89,
  },
  {
    label:
      'Hunter Rudman: Test prep math/science \n Thu 01-31-19 \n Time: 1.15',
    scheduled_time: '2019-01-31 17:10:00 -0500',
    turnaround: 1.15,
  },
  {
    label: 'Harry Landau: ACT math/science \n Thu 01-31-19 \n Time: 2.29',
    scheduled_time: '2019-01-31 16:15:00 -0500',
    turnaround: 2.29,
  },
  {
    label: 'Elyse Schetty: ACT Math and Science \n Thu 01-31-19 \n Time: 3.52',
    scheduled_time: '2019-01-31 15:00:00 -0500',
    turnaround: 3.52,
  },
  {
    label:
      'Zachary Simon: Test prep math/science \n Thu 01-31-19 \n Time: 3.74',
    scheduled_time: '2019-01-31 14:30:00 -0500',
    turnaround: 3.74,
  },
  {
    label:
      'Ilana Nimkoff: Test Prep- math/sciece \n Wed 01-30-19 \n Time: 0.73',
    scheduled_time: '2019-01-30 19:55:00 -0500',
    turnaround: 0.73,
  },
  {
    label: 'Brooke Rubenstein: Science ACT  \n Wed 01-30-19 \n Time: 1.62',
    scheduled_time: '2019-01-30 19:00:00 -0500',
    turnaround: 1.62,
  },
  {
    label: 'Maya Weinbaum: Math Tutoring 2 \n Wed 01-30-19 \n Time: 3.1',
    scheduled_time: '2019-01-30 17:30:00 -0500',
    turnaround: 3.1,
  },
  {
    label: 'Sophie Fries: ACT Prep \n Wed 01-30-19 \n Time: 4.07',
    scheduled_time: '2019-01-30 16:45:00 -0500',
    turnaround: 4.07,
  },
  {
    label: 'Gabrielle Fries: SAT Prep \n Wed 01-30-19 \n Time: 4.8',
    scheduled_time: '2019-01-30 16:00:00 -0500',
    turnaround: 4.8,
  },
  {
    label:
      'Sarah Faber: Test Prep- math/sciecne  \n Tue 01-29-19 \n Time: 0.65',
    scheduled_time: '2019-01-29 20:00:00 -0500',
    turnaround: 0.65,
  },
  {
    label: 'Alex Bloom: Test Prep- math/science  \n Tue 01-29-19 \n Time: 1.63',
    scheduled_time: '2019-01-29 19:00:00 -0500',
    turnaround: 1.63,
  },
  {
    label: 'Daniel Shahery: Test Prep \n Tue 01-29-19 \n Time: 3.1',
    scheduled_time: '2019-01-29 17:30:00 -0500',
    turnaround: 3.1,
  },
  {
    label: 'Ali Weinberg: Test Prep - Math \n Tue 01-29-19 \n Time: 0.28',
    scheduled_time: '2019-01-29 16:00:00 -0500',
    turnaround: 0.28,
  },
  {
    label: 'Paige Towers: Test Prep-math/science \n Tue 01-29-19 \n Time: 0.12',
    scheduled_time: '2019-01-29 14:45:00 -0500',
    turnaround: 0.12,
  },
  {
    label: 'Chloe Astrachan: Math tutoring \n Mon 01-28-19 \n Time: 0.82',
    scheduled_time: '2019-01-28 20:45:00 -0500',
    turnaround: 0.82,
  },
  {
    label: 'Ida Poulos: SAT Math \n Mon 01-28-19 \n Time: 2.22',
    scheduled_time: '2019-01-28 19:20:00 -0500',
    turnaround: 2.22,
  },
  {
    label:
      'Rebecca Sparacio: Test Prep - Math/Science \n Mon 01-28-19 \n Time: 3.28',
    scheduled_time: '2019-01-28 18:15:00 -0500',
    turnaround: 3.28,
  },
  {
    label:
      'Julia Oppenheim: Test Prep Math and Science \n Mon 01-28-19 \n Time: 4.77',
    scheduled_time: '2019-01-28 16:45:00 -0500',
    turnaround: 4.77,
  },
  {
    label: 'Jonny Cohen: Test Prep- math/science \n Mon 01-28-19 \n Time: 6.16',
    scheduled_time: '2019-01-28 15:20:00 -0500',
    turnaround: 6.16,
  },
  {
    label: 'Ryan Murphy: Test Prep- math/science \n Sun 01-27-19 \n Time: 0.37',
    scheduled_time: '2019-01-27 13:30:00 -0500',
    turnaround: 0.37,
  },
  {
    label: 'Ellie Taylor: Test Prep Math/Science \n Sun 01-27-19 \n Time: 0.23',
    scheduled_time: '2019-01-27 12:00:00 -0500',
    turnaround: 0.23,
  },
  {
    label:
      'Grace McCormick: ACT Math and Science  \n Sun 01-27-19 \n Time: 0.35',
    scheduled_time: '2019-01-27 10:30:00 -0500',
    turnaround: 0.35,
  },
  {
    label: 'Sammy Gordon: ACT Math and Science \n Sat 01-26-19 \n Time: 0.41',
    scheduled_time: '2019-01-26 16:30:00 -0500',
    turnaround: 0.41,
  },
  {
    label: 'Brian Lippin: SAT Math \n Sat 01-26-19 \n Time: 0.63',
    scheduled_time: '2019-01-26 14:20:00 -0500',
    turnaround: 0.63,
  },
  {
    label:
      'Jared Rothberg: ACT Math/Science Prep \n Sat 01-26-19 \n Time: -0.02',
    scheduled_time: '2019-01-26 13:20:00 -0500',
    turnaround: -0.02,
  },
  {
    label:
      'Alexa Albanese: ACT Prep [Math/Science] \n Sat 01-26-19 \n Time: 0.08',
    scheduled_time: '2019-01-26 12:00:00 -0500',
    turnaround: 0.08,
  },
  {
    label:
      'Sydney Rothschild: Test Prep- math/science  \n Sat 01-26-19 \n Time: 0.36',
    scheduled_time: '2019-01-26 10:30:00 -0500',
    turnaround: 0.36,
  },
  {
    label: 'Olivia Landau: ACT math and science \n Fri 01-25-19 \n Time: 0.31',
    scheduled_time: '2019-01-25 18:45:00 -0500',
    turnaround: 0.31,
  },
  {
    label: 'Brooke Rubenstein: Science ACT  \n Fri 01-25-19 \n Time: 0.19',
    scheduled_time: '2019-01-25 17:15:00 -0500',
    turnaround: 0.19,
  },
  {
    label:
      'Samantha Agulnick: Test Prep- math/science \n Fri 01-25-19 \n Time: 0.36',
    scheduled_time: '2019-01-25 15:45:00 -0500',
    turnaround: 0.36,
  },
  {
    label:
      'Hayden Leff: Test Prep Math and Science \n Fri 01-25-19 \n Time: 1.58',
    scheduled_time: '2019-01-25 14:30:00 -0500',
    turnaround: 1.58,
  },
  {
    label: 'Justin Caccavo: ACT Prep [Math] \n Fri 01-25-19 \n Time: 0.07',
    scheduled_time: '2019-01-25 12:30:00 -0500',
    turnaround: 0.07,
  },
  {
    label:
      'Hunter Rudman: Test prep math/science \n Thu 01-24-19 \n Time: 0.46',
    scheduled_time: '2019-01-24 18:30:00 -0500',
    turnaround: 0.46,
  },
  {
    label: 'Jolie Nemshin: ACT Math and Science \n Thu 01-24-19 \n Time: 1.69',
    scheduled_time: '2019-01-24 17:15:00 -0500',
    turnaround: 1.69,
  },
  {
    label: 'Elyse Schetty: ACT Math and Science \n Thu 01-24-19 \n Time: -0.04',
    scheduled_time: '2019-01-24 16:00:00 -0500',
    turnaround: -0.04,
  },
  {
    label:
      'Zachary Simon: Test prep math/science \n Thu 01-24-19 \n Time: 1.19',
    scheduled_time: '2019-01-24 14:30:00 -0500',
    turnaround: 1.19,
  },
  {
    label: 'Harry Landau: ACT math/science \n Thu 01-24-19 \n Time: 2.67',
    scheduled_time: '2019-01-24 13:15:00 -0500',
    turnaround: 2.67,
  },
  {
    label: 'Maya Weinbaum: Math Tutoring 2 \n Wed 01-23-19 \n Time: 1.19',
    scheduled_time: '2019-01-23 18:30:00 -0500',
    turnaround: 1.19,
  },
  {
    label:
      'Sarah Faber: Test Prep- math/sciecne  \n Wed 01-23-19 \n Time: 2.41',
    scheduled_time: '2019-01-23 17:15:00 -0500',
    turnaround: 2.41,
  },
  {
    label:
      'Chloe Astrachan: Test Prep Math and Science \n Wed 01-23-19 \n Time: 0.27',
    scheduled_time: '2019-01-23 15:30:00 -0500',
    turnaround: 0.27,
  },
  {
    label: 'Alex Bloom: Test Prep- math/science  \n Wed 01-23-19 \n Time: 0.18',
    scheduled_time: '2019-01-23 14:00:00 -0500',
    turnaround: 0.18,
  },
  {
    label:
      'Daniel Kates: Chemistry Honors [10th Grade] \n Wed 01-23-19 \n Time: 1.41',
    scheduled_time: '2019-01-23 12:45:00 -0500',
    turnaround: 1.41,
  },
  {
    label:
      'Andrew Athanasian: Test Prep Math and Science \n Tue 01-22-19 \n Time: 0.2',
    scheduled_time: '2019-01-22 19:00:00 -0500',
    turnaround: 0.2,
  },
  {
    label: 'Daniel Shahery: Test Prep \n Tue 01-22-19 \n Time: 1.19',
    scheduled_time: '2019-01-22 17:30:00 -0500',
    turnaround: 1.19,
  },
  {
    label: 'Gabriella Mezzich: ACT math/science \n Tue 01-22-19 \n Time: -0.06',
    scheduled_time: '2019-01-22 15:50:00 -0500',
    turnaround: -0.06,
  },
  {
    label: 'Brian Kenyon: Calculus \n Mon 01-21-19 \n Time: 0.29',
    scheduled_time: '2019-01-21 20:30:00 -0500',
    turnaround: 0.29,
  },
  {
    label: 'Ida Poulos: SAT Math \n Mon 01-21-19 \n Time: 0.8',
    scheduled_time: '2019-01-21 19:20:00 -0500',
    turnaround: 0.8,
  },
  {
    label:
      'Grace McCormick: ACT Math and Science  \n Mon 01-21-19 \n Time: 0.22',
    scheduled_time: '2019-01-21 18:00:00 -0500',
    turnaround: 0.22,
  },
  {
    label:
      'Jared Rothberg: ACT Math/Science Prep \n Mon 01-21-19 \n Time: 0.33',
    scheduled_time: '2019-01-21 16:30:00 -0500',
    turnaround: 0.33,
  },
  {
    label: 'Jonny Cohen: Test Prep- math/science \n Mon 01-21-19 \n Time: 0.34',
    scheduled_time: '2019-01-21 15:20:00 -0500',
    turnaround: 0.34,
  },
  {
    label: 'Sophie Fries: ACT Prep \n Mon 01-21-19 \n Time: 0.45',
    scheduled_time: '2019-01-21 13:45:00 -0500',
    turnaround: 0.45,
  },
  {
    label: 'Alex Golub: math \n Mon 01-21-19 \n Time: 1.41',
    scheduled_time: '2019-01-21 12:30:00 -0500',
    turnaround: 1.41,
  },
  {
    label: 'Gabriella Mezzich: ACT math/science \n Mon 01-21-19 \n Time: -0.04',
    scheduled_time: '2019-01-21 11:20:00 -0500',
    turnaround: -0.04,
  },
  {
    label: 'Eric Madenberg: Math \n Mon 01-21-19 \n Time: 1.52',
    scheduled_time: '2019-01-21 10:00:00 -0500',
    turnaround: 1.52,
  },
  {
    label: 'Jolie Nemshin: ACT Math and Science \n Sun 01-20-19 \n Time: 0.17',
    scheduled_time: '2019-01-20 12:30:00 -0500',
    turnaround: 0.17,
  },
  {
    label: 'Ryan Murphy: Test Prep- math/science \n Sun 01-20-19 \n Time: 1.64',
    scheduled_time: '2019-01-20 11:00:00 -0500',
    turnaround: 1.64,
  },
  {
    label: 'Jack Grier: Physics \n Sun 01-20-19 \n Time: 3.12',
    scheduled_time: '2019-01-20 09:30:00 -0500',
    turnaround: 3.12,
  },
  {
    label: 'Sammy Gordon: ACT Math and Science \n Sat 01-19-19 \n Time: 0.64',
    scheduled_time: '2019-01-19 16:30:00 -0500',
    turnaround: 0.64,
  },
  {
    label: 'Ellie Taylor: Test Prep Math/Science \n Sat 01-19-19 \n Time: 0.9',
    scheduled_time: '2019-01-19 14:00:00 -0500',
    turnaround: 0.9,
  },
  {
    label:
      'Alexa Albanese: ACT Prep [Math/Science] \n Sat 01-19-19 \n Time: 2.37',
    scheduled_time: '2019-01-19 12:30:00 -0500',
    turnaround: 2.37,
  },
  {
    label:
      'Sydney Rothschild: Test Prep- math/science  \n Sat 01-19-19 \n Time: 0.23',
    scheduled_time: '2019-01-19 11:15:00 -0500',
    turnaround: 0.23,
  },
  {
    label:
      'Rebecca Sparacio: Test Prep - Math/Science \n Sat 01-19-19 \n Time: 1.46',
    scheduled_time: '2019-01-19 10:00:00 -0500',
    turnaround: 1.46,
  },
  {
    label: 'Olivia Landau: ACT math and science \n Fri 01-18-19 \n Time: 0.71',
    scheduled_time: '2019-01-18 18:45:00 -0500',
    turnaround: 0.71,
  },
  {
    label:
      'Julia Oppenheim: Test Prep Math and Science \n Fri 01-18-19 \n Time: 0.43',
    scheduled_time: '2019-01-18 17:15:00 -0500',
    turnaround: 0.43,
  },
  {
    label:
      'Samantha Agulnick: Test Prep- math/science \n Fri 01-18-19 \n Time: 0.36',
    scheduled_time: '2019-01-18 15:45:00 -0500',
    turnaround: 0.36,
  },
  {
    label:
      'Hayden Leff: Test Prep Math and Science \n Fri 01-18-19 \n Time: 1.59',
    scheduled_time: '2019-01-18 14:30:00 -0500',
    turnaround: 1.59,
  },
  {
    label:
      'Rachel Bigman: Test prep math/science \n Thu 01-17-19 \n Time: 0.84',
    scheduled_time: '2019-01-17 19:30:00 -0500',
    turnaround: 0.84,
  },
  {
    label:
      'Hunter Rudman: Test prep math/science \n Thu 01-17-19 \n Time: 0.21',
    scheduled_time: '2019-01-17 18:00:00 -0500',
    turnaround: 0.21,
  },
  {
    label: 'Harry Landau: ACT math/science \n Thu 01-17-19 \n Time: 0.29',
    scheduled_time: '2019-01-17 17:00:00 -0500',
    turnaround: 0.29,
  },
  {
    label: 'Elyse Schetty: ACT Math and Science \n Thu 01-17-19 \n Time: 1.43',
    scheduled_time: '2019-01-17 15:50:00 -0500',
    turnaround: 1.43,
  },
  {
    label:
      'Zachary Simon: Test prep math/science \n Thu 01-17-19 \n Time: 2.48',
    scheduled_time: '2019-01-17 14:30:00 -0500',
    turnaround: 2.48,
  },
  {
    label:
      'Ilana Nimkoff: Test Prep- math/sciece \n Wed 01-16-19 \n Time: 0.51',
    scheduled_time: '2019-01-16 19:55:00 -0500',
    turnaround: 0.51,
  },
  {
    label: 'Brooke Rubenstein: Science ACT  \n Wed 01-16-19 \n Time: 1.4',
    scheduled_time: '2019-01-16 19:00:00 -0500',
    turnaround: 1.4,
  },
  {
    label:
      'Daniel Kates: Chemistry Honors [10th Grade] \n Wed 01-16-19 \n Time: 0.4',
    scheduled_time: '2019-01-16 17:20:00 -0500',
    turnaround: 0.4,
  },
  {
    label: 'Eric Madenberg: Math \n Wed 01-16-19 \n Time: 0.22',
    scheduled_time: '2019-01-16 16:00:00 -0500',
    turnaround: 0.22,
  },
  {
    label:
      'Sarah Faber: Test Prep- math/sciecne  \n Tue 01-15-19 \n Time: 0.34',
    scheduled_time: '2019-01-15 20:10:00 -0500',
    turnaround: 0.34,
  },
  {
    label: 'Alex Bloom: Test Prep- math/science  \n Tue 01-15-19 \n Time: 1.48',
    scheduled_time: '2019-01-15 19:00:00 -0500',
    turnaround: 1.48,
  },
  {
    label: 'Daniel Shahery: Test Prep \n Tue 01-15-19 \n Time: 0.53',
    scheduled_time: '2019-01-15 17:30:00 -0500',
    turnaround: 0.53,
  },
  {
    label: 'Ali Weinberg: Test Prep - Math \n Tue 01-15-19 \n Time: 2.01',
    scheduled_time: '2019-01-15 16:00:00 -0500',
    turnaround: 2.01,
  },
  {
    label: 'Paige Towers: Test Prep-math/science \n Tue 01-15-19 \n Time: 0.27',
    scheduled_time: '2019-01-15 14:45:00 -0500',
    turnaround: 0.27,
  },
  {
    label: 'Ida Poulos: SAT Math \n Mon 01-14-19 \n Time: 0.72',
    scheduled_time: '2019-01-14 19:20:00 -0500',
    turnaround: 0.72,
  },
  {
    label:
      'Andrew Athanasian: Test Prep Math and Science \n Mon 01-14-19 \n Time: 2.04',
    scheduled_time: '2019-01-14 18:15:00 -0500',
    turnaround: 2.04,
  },
  {
    label: 'Chloe Astrachan: Math tutoring \n Mon 01-14-19 \n Time: 0.94',
    scheduled_time: '2019-01-14 16:45:00 -0500',
    turnaround: 0.94,
  },
  {
    label: 'Jonny Cohen: Test Prep- math/science \n Mon 01-14-19 \n Time: 2.31',
    scheduled_time: '2019-01-14 15:20:00 -0500',
    turnaround: 2.31,
  },
  {
    label: 'Ryan Murphy: Test Prep- math/science \n Sun 01-13-19 \n Time: 2.01',
    scheduled_time: '2019-01-13 16:30:00 -0500',
    turnaround: 2.01,
  },
  {
    label: 'Chloe Astrachan: Math tutoring \n Sun 01-13-19 \n Time: 2.19',
    scheduled_time: '2019-01-13 16:20:00 -0500',
    turnaround: 2.19,
  },
  {
    label: 'Sophie Fries: ACT Prep \n Sun 01-13-19 \n Time: 3.48',
    scheduled_time: '2019-01-13 15:15:00 -0500',
    turnaround: 3.48,
  },
  {
    label: 'Gabrielle Fries: SAT Prep \n Sun 01-13-19 \n Time: 4.21',
    scheduled_time: '2019-01-13 14:30:00 -0500',
    turnaround: 4.21,
  },
  {
    label:
      'Sarah Faber: Test Prep- math/sciecne  \n Sun 01-13-19 \n Time: 2.21',
    scheduled_time: '2019-01-13 13:20:00 -0500',
    turnaround: 2.21,
  },
  {
    label:
      'Grace McCormick: ACT Math and Science  \n Sun 01-13-19 \n Time: 3.52',
    scheduled_time: '2019-01-13 12:00:00 -0500',
    turnaround: 3.52,
  },
  {
    label: 'Justin Caccavo: ACT Prep [Math] \n Sun 01-13-19 \n Time: 0.48',
    scheduled_time: '2019-01-13 10:30:00 -0500',
    turnaround: 0.48,
  },
  {
    label: 'Caity Mongeluzo: Math and Science \n Sun 01-13-19 \n Time: 1.67',
    scheduled_time: '2019-01-13 09:15:00 -0500',
    turnaround: 1.67,
  },
  {
    label: 'Sammy Gordon: ACT Math and Science \n Sat 01-12-19 \n Time: 0.36',
    scheduled_time: '2019-01-12 17:15:00 -0500',
    turnaround: 0.36,
  },
  {
    label: 'Ellie Taylor: Test Prep Math/Science \n Sat 01-12-19 \n Time: 1.83',
    scheduled_time: '2019-01-12 15:45:00 -0500',
    turnaround: 1.83,
  },
  {
    label:
      'Jared Rothberg: ACT Math/Science Prep \n Sat 01-12-19 \n Time: 0.24',
    scheduled_time: '2019-01-12 14:30:00 -0500',
    turnaround: 0.24,
  },
  {
    label: 'Brian Lippin: SAT Math \n Sat 01-12-19 \n Time: 1.38',
    scheduled_time: '2019-01-12 13:20:00 -0500',
    turnaround: 1.38,
  },
  {
    label:
      'Alexa Albanese: ACT Prep [Math/Science] \n Sat 01-12-19 \n Time: 2.69',
    scheduled_time: '2019-01-12 12:00:00 -0500',
    turnaround: 2.69,
  },
  {
    label:
      'Sydney Rothschild: Test Prep- math/science  \n Sat 01-12-19 \n Time: 0.25',
    scheduled_time: '2019-01-12 10:30:00 -0500',
    turnaround: 0.25,
  },
  {
    label:
      'Rebecca Sparacio: Test Prep - Math/Science \n Sat 01-12-19 \n Time: 1.47',
    scheduled_time: '2019-01-12 09:15:00 -0500',
    turnaround: 1.47,
  },
  {
    label: 'Jack Grier: Physics \n Fri 01-11-19 \n Time: -0.03',
    scheduled_time: '2019-01-11 19:45:00 -0500',
    turnaround: -0.03,
  },
  {
    label: 'Olivia Landau: ACT math and science \n Fri 01-11-19 \n Time: 0.18',
    scheduled_time: '2019-01-11 18:45:00 -0500',
    turnaround: 0.18,
  },
  {
    label:
      'Julia Oppenheim: Test Prep Math and Science \n Fri 01-11-19 \n Time: 0.23',
    scheduled_time: '2019-01-11 17:15:00 -0500',
    turnaround: 0.23,
  },
  {
    label:
      'Samantha Agulnick: Test Prep- math/science \n Fri 01-11-19 \n Time: 1.7',
    scheduled_time: '2019-01-11 15:45:00 -0500',
    turnaround: 1.7,
  },
  {
    label:
      'Hayden Leff: Test Prep Math and Science \n Fri 01-11-19 \n Time: 2.93',
    scheduled_time: '2019-01-11 14:30:00 -0500',
    turnaround: 2.93,
  },
  {
    label: 'Jolie Nemshin: ACT Math and Science \n Thu 01-10-19 \n Time: 0.95',
    scheduled_time: '2019-01-10 20:45:00 -0500',
    turnaround: 0.95,
  },
  {
    label:
      'Rachel Bigman: Test prep math/science \n Thu 01-10-19 \n Time: 1.94',
    scheduled_time: '2019-01-10 19:45:00 -0500',
    turnaround: 1.94,
  },
  {
    label:
      'Zachary Simon: Test prep math/science \n Thu 01-10-19 \n Time: 0.23',
    scheduled_time: '2019-01-10 18:15:00 -0500',
    turnaround: 0.23,
  },
  {
    label:
      'Hunter Rudman: Test prep math/science \n Thu 01-10-19 \n Time: 1.29',
    scheduled_time: '2019-01-10 17:10:00 -0500',
    turnaround: 1.29,
  },
  {
    label: 'Harry Landau: ACT math/science \n Thu 01-10-19 \n Time: 0.04',
    scheduled_time: '2019-01-10 16:15:00 -0500',
    turnaround: 0.04,
  },
  {
    label: 'Elyse Schetty: ACT Math and Science \n Thu 01-10-19 \n Time: 0.05',
    scheduled_time: '2019-01-10 15:00:00 -0500',
    turnaround: 0.05,
  },
  {
    label: 'Gabriella Mezzich: ACT math/science \n Wed 01-09-19 \n Time: 0.54',
    scheduled_time: '2019-01-09 20:00:00 -0500',
    turnaround: 0.54,
  },
  {
    label: 'Brooke Rubenstein: Science ACT  \n Wed 01-09-19 \n Time: 1.51',
    scheduled_time: '2019-01-09 19:00:00 -0500',
    turnaround: 1.51,
  },
  {
    label:
      'Ilana Nimkoff: Test Prep- math/sciece \n Wed 01-09-19 \n Time: 0.29',
    scheduled_time: '2019-01-09 17:30:00 -0500',
    turnaround: 0.29,
  },
  {
    label: 'Eric Madenberg: Math \n Wed 01-09-19 \n Time: 0.31',
    scheduled_time: '2019-01-09 16:00:00 -0500',
    turnaround: 0.31,
  },
  {
    label:
      'Chloe Astrachan: Test Prep Math and Science \n Tue 01-08-19 \n Time: 1.27',
    scheduled_time: '2019-01-08 20:15:00 -0500',
    turnaround: 1.27,
  },
  {
    label: 'Alex Golub: math \n Tue 01-08-19 \n Time: 1.5',
    scheduled_time: '2019-01-08 20:00:00 -0500',
    turnaround: 1.5,
  },
  {
    label: 'Alex Bloom: Test Prep- math/science  \n Tue 01-08-19 \n Time: 2.47',
    scheduled_time: '2019-01-08 19:00:00 -0500',
    turnaround: 2.47,
  },
  {
    label:
      'Sarah Faber: Test Prep- math/sciecne  \n Tue 01-08-19 \n Time: 0.11',
    scheduled_time: '2019-01-08 17:30:00 -0500',
    turnaround: 0.11,
  },
  {
    label: 'Ali Weinberg: Test Prep - Math \n Tue 01-08-19 \n Time: 0.3',
    scheduled_time: '2019-01-08 16:00:00 -0500',
    turnaround: 0.3,
  },
  {
    label: 'Paige Towers: Test Prep-math/science \n Tue 01-08-19 \n Time: 1.53',
    scheduled_time: '2019-01-08 14:45:00 -0500',
    turnaround: 1.53,
  },
  {
    label: 'Ida Poulos: SAT Math \n Mon 01-07-19 \n Time: 0.67',
    scheduled_time: '2019-01-07 19:20:00 -0500',
    turnaround: 0.67,
  },
  {
    label:
      'Andrew Athanasian: Test Prep Math and Science \n Mon 01-07-19 \n Time: 0.22',
    scheduled_time: '2019-01-07 18:00:00 -0500',
    turnaround: 0.22,
  },
  {
    label:
      'Daniel Kates: Chemistry Honors [10th Grade] \n Mon 01-07-19 \n Time: 1.2',
    scheduled_time: '2019-01-07 16:45:00 -0500',
    turnaround: 1.2,
  },
  {
    label: 'Jonny Cohen: Test Prep- math/science \n Mon 01-07-19 \n Time: 2.59',
    scheduled_time: '2019-01-07 15:20:00 -0500',
    turnaround: 2.59,
  },
  {
    label: 'Sophie Fries: ACT Prep \n Sun 01-06-19 \n Time: 0.61',
    scheduled_time: '2019-01-06 14:15:00 -0500',
    turnaround: 0.61,
  },
];
