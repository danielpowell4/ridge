import React, { Component } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryTheme,
} from "victory";
import { turnaround as dummyData } from "../lib/sampleData";

const buildHistogram = (data, attr, steps) => {
  const points = data
    .map((p) => Number(p[attr]))
    .filter((p) => !Number.isNaN(p));

  const min = Math.min(...points);
  const max = Math.max(...points);

  const stepSize = (max - min) / steps;

  let compiled = [];
  for (let minBound = min; minBound < max; minBound = minBound + stepSize) {
    let topBound = minBound + stepSize;
    let count = points.filter((p) => p >= minBound && p < topBound).length;
    compiled.push({
      x: (minBound + topBound) / 2,
      y: count,
      label: `${minBound.toFixed(2)}-${topBound.toFixed(2)}: ${count}`,
    });
  }

  return { data: compiled, stepSize, min, max };
};

const add = (total, a) => {
  return total + a;
};

const applyBins = (data, attr, bins) => {
  const points = data
    .map((p) => Number(p[attr]))
    .filter((p) => !Number.isNaN(p));

  const min = bins[0].min;
  const max = bins[bins.length - 1].max;

  const stepSizes = bins.map(({ min, max }) => max - min);
  const stepSize = (stepSizes.reduce(add, 0) / stepSizes.length).toFixed(2);

  const compiled = bins.map(({ min, max }) => {
    let count = points.filter((p) => p >= min && p <= max).length;
    return {
      x: (min + max) / 2,
      y: count,
      label: `${min}-${max}: ${count}`,
    };
  });

  return { data: compiled, stepSize, min, max };
};

const Histogram = ({ dataset, attr, steps, bins }) => {
  const binType = steps ? "steps" : "bins";
  const { data, stepSize, min, max } =
    binType === "steps"
      ? buildHistogram(dataset, attr, steps)
      : applyBins(dataset, attr, bins);

  const xDomain = [min - 2, max + 2];

  return (
    <div style={{ maxWidth: 400, width: "100%" }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{ x: xDomain }}
        domainPadding={{ x: stepSize * 2 }}
        height={400}
        width={400}
      >
        <VictoryAxis dependentAxis offset="left" offsetX={50} />
        <VictoryAxis tickCount={steps || bins.length + 2} />
        <VictoryBar
          barRatio={0.67}
          alignment="middle"
          style={{ data: { fill: "tomato" } }}
          data={data}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
};

// Histogram.defaultProps = {
//   data: dummyData,
//   attr: "turnaround",
// };

export default Histogram;
