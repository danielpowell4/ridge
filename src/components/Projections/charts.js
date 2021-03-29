import * as React from "react";
import moment from "moment";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryTheme,
  Bar,
} from "victory";

// for coloring
import {
  quantile,
  quantileRank,
} from "simple-statistics";

// setup coloring

// http://colorbrewer2.org/#type=sequential&scheme=Greens&n=6
export const colorRange = [
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

export const ColorLabel = ({ dataset }) => {
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
      <p style={{ margin: 0 }}>{start.toFixed(2)}+</p>
    </div>
  ));
};

const RankedBar = ({ fullRange, ...props }) => {
  return (
    <Bar {...props} style={{ fill: getRankedFill(fullRange, props.datum.y) }} />
  );
};

export const BarTime = ({
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
            orientation="top"
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
