import * as React from "react";
import { Layout } from "../../components";
import weeklyLessons from "./lessonHoursByType.json";
import { asPercent } from "../../lib/scorecardHelper";
import { ma, dma, ema, sma, wma } from "moving-averages";

const data = weeklyLessons.map((d, index) => ({ ...d, index }));

const ATTRIBUTES = [
  "Approved Hours",
  "SAT/ACT Prep",
  "SSAP Prep",
  "Admissions Consulting",
  "Other",
];
const PAST_YEARS = [2017, 2018, 2020, 2021];
const DISPLAY_YEARS = [2017, 2018, 2020, 2021, "Average"];
const CURRENT_YEAR = 2022;

const AVERAGE_MAP = {
  simple: (values) => ma(values, 3),
  weighted: (values) => wma(values, 3),
  dynamic: (values) => dma(values, 0.5),
  exp: (values) => ema(values, 3),
  smoothed: (values) => sma(values, 5, 2),
};

const YEAR_WEIGHTS = {
  2017: 1,
  2018: 3,
  2019: 0, // ignored for ... COVID
  2020: 1,
  2021: 1,
};

const SKIP_WEEKS = {
  "Approved Hours": [26, 27, 28, 29, 30, 35],
  "SAT/ACT Prep": [26, 27, 28, 29, 30, 35],
  "SSAP Prep": [26, 27],
  "Admissions Consulting": [],
  Other: [26, 27, 28, 29, 30, 35],
};

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

import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTheme,
  VictoryLine,
} from "victory";

import styles from "../../components/LinesTime.module.css";

const setColors = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#ffff33",
];

const Legend = ({ labels }) => (
  <aside className={styles.legend}>
    {labels.map(({ label, fill }, labelIndex) => (
      <div key={labelIndex} className={styles.legend__item}>
        <div className={styles.legend__item__fill} style={{ "--fill": fill }} />
        <p className={styles.legend__item__label}>{label}</p>
      </div>
    ))}
  </aside>
);

const LineChart = ({
  height = 400,
  width = 400,
  dataset,
  withLegend = false,
  showTrend = true,
}) => {
  const series = PAST_YEARS.map((year, yIndex) => ({
    label: year,
    data: dataset
      .filter((wk) => wk["SY Year"] === year)
      .map((wk) => ({
        x: wk["SY Week"],
        y: wk.syPerc,
        tip: yIndex === 0 ? "Wk " + wk["SY Week"] : undefined,
      }))
      .filter((p) => !Number.isNaN(p.y)),
  }));
  const trends = DISPLAY_YEARS.map((year) => ({
    label: year,
    data: dataset
      .filter((wk) => wk["SY Year"] === year)
      .map((wk) => ({
        x: wk["SY Week"],
        y: wk.avg,
      }))
      .filter((p) => !Number.isNaN(p.y)),
  }));

  return (
    <React.Fragment>
      <VictoryChart
        theme={VictoryTheme.material}
        height={height}
        width={width}
        padding={{ left: 90, top: 50, right: 10, bottom: 50 }}
        margin="auto"
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => datum.tip}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
        }
      >
        {series.map((set, setIndex) => {
          const color = setColors[setIndex];

          return (
            <VictoryScatter
              key={setIndex}
              style={{
                data: { fill: color, fillOpacity: 0.4 },
                parent: { border: "1px solid #ccc" },
              }}
              data={set.data}
            />
          );
        })}
        {showTrend &&
          trends.map((line, lineIndex) => {
            const color = setColors[lineIndex];

            return (
              <VictoryLine
                key={lineIndex}
                style={{
                  data: { stroke: color },
                  parent: { border: "1px solid #ccc" },
                }}
                data={line.data}
              />
            );
          })}
      </VictoryChart>
      {withLegend && (
        <Legend
          labels={trends.map(({ label }, setIndex) => ({
            label,
            fill: setColors[setIndex],
          }))}
        />
      )}
    </React.Fragment>
  );
};

