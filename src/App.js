import React, { Component } from 'react';
import RidgeBar from './RidgeBar.js';
import RidgePie from './RidgePie.js';
import RidgeStacked from './RidgeStacked.js';
import StudentsPerYear from './mock_students_per_year.js';
import LessonsPerMonth from './mock_lessons_per_month.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <RidgeBar data={StudentsPerYear}
                  x_attr='grad_year'
                  y_attr='student_count'
        />
        <RidgePie data={StudentsPerYear}
                  dimension='student_count'
        />
        <RidgeStacked data={LessonsPerMonth}
                  group_by='month'
                  y_attr='hours'
        />
      </div>
    );
  }
}

export default App;
