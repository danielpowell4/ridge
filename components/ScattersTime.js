import * as React from "react";
import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTheme,
  VictoryLine,
} from "victory";
import { ma } from "moving-averages";

import styles from "./LinesTime.module.css";

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

const LinesTime = ({
  height = 400,
  width = 400,
  series,
  withLegend = false,
}) => {
  const trends = series.map((set) => {
    const values = set.data.map((d) => d.y);
    const movingAverages = ma(values, 3); // 3 week moving average

    return {
      label: set.label,
      data: (set.data || [])
        .map((d, dIndex) => ({
          x: d.x,
          y: movingAverages[dIndex],
        }))
        .filter((d) => !!d.y),
    };
  });

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
        {trends.map((line, lineIndex) => {
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
          labels={series.map(({ label }, setIndex) => ({
            label,
            fill: setColors[setIndex],
          }))}
        />
      )}
    </React.Fragment>
  );
};

export default LinesTime;
