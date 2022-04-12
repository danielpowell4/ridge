import * as React from "react";
import { Layout } from "../../components";

import projectTypeHours from "./projectTypeHours.json";

import syData from "./syData2021.json";

import { mean } from "simple-statistics";

const PROJECT_TYPES = [
  "Subject Tutoring",
  "SAT/ACT Prep",
  "SSAP Prep",
  "Admissions Consulting",
  "Executive Functioning/Academic Skills",
  "Graduate Level Test Prep",
  "Other",
];

// SY Ordering
const MONTHS = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
const MONTH_NAMES = [
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

const SUFFIX_OPTIONS = [
  { label: "SY Year %", value: " YR %" },
  { label: "Hours", value: " Hours" },
];

const MARKET_OPTIONS = [
  { value: "Consolidated", label: "Consolidated" },
  { value: "NYC", label: "NYC" },
  { value: "Westchester", label: "Westchester" },
  { value: "Long Island", label: "Long Island" },
  { value: "DC Metro", label: "DC Metro" },
  { value: "Northern New Jersey", label: "Northern New Jersey" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Long Island South Shore", label: "Long Island South Shore" },
  { value: "International", label: "International" },
  { value: "Central New Jersey", label: "Central New Jersey" },
  { value: "South Florida", label: "South Florida" },
  { value: "Connecticut", label: "Connecticut" },
];

const ForecastingPage = () => {
  const [suffix, _setSuffix] = React.useState(" YR %");
  const [market, setMarket] = React.useState(MARKET_OPTIONS[0].value);

  const activeSYData = syData[market];
  const projectTypeData = projectTypeHours[market];

  let projectTypeAvg = {};
  for (let projectType of PROJECT_TYPES) {
    let projectTypeTally = {};

    for (let month of MONTHS) {
      const monthPercents = projectTypeData
        .filter((row) => row["sy_month"] == month)
        .map((row) => row[`${projectType} YR %`]);

      projectTypeTally[month] = mean(monthPercents);
    }

    projectTypeAvg[projectType] = projectTypeTally;
  }

  return (
    <Layout>
      <h1>Forecasting</h1>
      <div>
        <ul style={{ listStyle: "none" }}>
          <li>
            <label htmlFor="suffix">Market</label>{" "}
            <select
              id="market"
              name="market"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            >
              {MARKET_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </li>
        </ul>

        <h2>SY 2021</h2>
        <p>
          Real and <span style={{ color: "deepskyblue" }}>Projected</span> hours
          by project type based on avg annual ratios and hours this year.
        </p>
        <table>
          <thead>
            <tr>
              <th>Project Type</th>
              <th>SY Forecast</th>
              {MONTH_NAMES.map((month) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROJECT_TYPES.map((projectType) => {
              const monthAvgs = projectTypeAvg[projectType];
              const reliableMonths = MONTHS.filter(
                (month) =>
                  !!activeSYData.find((row) => row["sy_month"] == month)
              );
              const monthlySYGuesses = reliableMonths.map((month) => {
                const ratio = monthAvgs[month];
                const monthRow = activeSYData.find(
                  (row) => row["sy_month"] == month
                );
                const monthTotal = monthRow[`${projectType} Hours`];

                if (ratio === 0) {
                  return 0; // avoid divide by 0
                }

                return monthTotal / ratio;
              });

              const syForecast = mean(monthlySYGuesses);

              return (
                <tr key={projectType}>
                  <td>{projectType}</td>
                  <td>{syForecast.toFixed(2)}</td>

                  {MONTHS.map((month) => {
                    const syMonth = activeSYData.find(
                      (row) => row["sy_month"] == month
                    );

                    if (!syMonth) {
                      const monthRatio = monthAvgs[month];
                      return (
                        <td key={month} style={{ color: "deepskyblue" }}>
                          {(syForecast * monthRatio).toFixed()}
                        </td>
                      );
                    }

                    return (
                      <td key={month}>{syMonth[`${projectType} Hours`]}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>Project Types</h2>
        <p>
          Average % of year for each month for each project type since SY 18-19
        </p>
        <table>
          <thead>
            <tr>
              <th>Project Type</th>
              {MONTH_NAMES.map((month) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROJECT_TYPES.map((projectType) => {
              return (
                <tr key={projectType}>
                  <td>{projectType}</td>
                  {MONTHS.map((month) => {
                    const points = projectTypeData
                      .filter((row) => row["sy_month"] == month)
                      .map((row) => row[`${projectType}${suffix}`]);

                    if (!points.length) return <td>-</td>;

                    if (suffix.includes("%")) {
                      return (
                        <td key={month}>{(mean(points) * 100).toFixed(2)}</td>
                      );
                    }

                    return <td key={month}>{mean(points).toFixed(2)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ForecastingPage;