const HoursBarometer = () => {
  const [attribute, setAttribute] = React.useState(ATTRIBUTES[0]);
  const [avgType, setAvgType] = React.useState("simple");
  const [showTrend, setShowTrend] = React.useState(true);

  const weekNumbers = Array.from(new Set(data.map((wk) => wk["SY Week"]))).sort(
    (a, b) => a - b
  );

  let yearlyTotals = {};
  PAST_YEARS.forEach((year) => {
    const weeklyTotals = data
      .filter((wk) => wk["SY Year"] === year)
      .map((wk) => wk[attribute]);
    yearlyTotals[year] = weeklyTotals.reduce((acc, item) => acc + item, 0);
  });

  const percData = data.map((d) => ({
    ...d,
    syTotal: yearlyTotals[d["SY Year"]],
    syPerc: d[attribute] / yearlyTotals[d["SY Year"]],
  }));

  const weeklyValues = percData.map((wk) => wk.syPerc);
  const avgFunc = AVERAGE_MAP[avgType];
  const movingAverages = avgFunc(weeklyValues);

  const avgData = percData.map((d) => {
    if (SKIP_WEEKS[attribute].includes(d["SY Week"])) {
      return { ...d, avg: d.syPerc }; // don't use averages
    } else {
      return { ...d, avg: movingAverages[d.index] || d.syPerc };
    }
  });

  const compositeData = weekNumbers
    .map((wkNum) => {
      const weekCollection = avgData.filter((d) => d["SY Week"] == wkNum);
      let runningTotal = 0;
      let divideBy = 0;

      for (let week of weekCollection) {
        const weight = YEAR_WEIGHTS[week["SY Year"]];
        const syPerc = week.avg;
        const pointWeight = syPerc * weight;
        if (!Number.isNaN(pointWeight)) {
          divideBy += weight;
          runningTotal += pointWeight;
        }
      }

      return {
        "SY Year": "Average",
        "SY Week": wkNum,
        syPerc: runningTotal / divideBy,
        avg: runningTotal / divideBy,
      };
    })
    .filter((p) => !Number.isNaN(p.syPerc));

  const dataset = [...avgData, ...compositeData];

  let forecasts = [];

  return (
    <Layout showNav={false}>
      <h1>By Week</h1>
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "1rem" }}>
        {Object.keys(AVERAGE_MAP).map((key) => (
          <label htmlFor={key} key={key}>
            <input
              type="radio"
              id={key}
              value={key}
              checked={key == avgType}
              onChange={() => setAvgType(key)}
            />
            {key}
          </label>
        ))}
      </div>
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "1rem" }}>
        {ATTRIBUTES.map((attr) => (
          <label htmlFor={attr} key={attr}>
            <input
              type="radio"
              id={attr}
              value={attr}
              checked={attr == attribute}
              onChange={() => setAttribute(attr)}
            />
            {attr}
          </label>
        ))}
      </div>
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "1rem" }}>
        <label htmlFor={"showTrend"}>
          <input
            type="checkbox"
            id={"showTrend"}
            checked={showTrend}
            onChange={() => setShowTrend((prev) => !prev)}
          />
          Show Lines
        </label>
      </div>

      <LineChart
        dataset={dataset}
        width={800}
        height={300}
        withLegend
        showTrend={showTrend}
      />

      <table>
        <thead>
          <tr>
            <th />
            <th>Week</th>
            {PAST_YEARS.map((year) => (
              <th key={year}>{year}</th>
            ))}
            <th>Weighted Avg</th>
            <th>2022 Actual</th>
            <th>2022 Backtrack</th>
          </tr>
        </thead>
        <tbody>
          {weekNumbers.map((weekNumber) => {
            const currentYearWeek =
              dataset.find(
                (wk) =>
                  wk["SY Year"] === CURRENT_YEAR && wk["SY Week"] === weekNumber
              ) || {};
            const compositeWk =
              dataset.find(
                (wk) =>
                  wk["SY Year"] === "Average" && wk["SY Week"] === weekNumber
              ) || {};
            const weekForecast = currentYearWeek[attribute] / compositeWk.avg;

            if (!Number.isNaN(weekForecast)) {
              forecasts.push(weekForecast);
            }

            return (
              <tr key={weekNumber}>
                <td>{SY_WEEK_MONTH_MAP[weekNumber] || "-"}</td>
                <td>{weekNumber}</td>
                {DISPLAY_YEARS.map((year) => {
                  const week =
                    dataset.find(
                      (wk) =>
                        wk["SY Year"] === year && wk["SY Week"] === weekNumber
                    ) || {};

                  const avg = week.avg;

                  // return <td key={year}>{asPercent.format(avg)}</td>;
                  return <td key={year}>{avg?.toFixed(5)}</td>;
                })}
                <td>{currentYearWeek[attribute] || "-"}</td>
                <td>
                  {currentYearWeek[attribute] ? weekForecast.toFixed(5) : "-"}
                </td>
              </tr>
            );
          })}
          <tr>
            <td />
            <td />
            {DISPLAY_YEARS.map((year) => (
              <td key={year} />
            ))}
            <td />
            <td>
              {`Avg SYTD `}
              {(
                forecasts.reduce((acc, item) => acc + item, 0) /
                forecasts.length
              ).toFixed()}
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default HoursBarometer;
