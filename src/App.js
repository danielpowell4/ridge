import React, { Component } from 'react';
import RidgeBar from './Bar.js';
import RidgePie from './Pie.js';
import StudentsPerYear from './mock_students_per_year.js'
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
      </div>
    );
  }
}

export default App;
