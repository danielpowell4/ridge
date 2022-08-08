import * as React from "react";
import { Layout, LinesTime, ScattersTime } from "../../components";
import styles from "./styles.module.css";
import { FORMATTERS, Nav, asPercent } from "../../lib/scorecardHelper";

import weeklyData from "./weeklyData.json";

const ATTRIBUTES = [
  "Billed Rev",
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
  "Consultations",
];

const YEARS = [2018, 2019, 2020, 2021, 2022];
const CHART_NAMES = ["Scatter with Trend", "Line"];

const SY_WEEK_MONTH_MAP = {
  2: "July",
  6: "Aug",
  10: "Sept",
  14: "Oct",
  19: "Nov",
  23: "Dec",
  28: "Jan",
  32: "Feb",
  36: "Mar",
  40: "April",
  45: "May",
  49: "June",
};

const SeasonStrength = () => {
  const [attribute, setAttribute] = React.useState(ATTRIBUTES[0]);
  const [chartName, setChartName] = React.useState(CHART_NAMES[0]);
  const data = weeklyData;

  const formatter = FORMATTERS[attribute];
  const weekNumbers = Array.from(new Set(data.map((wk) => wk["SY Week"]))).sort(
    (a, b) => a - b
  );

  const chartData = YEARS.map((year) => ({
    label: year,
    data: data
      .filter((wk) => wk["SY Year"] === year)
      .map((wk) => ({
        x: wk["SY Week"],
        y: wk[attribute],
        tip: `${year} - ${formatter.format(wk[attribute])}`,
      })),
  }));

  const yearlyTotals = chartData.map((set) => ({
    year: set.label,
    total: set.data.reduce((acc, item) => acc + item.y, 0),
  }));

  return (
    <Layout showNav={false}>
      <header>
        <Nav />
      </header>
      <h1>Trends</h1>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Attribute</label>
          {ATTRIBUTES.map((attrName, attrIndex) => {
            const id = `attr${attrIndex}`;
            return (
              <div key={attrIndex}>
                <input
                  id={id}
                  type="radio"
                  onChange={() => setAttribute(attrName)}
                  checked={attribute === attrName}
                />
                <label htmlFor={id}>{attrName}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.filterGroup}>
          <label>Chart Type</label>
          {CHART_NAMES.map((chart, chartIndex) => {
            const id = `chart${chartIndex}`;
            return (
              <div key={chartIndex}>
                <input
                  id={id}
                  type="radio"
                  onChange={() => setChartName(chart)}
                  checked={chartName === chart}
                />
                <label htmlFor={id}>{chart}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {chartName === "Scatter with Trend" && (
          <ScattersTime
            series={chartData}
            width={800}
            height={300}
            withLegend
          />
        )}
        {chartName === "Line" && (
          <LinesTime lines={chartData} width={800} height={300} withLegend />
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th />
            <th>Week</th>
            {YEARS.map((year) => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekNumbers.map((weekNumber) => (
            <tr key={weekNumber}>
              <td>{SY_WEEK_MONTH_MAP[weekNumber]}</td>
              <td>{weekNumber}</td>
              {YEARS.map((year) => {
                const yearlyTotal = yearlyTotals.find(
                  (t) => t.year === year
                )?.total;
                const week =
                  weeklyData.find(
                    (wk) =>
                      wk["SY Year"] === year && wk["SY Week"] === weekNumber
                  ) || {};
                const value = week[attribute];

                return (
                  <td key={year}>
                    {value} ({asPercent.format(value / yearlyTotal)})
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default SeasonStrength;
