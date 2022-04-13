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
  "Canceled",
  "Total",
];

const SCHOOL_YEARS = ["2018-2019", "2019-2020", "2020-2021"];
const THIS_YEAR = "2021-2022";

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

// const SUFFIX_OPTIONS = [
//   { label: "SY Year %", value: " YR %" },
//   { label: "Hours", value: " Hours" },
// ];

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
          by project type
        </p>
        <p>
          <strong>SY Forecast Avg</strong> is based on an average of annual
          ratios applied to hours this school year.
        </p>
        <p>
          <strong>SY Forecast Total</strong> is based on a total of monthly
          actual hours and projections.
        </p>
        <table>
          <thead>
            <tr>
              <th>Project Type</th>
              {MONTH_NAMES.map((month) => (
                <th key={month}>{month}</th>
              ))}
              <th>SY Forecast Avg</th>
              <th>SY Forecast Total</th>
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
              let syTotal = 0;

              return (
                <tr key={projectType}>
                  <td>{projectType}</td>
                  {MONTHS.map((month) => {
                    const syMonth = activeSYData.find(
                      (row) => row["sy_month"] == month
                    );

                    if (!syMonth) {
                      const monthRatio = monthAvgs[month];
                      const value = syForecast * monthRatio;
                      syTotal += value;
                      return (
                        <td key={month} style={{ color: "deepskyblue" }}>
                          {value.toFixed()}
                        </td>
                      );
                    }

                    const value = syMonth[`${projectType} Hours`];
                    syTotal += value;

                    return <td key={month}>{value}</td>;
                  })}
                  <td>
                    <span style={{ color: "deepskyblue" }}>
                      {syForecast.toFixed(0)}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: "deepskyblue" }}>
                      {syTotal.toFixed(0)}
                    </span>
                  </td>
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
        <h2>Project Types by Year</h2>
        <p>Last few school years by month</p>
        {PROJECT_TYPES.map((projectType) => {
          const HOUR_KEY = `${projectType} Hours`;
          const PERC_KEY = `${projectType} YR %`;
          let syForecasts = [];
          let syValue = 0;

          return (
            <div key={projectType}>
              <h3>{projectType}</h3>
              <table>
                <thead>
                  <tr>
                    <td>Month</td>
                    {SCHOOL_YEARS.map((year) => (
                      <td key={year}>{year}</td>
                    ))}
                    <td>{THIS_YEAR}</td>
                    <td>SY Forecast Total</td>
                  </tr>
                </thead>
                <tbody>
                  {MONTHS.map((month, monthIndex) => {
                    const pastMonths = projectTypeData.filter(
                      (row) => row["sy_month"] == month
                    );
                    const pastAvgs = pastMonths.map((row) => row[PERC_KEY]);
                    const pastAvg = mean(pastAvgs);
                    const thisMonth =
                      activeSYData.find((row) => row["sy_month"] == month) ||
                      {};
                    let thisValue = thisMonth[HOUR_KEY];
                    const isForecasted = !thisValue && thisValue !== 0;
                    let thisForecast;

                    if (!isForecasted) {
                      thisForecast = pastAvg > 0 ? thisValue / pastAvg : 0;
                      syForecasts.push(thisForecast);
                    } else {
                      if (syForecasts.length) {
                        const avgForecast = mean(syForecasts);
                        thisValue = Number((pastAvg * avgForecast).toFixed());
                      } else {
                        thisValue = 0;
                      }
                      thisForecast = 0;
                    }

                    syValue += thisValue;

                    return (
                      <tr key={month}>
                        <td>{MONTH_NAMES[monthIndex]}</td>
                        {SCHOOL_YEARS.map((year) => {
                          const row = pastMonths.find(
                            (row) => row["sy_year"] == year
                          );

                          if (!row) return <td>-</td>;

                          return (
                            <td key={month}>
                              {row[HOUR_KEY].toFixed(2)} (
                              {(row[PERC_KEY] * 100).toFixed(2)}
                              %)
                            </td>
                          );
                        })}
                        <td>
                          {isForecasted ? (
                            <span style={{ color: "deepskyblue" }}>
                              {thisValue}
                            </span>
                          ) : (
                            thisValue
                          )}{" "}
                          <span style={{ color: "deepskyblue" }}>
                            ({(pastAvg * 100).toFixed(2)}%)
                          </span>
                        </td>
                        <td>
                          {isForecasted ? (
                            "-"
                          ) : (
                            <span style={{ color: "deepskyblue" }}>
                              {thisForecast.toFixed()}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>SY Total</td>
                    {SCHOOL_YEARS.map((year) => {
                      const sampleMonth = projectTypeData.find(
                        (row) => row["sy_year"] == year && row[HOUR_KEY] > 0
                      );
                      if (!sampleMonth) {
                        return <td key={year}>-</td>;
                      }

                      const hours = sampleMonth[HOUR_KEY];
                      const perc = sampleMonth[PERC_KEY];
                      const syTotal = (hours / perc).toFixed(2);

                      return <td key={year}>{syTotal}</td>;
                    })}
                    <td>
                      <span style={{ color: "deepskyblue" }}>
                        {syValue.toFixed()}
                      </span>
                      {` - Total`}
                    </td>
                    <td>
                      <span style={{ color: "deepskyblue" }}>
                        {syForecasts.length ? mean(syForecasts).toFixed() : 0}
                      </span>
                      {` - Avg`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ForecastingPage;
