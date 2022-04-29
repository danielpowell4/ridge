import React, { Component } from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

// data set is array of arrays
// array item should have collection of { label, x, y }

class AbsoluteStackedBar extends Component {
  transformData = (dataset) =>
    dataset.map((set) =>
      set.map((d) => ({ ...d, label: `${d.label}: ${d.y}` }))
    );

  render() {
    const dataset = this.transformData(this.props.dataset);
    return (
      <div style={{ maxWidth: 520, width: "100%", margin: "auto" }}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 50, y: 10 }}
          width={400}
          height={400}
        >
          <VictoryStack>
            {dataset.map((data, i) => (
              <VictoryBar
                data={data}
                key={i}
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
            ))}
          </VictoryStack>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            style={{ tickLabels: { angle: -45 } }}
            tickFormat={dataset[0].map((d) => d.x)}
          />
        </VictoryChart>
      </div>
    );
  }
}

class RelativeStackedBar extends Component {
  transformData = (dataset) => {
    const totals = dataset[0].map((data, i) =>
      dataset.reduce((total, curr) => total + curr[i].y, 0)
    );
    return dataset.map((data) =>
      data.map((datum, i) => {
        if (totals[i] === 0) {
          return {
            x: datum.x,
            y: 0,
            label: `${datum.label} None`,
          };
        }
        return {
          x: datum.x,
          y: (datum.y / totals[i]) * 100,
          label: `${datum.label} ${((datum.y / totals[i]) * 100).toFixed(
            2
          )}% (${datum.y}/${totals[i]})`,
        };
      })
    );
  };

  render() {
    const dataset = this.transformData(this.props.dataset);
    return (
      <div style={{ maxWidth: 520, width: "100%", margin: "auto" }}>
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 30, y: 20 }}
          theme={VictoryTheme.material}
        >
          <VictoryStack>
            {dataset.map((data, i) => {
              return (
                <VictoryBar
                  data={data}
                  key={i}
                  labelComponent={
                    <VictoryTooltip
                      orientation="right"
                      dy={(d) => -d.y - 7}
                      dx={2}
                      cornerRadius={0}
                      flyoutStyle={{ fill: "white" }}
                    />
                  }
                />
              );
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
          <VictoryAxis
            style={{ tickLabels: { angle: -45 } }}
            tickFormat={dataset[0].map((d) => d.x)}
          />
        </VictoryChart>
      </div>
    );
  }
}

const StackedBars = ({ dataset }) => (
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
    <AbsoluteStackedBar dataset={dataset} />
    <RelativeStackedBar dataset={dataset} />
  </div>
);

export default StackedBars;
