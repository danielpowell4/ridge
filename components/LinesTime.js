import * as React from "react";
import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryLine,
} from "victory";

import styles from "./LinesTime.module.css";

const lineColors = [
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
  lines,
  withLegend = false,
}) => {
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
        {lines.map((line, lineIndex) => {
          const color = lineColors[lineIndex];

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
          labels={lines.map(({ label }, lineIndex) => ({
            label,
            fill: lineColors[lineIndex],
          }))}
        />
      )}
    </React.Fragment>
  );
};

export default LinesTime;
