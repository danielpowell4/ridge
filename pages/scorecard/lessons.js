import * as React from "react";
import { Layout } from "../../components";
import { Nav, DataTable, asDecimal } from "../../lib/scorecardHelper";
import styles from "./styles.module.css";

import weeklyData from "./weeklyLessons.json";
import yearlyData from "./yearlyLessons.json";

const WEEKS_HELPER = [3, 2, 1];
const COMPARE_YEARS = [2018, 2019, 2020, 2021];
const DISPLAY_TYPES = ["Absolute", "Relative"];

const LESSON_TYPE_NAMES = [
  "Approved Hours",
  "Subject Tutoring Hours",
  "SAT/ACT Prep Hours",
  "SSAP Prep Hours",
  "Admissions Consulting Hours",
  "Executive Functioning/Academic Skills Hours",
  "Graduate Level Test Prep Hours",
  "Camp Program Hours",
  "The Coding Space Hours",
  "Other Hours",
];

const LOCATION_TYPE_NAMES = [
  "Approved Hours",
  "Online Hours",
  "At Client Hours",
  "PP Office Hours",
];

const Lessons = () => {
  const [dataset, setDataset] = React.useState(weeklyData);
  const [compareYear, setCompareYear] = React.useState(
    COMPARE_YEARS[COMPARE_YEARS.length - 1]
  );
  const [displayType, setDisplayTypes] = React.useState(DISPLAY_TYPES[0]);

  const activeWeek = dataset[dataset.length - 1];
  const activeWeekNum = activeWeek["SY Week"];

  const recentWeeks = WEEKS_HELPER.map(
    (weekDiff) => dataset[dataset.length - weekDiff]
  );
  const lastYearWeeks = recentWeeks.map((weekData) =>
    dataset.find(
      (lastYear) =>
        lastYear["SY Week"] === weekData["SY Week"] &&
        lastYear["SY Year"] === compareYear
    )
  );

  return (
    <Layout showNav={false}>
      <header>
        <Nav />
      </header>
      <h1>Lesson Hours</h1>
      <p>
        <em>
          This includes approved lessons hours that were billed hourly, applied
          against a pre-paid package or charged at a $0/hr rate.
        </em>
      </p>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Dataset</label>
          {[
            ["By Week", "weeklyData", weeklyData],
            ["SYTD", "yearlyData", yearlyData],
          ].map(([title, id, data]) => (
            <div key={id}>
              <input
                id={id}
                type="radio"
                onChange={() => setDataset(data)}
                checked={data == dataset}
              />
              <label htmlFor={id}>{title}</label>
            </div>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <label>Year Compare</label>
          {COMPARE_YEARS.map((year) => (
            <div key={year}>
              <input
                id={year}
                type="radio"
                onChange={() => setCompareYear(year)}
                checked={year == compareYear}
              />
              <label htmlFor={year}>{year}</label>
            </div>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <label>Display Type</label>
          {DISPLAY_TYPES.map((display) => (
            <div key={display}>
              <input
                id={display}
                type="radio"
                onChange={() => setDisplayTypes(display)}
                checked={display == displayType}
              />
              <label htmlFor={display}>{display}</label>
            </div>
          ))}
        </div>
      </div>

      <h2>Lessons by Project Type</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        absoluteFormatter={asDecimal}
        attributes={LESSON_TYPE_NAMES}
      />

      <h2>Lessons by Location Category</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        absoluteFormatter={asDecimal}
        attributes={LOCATION_TYPE_NAMES}
      />
    </Layout>
  );
};

export default Lessons;
