import * as React from "react";
import { Layout, LinesTime, StackedBars } from "../../components";

import rawData from "./leads.json";

const TYPES = [
  "Client",
  "Contact",
  "Employee",
  "Private Prep Website",
  "School Program",
  "Unknown",
  "Other",
];

const data = rawData
  .map((d) => {
    const total = TYPES.reduce((acc, type) => acc + d[type], 0);
    return { ...d, total };
  })
  .sort((a, b) => b.month_starting - a.month_starting);

const SeasonStrength = () => {
  return (
    <Layout showNav={false}>
      <h1>Referrals by Type</h1>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            {TYPES.map((type) => (
              <th key={type}>{type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, dIndex) => (
            <tr key={dIndex}>
              <td>{d.month_starting}</td>
              {TYPES.map((type) => (
                <td key={type}>{d[type]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default SeasonStrength;
