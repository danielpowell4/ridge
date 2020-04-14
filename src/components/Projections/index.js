import React, { useState } from "react";
import moment from "moment";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryTheme,
  Bar,
} from "victory";
import Select from "react-select";

// for coloring
import {
  quantile,
  quantileRank,
  mean,
  median,
  mode,
  min,
  max,
} from "simple-statistics";

import allData from "./2020_april_by_market_by_category_with_grades.json";

// setup options
const marketOptions = allData.map((marketGroup) => ({
  value: marketGroup.name,
  label: marketGroup.name,
  ...marketGroup,
}));
const categoryOptions = [
  "Admissions Consulting",
  "College Academics",
  "College Transitions Program",
  "English",
  "Executive Functioning",
  "Foreign Language",
  "Graduate Level Tests",
  "History and Social Sciences",
  "Math",
  "Multi-Subject Support",
  "Other",
  "SAT/ACT Prep",
  "Science",
  "SSAP Prep",
].map((cat) => ({ value: cat, label: cat }));

const dimensionOptions = [
  "hours",
  "coaches",
  "all_students",
  "High School Senior",
  "High School Junior",
  "High School Sophomore",
  "High School Freshman",
  "College Senior",
  "College Junior",
  "College Sophomore",
  "College Freshman",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Kindergarten",
].map((dim) => ({
  value: dim,
  label: dim,
}));

const Filters = ({ filters }) => (
  <ul
    style={{
      display: `grid`,
      gridTemplateColumns: `repeat(3, 1fr)`,
      gridGap: `1rem`,
      maxWidth: 600,
      margin: `auto`,
      listStyle: `none`,
    }}
  >
    {filters.map((filter) => (
      <li key={filter.label}>
        <strong>{filter.label}</strong>
        {filter.type === `Select` ? (
          <Select
            options={filter.options}
            selected={filter.selected}
            onChange={filter.onChange}
          />
        ) : filter.type === `date` ? (
          <input
            type={filter.type}
            value={filter.selected}
            onChange={filter.onChange}
          />
        ) : (
          <p style={{ color: `red` }}>Unsupported filter type</p>
        )}
      </li>
    ))}
  </ul>
);

// setup coloring

// http://colorbrewer2.org/#type=sequential&scheme=Greens&n=6
const colorRange = [
  "#ffffcc",
  "#d9f0a3",
  "#addd8e",
  "#78c679",
  "#31a354",
  "#006837",
];
const colorCount = colorRange.length;
const getRankedFill = (fullRange, d) => {
  let rank = Math.floor(quantileRank(fullRange, d) * (colorCount - 1));
  return colorRange[rank];
};

const ColorLabel = ({ dataset, colorRange }) => {
  const fullRange = dataset.map((d) => d.y);
  const colorCount = colorRange.length;
  const labels = colorRange.map((fill, i) => {
    if (i === 0) {
      return { start: 0, fill };
    }

    let max = (i + 1) / colorCount;
    return { start: quantile(fullRange, max), fill };
  });

  return labels.map(({ start, fill }, i) => (
    <div
      key={i}
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        padding: "0.5rem 1rem",
      }}
    >
      <div
        style={{
          width: "1rem",
          height: "1rem",
          marginRight: "0.25rem",
          backgroundColor: fill,
        }}
      />
      <p style={{ margin: 0 }}>{start}+</p>
    </div>
  ));
};

const RankedBar = ({ fullRange, ...props }) => {
  return (
    <Bar {...props} style={{ fill: getRankedFill(fullRange, props.datum.y) }} />
  );
};

const BarTime = ({
  height = 400,
  width = 400,
  dataset,
  fullRange = dataset.map((d) => d.y),
  timeTickFormat = (t) => moment(t).format("MMM YY"),
}) => {
  const yDomain = [0, Math.max(...fullRange) * 1.05];

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 15 }}
      width={width}
      height={height}
      margin={`auto`}
      domain={{ y: yDomain }}
    >
      <VictoryBar
        data={dataset}
        dataComponent={<RankedBar fullRange={fullRange} />}
        labelComponent={
          <VictoryTooltip
            orientation="right"
            dy={(d) => -(d.y / 2) - 6.5}
            dx={2}
            cornerRadius={0}
            flyoutStyle={{ fill: "white" }}
          />
        }
      />
      <VictoryAxis
        scale="time"
        standalone={false}
        tickFormat={timeTickFormat}
      />
      <VictoryAxis
        dependentAxis
        offsetX={50}
        orientation="left"
        standalone={false}
        tickCount={6}
      />
    </VictoryChart>
  );
};

// actual component

