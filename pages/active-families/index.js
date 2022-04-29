import * as React from "react";
import { Layout, LinesTime, StackedBars } from "../../components";

import data from "./data.json";

const GROUPS = [
  { value: "", label: "All" },
  { value: "K-5 ", label: "K-5" },
  { value: "6-8 ", label: "6-8" },
  { value: "HS Freshman ", label: "HS Freshman" },
  { value: "HS Sophomore ", label: "HS Sophomore" },
  { value: "HS Junior ", label: "HS Junior" },
  { value: "HS Senior ", label: "HS Senior" },
];

const POINTS = [
  "Lesson Families",
  "Additional Lesson Families",
  "Discontinuing Lesson Families",
  "Net Change",
  "New Lesson Families",
  "Returning Lesson Families",
  "Continuing Lesson Families",

  "Lesson Rev",
  "Proxy Wages",
  "Naive Profit",
  "Tutor Pay Rate %",
];

const YEARS = ["2018-19", "2019-20", "2020-21", "2021-22"];
// const QUARTERS = ["July", "October", "January", "April"];

const ActiveFamiliesPage = () => {
  const [prefix, setPrefix] = React.useState("");

  const lineChartData = YEARS.map((year) => {
    return {
      label: year,
      data: data
        .filter((q) => q.sy_label === year)
        .map((q) => ({
          x: q.quarter,
          y: q[prefix + "Lesson Families"],
          tip: `${year} - ${q[prefix + "Lesson Families"]}`,
        })),
    };
  });

  return (
    <Layout>
      <h1>Active Families</h1>
      <div>
        <ul>
          <li>
            <label htmlFor="scoreField">Group</label>{" "}
            <select value={prefix} onChange={(e) => setPrefix(e.target.value)}>
              {GROUPS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <h2>Active Families by Quarter</h2>
      <div style={{ display: "flex" }}>
        <LinesTime lines={lineChartData} width={800} height={300} withLegend />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: 180 }}>Quarter</th>
            {POINTS.map((p) => (
              <th key={p}>{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((month) => {
            return (
              <tr key={month.quarter_starting}>
                <td>{month.quarter_starting}</td>
                {POINTS.map((p) => (
                  <td key={p}>{month[prefix + p]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default ActiveFamiliesPage;
