import * as React from "react";
import { Layout } from "../../components";
import { Nav, DataTable, asDecimal } from "../../lib/scorecardHelper";
import styles from "./styles.module.css";

import weeklyData from "./weeklyConsultations.json";
import yearlyData from "./yearlyConsultations.json";

const WEEKS_HELPER = [3, 2, 1];
const COMPARE_YEARS = [2018, 2019, 2020, 2021];
const DISPLAY_TYPES = ["Absolute", "Relative"];

const PROJECT_TYPE_NAMES = [
  "1st Consultations",
  "Subject Tutoring",
  "SAT/ACT Prep",
  "SSAP Prep",
  "Admissions Consulting",
  "Executive Functioning/Academic Skills",
  "Graduate Level Test Prep",
  "Camp Program",
  "The Coding Space",
  "Other",
];

const Consultations = () => {
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
      <h1>Consultations</h1>
      <p>
        <em>
          This includes the only first scheduled consultation for a student.
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

      <h2>Consultations by Project Type</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        absoluteFormatter={asDecimal}
        attributes={PROJECT_TYPE_NAMES}
      />
    </Layout>
  );
};

export default Consultations;
