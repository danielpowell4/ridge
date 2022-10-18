import * as React from "react";
import { Layout } from "../../components";
import { asDollar, asPercent, Nav } from "../../lib/scorecardHelper";
import styles from "./styles.module.css";

import weeklyData from "./weeklyBilledItems.json";
import yearlyData from "./yearlyBilledItems.json";

const WEEKS_HELPER = [3, 2, 1];
const COMPARE_YEARS = [2021, 2020, 2019, 2018];
const THIS_YEAR = 2022;
const DISPLAY_TYPES = ["Absolute", "Relative"];

const ITEM_NAMES = [
  "Billed Rev",
  "All Lesson Rev",
  "ServicePackagePayment Rev",
  "All StrategySession Rev",
  "PracticeTestResult Rev",
  "TestRegistrationFee Rev",
  "ManualExpense Rev",
  "MaterialRequest Rev",
];

const LESSON_TYPE_NAMES = [
  "All Lesson Rev",
  "SAT/ACT Prep Lesson Rev",
  "Admissions Consulting Lesson Rev",
  "Subject Tutoring Lesson Rev",
  "Executive Functioning/Academic Skills Lesson Rev",
  "SSAP Prep Lesson Rev",
  "Graduate Level Test Prep Lesson Rev",
  "Other Lesson Rev",
  "The Coding Space Lesson Rev",
  "Camp Program Lesson Rev",
];

const SESSION_TYPE_NAMES = [
  "All StrategySession Rev",
  "Admissions StrategySession Rev",
  "Executive Functioning StrategySession Rev",
];

const DataTable = ({
  recentWeeks,
  lastYearWeeks,
  activeWeekNum,
  compareYear,
  attributes,
  displayType,
}) => {
  const totalAttribute = attributes[0]; // first assumed

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Attribute</td>
          {lastYearWeeks.map((week, weekIndex) => (
            <td key={weekIndex}>
              Wk {week["SY Week"]} - {compareYear}
            </td>
          ))}
          <td />
          {recentWeeks.map((week, weekIndex) => (
            <td key={weekIndex}>
              Wk {week["SY Week"]} - {THIS_YEAR}
            </td>
          ))}
          <td />
          {lastYearWeeks.map((week, weekIndex) => (
            <td key={weekIndex}>Wk {week["SY Week"]} %</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {attributes.map((attr) => {
          return (
            <tr key={attr}>
              <td>{attr}</td>
              {lastYearWeeks.map((week, weekIndex) => (
                <td
                  key={weekIndex}
                  className={
                    week["SY Week"] == activeWeekNum && styles.activeWeek
                  }
                >
                  {displayType === "Absolute"
                    ? asDollar.format(week[attr])
                    : asPercent.format(week[attr] / week[totalAttribute])}
                </td>
              ))}
              <td></td>
              {recentWeeks.map((week, weekIndex) => (
                <td
                  key={weekIndex}
                  className={
                    week["SY Week"] == activeWeekNum && styles.activeWeek
                  }
                >
                  {displayType === "Absolute"
                    ? asDollar.format(week[attr])
                    : asPercent.format(week[attr] / week[totalAttribute])}
                </td>
              ))}
              <td></td>
              {recentWeeks.map((week, weekIndex) => {
                const lastYearWeek = lastYearWeeks.find(
                  (lastWeek) => lastWeek["SY Week"] === week["SY Week"]
                );
                const thisYear = week[attr];
                const lastYear = lastYearWeek[attr];
                const thisYearRel = thisYear / week[totalAttribute];
                const lastYearRel = lastYear / lastYearWeek[totalAttribute];

                return (
                  <td
                    key={weekIndex}
                    className={`${
                      week["SY Week"] == activeWeekNum && styles.activeWeek
                    }`}
                  >
                    {displayType === "Absolute"
                      ? asPercent.format((thisYear - lastYear) / lastYear)
                      : asPercent.format(thisYearRel - lastYearRel)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const BilledItems = () => {
  const [dataset, setDataset] = React.useState(weeklyData);
  const [compareYear, setCompareYear] = React.useState(COMPARE_YEARS[0]);
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
        attributes={ITEM_NAMES}
      />

      <h2>Lessons by Project Type</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        attributes={LESSON_TYPE_NAMES}
      />

      <h2>Strategy Sessions by Service</h2>
      <DataTable
        recentWeeks={recentWeeks}
        lastYearWeeks={lastYearWeeks}
        activeWeekNum={activeWeekNum}
        compareYear={compareYear}
        displayType={displayType}
        attributes={SESSION_TYPE_NAMES}
      />
    </Layout>
  );
};

export default BilledItems;
