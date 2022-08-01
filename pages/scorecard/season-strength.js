import * as React from "react";
import { Layout, LinesTime } from "../../components";
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

const SeasonStrength = () => {
  const [attribute, setAttribute] = React.useState(ATTRIBUTES[0]);
  const data = weeklyData;

  const formatter = FORMATTERS[attribute];

  const lineChartData = YEARS.map((year) => {
    return {
      label: year,
      data: data
        .filter((wk) => wk["SY Year"] === year)
        .map((wk) => ({
          x: wk["SY Week"],
          y: wk[attribute],
          tip: `${year} - ${formatter.format(wk[attribute])}`,
        })),
    };
  });

  return (
    <Layout showNav={false}>
      <header>
        <Nav />
      </header>
      <h1>Season Strength</h1>

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
      </div>

      <div style={{ display: "flex" }}>
        <LinesTime lines={lineChartData} width={800} height={300} withLegend />
      </div>
    </Layout>
  );
};

export default SeasonStrength;