const Projections = () => {
  const [market, setMarket] = useState();
  const [category, setCategory] = useState();
  const [dimension, setDimension] = useState();
  const [segmentStart, setSegmentStart] = useState("2018-08-01");
  const [segmentEnd, setSegmentEnd] = useState("2018-12-01");

  const filters = [
    {
      label: `Market`,
      options: marketOptions,
      selected: market,
      onChange: setMarket,
      type: `Select`,
    },
    {
      label: `Subject Category`,
      options: categoryOptions,
      selected: categoryOptions.filter((opt) => opt.value === category),
      onChange: (selected) => setCategory(selected.value),
      type: `Select`,
    },
    {
      label: `Dimension`,
      options: dimensionOptions,
      selected: dimensionOptions.filter((opt) => opt.value === dimension),
      onChange: (selected) => setDimension(selected.value),
      type: `Select`,
    },
    {
      label: `First Segment Starts`,
      selected: segmentStart,
      onChange: (e) => setSegmentStart(e.target.value),
      type: `date`,
    },
    {
      label: `First Segment Ends`,
      selected: segmentEnd,
      onChange: (e) => setSegmentEnd(e.target.value),
      type: `date`,
    },
  ];

  const activeData =
    !market || !category || !dimension
      ? []
      : market.weeks.map((weekData) => {
          let val = weekData[category][dimension];

          return {
            x: new Date(weekData.start_date),
            y: val,
            label: `${val} ${dimension} | Week of ${moment(
              weekData.start_date
            ).format("L")}`,
          };
        });

  const fullRange = activeData.map((d) => d.y);
  const segmentOneStart = moment(segmentStart);
  const segmentOneEnd = moment(segmentEnd);
  const segmentTwoStart = moment(segmentStart).add(1, "year");
  const segmentTwoEnd = moment(segmentEnd).add(1, "year");

  if (
    !segmentOneStart.isValid() ||
    !segmentOneEnd.isValid() ||
    segmentOneEnd <= segmentOneStart
  ) {
    return (
      <div>
        <Filters filters={filters} />
        <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
        <pre>
          first segment starts:{" "}
          {segmentOneStart.isValid()
            ? segmentOneStart.format("L")
            : "Not Valid"}
        </pre>
        <pre>
          first segment ends:{" "}
          {segmentOneEnd.isValid() ? segmentOneEnd.format("L") : "Not Valid"}
          {segmentOneEnd <= segmentOneStart
            ? `Must be after segment start`
            : ``}
        </pre>
      </div>
    );
  }

  const dataSegmentOne = activeData.filter(({ x }) => {
    return x > segmentOneStart && x < segmentOneEnd;
  });
  const dataSegmentTwo = activeData.filter(({ x }) => {
    return x > segmentTwoStart && x < segmentTwoEnd;
  });

  const dataSegmentOneValues = !!dataSegmentOne.length
    ? dataSegmentOne.map((d) => d.y)
    : [0];
  const dataSegmentTwoValues = !!dataSegmentTwo.length
    ? dataSegmentTwo.map((d) => d.y)
    : [0];

  return (
    <div>
      <Filters filters={filters} />
      <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
      {!activeData.length ? (
        <div style={{ textAlign: `center` }}>Select filters</div>
      ) : (
        <>
          <section>
            <div
              style={{
                width: `100%`,
                maxWidth: `1040px`,
                display: `flex`,
                flexFlow: `row wrap`,
                margin: `auto`,
              }}
            >
              <h1>{`${category} ${dimension} in ${market.name}`}</h1>
              <BarTime dataset={activeData} width={800} height={300} />
              <aside
                style={{
                  display: `flex`,
                  flexFlow: `row wrap`,
                  justifyContent: `center`,
                  padding: `.5rem 1rem`,
                  margin: `auto`,
                }}
              >
                <ColorLabel dataset={activeData} colorRange={colorRange} />
              </aside>
            </div>
          </section>
          <section>
            <div
              style={{
                width: `100%`,
                maxWidth: `1040px`,
                display: `flex`,
                flexFlow: `row wrap`,
                margin: `auto`,
              }}
            >
              <div style={{ width: "48%" }}>
                <BarTime
                  width={400}
                  height={200}
                  dataset={dataSegmentOne}
                  fullRange={fullRange}
                  timeTickFormat={(t) => moment(t).format("M/D")}
                />
              </div>
              <div style={{ width: "48%" }}>
                <BarTime
                  width={400}
                  height={200}
                  dataset={dataSegmentTwo}
                  fullRange={fullRange}
                  timeTickFormat={(t) => moment(t).format("M/D")}
                />
              </div>
              <h2 style={{ textAlign: `center` }}>
                {`${category} ${dimension} in ${market.name}`} | Simple Stat
                Breakdown
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>{`${segmentOneStart.format(
                      "L"
                    )} - ${segmentOneEnd.format("L")}`}</th>
                    <th>{`${segmentTwoStart.format(
                      "L"
                    )} - ${segmentTwoEnd.format("L")}`}</th>
                    <th>Raw Change</th>
                    <th>% Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Num Weeks</td>
                    <td>{dataSegmentOneValues.length}</td>
                    <td>{dataSegmentTwoValues.length}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  {[
                    ["Max", max],
                    ["Mean", mean],
                    ["Median", median],
                    ["Mode", mode],
                    ["Min", min],
                  ].map((pair, i) => {
                    const [label, callback] = pair;
                    let segOneValue = callback.call(
                      undefined,
                      dataSegmentOneValues
                    );
                    let segTwoValue = callback.call(
                      undefined,
                      dataSegmentTwoValues
                    );
                    let delta = segTwoValue - segOneValue;

                    return (
                      <tr key={i}>
                        <td>{label}</td>
                        <td>{segOneValue.toFixed(2)}</td>
                        <td>{segTwoValue.toFixed(2)}</td>
                        <td>{delta.toFixed(2)}</td>
                        <td>{`${((delta / segOneValue) * 100).toFixed(
                          2
                        )}%`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Projections;
