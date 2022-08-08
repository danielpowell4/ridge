import * as React from "react";

import { asDecimal, asPercent, asDollar } from "../../lib/scorecardHelper";

import styles from "./styles.module.css";

const DEFAULT_HOUR_SPREAD = {
  Jul: 0.0375,
  Aug: 0.0675,
  Sep: 0.1025,
  Oct: 0.1222,
  Nov: 0.1051,
  Dec: 0.0769,
  Jan: 0.1005,
  Feb: 0.0826,
  Mar: 0.095,
  Apr: 0.0835,
  May: 0.0807,
  Jun: 0.0459,
};

const DEFAULT_BILL_RATE = 190;
const TARGET_GOAL = 13500000;
const DEFAULT_LESSON_RATIO = 0.92;

const ProjectionHelper = () => {
  const [annualRev, setAnnualRev] = React.useState(TARGET_GOAL);
  const [billRate, setBillRate] = React.useState(DEFAULT_BILL_RATE);
  const [lessonRatio, setLessonRatio] = React.useState(DEFAULT_LESSON_RATIO);

  const annualHours = (annualRev * lessonRatio) / billRate;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.filters}>
        <div className={styles.inputContainer}>
          <label htmlFor="annualRev">
            Annual Rev: {asDollar.format(annualRev)}
          </label>
          <input
            type="range"
            id="annualRev"
            name="annualRev"
            min="9000000"
            max="15000000"
            value={annualRev}
            onChange={(e) => setAnnualRev(parseInt(e.target.value))}
            step="250000"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="billRate">
            Avg Bill Rate: {asDollar.format(billRate)}/hr
          </label>
          <input
            type="range"
            id="billRate"
            name="billRate"
            min="50"
            max="500"
            value={billRate}
            onChange={(e) => setBillRate(parseInt(e.target.value))}
            step="2.5"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="lessonRatio">
            Lesson Rev: {asPercent.format(lessonRatio)}
          </label>
          <input
            type="range"
            id="lessonRatio"
            name="lessonRatio"
            min="0.80"
            max="1.0"
            value={lessonRatio}
            onChange={(e) => setLessonRatio(parseFloat(e.target.value))}
            step="0.01"
          />
        </div>
      </div>
      <p>
        <strong>Annual Hours Required</strong> {asDecimal.format(annualHours)}
      </p>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>% Hours</th>
            <th>Hours</th>
            <th>Rev</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(DEFAULT_HOUR_SPREAD).map(([month, ratio]) => {
            const monthHours = ratio * annualHours;

            return (
              <tr key={month}>
                <td>{month}</td>
                <td>{asPercent.format(ratio)}</td>
                <td>{asDecimal.format(monthHours)}</td>
                <td>{asDollar.format(monthHours * billRate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectionHelper;
