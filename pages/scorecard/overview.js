import * as React from "react";
import { Layout } from "../../components";
import { FORMATTERS, asPercent, Nav } from "../../lib/scorecardHelper";
import styles from "./styles.module.css";
import Link from "next/link";

import weeklyData from "./weeklyData.json";
import yearlyData from "./yearlyData.json";

const WEEKS_HELPER = [3, 2, 1];
const COMPARE_YEARS = [2018, 2019, 2020, 2021];
const THIS_YEAR = 2022;

const ATTRIBUTE_NAMES = [
  "Billed Items",
  "Active Families",
  "Approved Hours",
  "Hour per Client",
  "Active Tutors",
  "Online %",
  "Salaried Coach %",
  "SAT/ACT Hours %",
  "Tutor Pay Rate %",
  "Avg Online Bill Rate",
  "Avg In-Person Bill Rate",
  "Client Referrals",
  "Contact Us Forms",
  "Projects Added",
  "1st Consultations",
];

const DETAIL_VIEWS = {
  "Billed Items": "/scorecard/billedItems",
  "Approved Hours": "/scorecard/lessons",
  "1st Consultations": "/scorecard/consultations",
};

const ByWeek = () => {
  const [dataset, setDataset] = React.useState(weeklyData);
  const [compareYear, setCompareYear] = React.useState(
    COMPARE_YEARS[COMPARE_YEARS.length - 1]
  );

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
      <h1>Scorecard Overview</h1>
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
      </div>
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
          {ATTRIBUTE_NAMES.map((attr) => {
            const formatter = FORMATTERS[attr];
            const detailPath = DETAIL_VIEWS[attr];

            return (
              <tr key={attr}>
                <td>
                  {detailPath ? (
                    <Link href={detailPath}>
                      <a>{attr}</a>
                    </Link>
                  ) : (
                    attr
                  )}
                </td>
                {lastYearWeeks.map((week, weekIndex) => (
                  <td
                    key={weekIndex}
                    className={
                      week["SY Week"] == activeWeekNum &&
                      styles.activeLastYearWeek
                    }
                  >
                    {formatter.format(week[attr])}
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
                    {formatter.format(week[attr])}
                  </td>
                ))}
                <td></td>
                {recentWeeks.map((week, weekIndex) => {
                  const lastYearWeek = lastYearWeeks.find(
                    (lastWeek) => lastWeek["SY Week"] === week["SY Week"]
                  );
                  const thisYear = week[attr];
                  const lastYear = lastYearWeek[attr];

                  return (
                    <td
                      key={weekIndex}
                      className={
                        week["SY Week"] == activeWeekNum && styles.activeWeek
                      }
                    >
                      {asPercent.format((thisYear - lastYear) / lastYear)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default ByWeek;
