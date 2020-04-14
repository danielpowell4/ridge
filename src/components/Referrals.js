import React, { Component } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  Bar,
} from "victory";
import moment from "moment";
import { quantile, quantileRank } from "simple-statistics";

import referralData from "../lib/referralData";

const groupByDate = (data) => {
  const keyValueData = data.reduce((acc, d) => {
    let date = d["week_starting"];

    if (date in acc) {
      acc[date]++;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  return Object.keys(keyValueData).map((k) => {
    let date = new Date(k);
    let count = keyValueData[k];
    return {
      x: date,
      y: count,
      label: `Week of ${moment(date).format("M-D-YY")}: ${count}`,
    };
  });
};

const weeklyData = groupByDate(referralData);
const fullRange = weeklyData.map((d) => d.y);

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
const getRankedFill = (d) => {
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

const RankedBar = (props) => {
  return <Bar {...props} style={{ fill: getRankedFill(props.datum.y) }} />;
};

const BarTime = ({ height, width, dataset, styleBar }) => (
  <VictoryChart
    height={height}
    width={width}
    scale={{ x: "time" }}
    theme={VictoryTheme.material}
    domainPadding={{ x: 10 }}
  >
    <VictoryBar
      data={dataset}
      labelComponent={
        <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />
      }
      dataComponent={<RankedBar dataset={dataset} />}
      style={styleBar}
      alignment="middle"
    />
    <VictoryAxis
      scale="time"
      standalone={false}
      tickFormat={(t) => moment(t).format("MMM YY")}
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

const Referrals = (_) => (
  <React.Fragment>
    <section>
      <h2 style={{ width: "1040px", margin: "auto" }}>
        Client Referrals By Week
      </h2>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          maxWidth: "1040px",
          width: "100%",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <BarTime width={800} height={400} dataset={weeklyData} />
        <aside
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            padding: ".5rem 1rem",
          }}
        >
          <ColorLabel dataset={weeklyData} colorRange={colorRange} />
        </aside>
      </div>
    </section>
    <section>
      <div
        style={{
          width: "100%",
          maxWidth: "1040px",
          display: "flex",
          flexFlow: "row wrap",
          margin: "auto",
        }}
      >
        <div style={{ width: "48%" }}>
          <BarTime
            width={400}
            height={200}
            dataset={weeklyData.filter(({ x }) => {
              return x > moment("2017-07-01") && x < moment("2017-10-30");
            })}
          />
        </div>
        <div style={{ width: "48%" }}>
          <BarTime
            width={400}
            height={200}
            dataset={weeklyData.filter(({ x }) => x > moment("2018-07-01"))}
          />
        </div>
      </div>
      <h2 style={{ maxWidth: "1040px", width: "100%", margin: "auto" }}>
        Client Referrals YOY (Jul - Oct)
      </h2>
    </section>
  </React.Fragment>
);

export default Referrals;
