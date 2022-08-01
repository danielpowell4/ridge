import * as React from "react";
import { Layout, LinesTime, ScattersTime } from "../../components";
import styles from "./styles.module.css";
import { FORMATTERS, Nav } from "../../lib/scorecardHelper";

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
            <th>Week</th>
            {YEARS.map((year) => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekNumbers.map((weekNumber) => (
            <tr key={weekNumber}>
              <td>{weekNumber}</td>
              {YEARS.map((year) => {
                const week =
                  weeklyData.find(
                    (wk) =>
                      wk["SY Year"] === year && wk["SY Week"] === weekNumber
                  ) || {};
                const value = week[attribute];

                return <td key={year}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default SeasonStrength;
