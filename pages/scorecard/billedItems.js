import * as React from "react";
import { Layout } from "../../components";
import { Nav, DataTable, asDollar } from "../../lib/scorecardHelper";
import styles from "./styles.module.css";

import weeklyData from "./weeklyBilledItems.json";
import yearlyData from "./yearlyBilledItems.json";

const WEEKS_HELPER = [3, 2, 1];
const COMPARE_YEARS = [2018, 2019, 2020, 2021];
const DISPLAY_TYPES = ["Absolute", "Relative"];

const ITEM_NAMES = [
  "All Items",
  "All Lessons",
  "Packages",
  "All Strategy Sessions",
  "Practice Tests",
  "Test Fees",
  "Curriculum Fees",
  "Class Payments",
  "Misc Billing",
];

const LESSON_TYPE_NAMES = [
  "All Lessons",
  "Subject Tutoring Lessons",
  "SAT/ACT Prep Lessons",
  "SSAP Prep Lessons",
  "Admissions Consulting Lessons",
  "Executive Functioning/Academic Skills Lessons",
  "Graduate Level Test Prep Lessons",
  "Other Lessons",
  "The Coding Space Lessons",
  "Camp Program Lessons",
];

const SESSION_TYPE_NAMES = [
  "All Strategy Sessions",
  "Admissions Strategy Sessions",
  "Executive Functioning Strategy Sessions",
];

const BilledItems = () => {
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
      <h1>Billed Items</h1>
      <p>
        <em>
          This includes items billed for the stated week. It does{" "}
          <strong>not</strong> include revenue earned from packages.
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

      <h2>By Item Type</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        absoluteFormatter={asDollar}
        attributes={ITEM_NAMES}
      />

      <h2>Lessons by Project Type</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        absoluteFormatter={asDollar}
        attributes={LESSON_TYPE_NAMES}
      />

      <h2>Strategy Sessions by Service</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        absoluteFormatter={asDollar}
        attributes={SESSION_TYPE_NAMES}
      />
    </Layout>
  );
};

export default BilledItems;
