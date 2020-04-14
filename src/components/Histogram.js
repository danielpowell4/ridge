import React, { Component } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryTheme,
} from "victory";
import { turnaround as dummyData } from "../lib/sampleData";

const buildHistogram = (data, key, steps) => {
  const min = data.reduce(
    (min, p) => (p[key] < min ? p[key] : min),
    data[0][key]
  );
  const max = data.reduce(
    (max, p) => (p[key] > max ? p[key] : max),
    data[0][key]
  );

  const stepSize = (max - min) / steps;

  let compiled = [];
  for (let i = min; i < max; i = i + stepSize) {
    let nextStep = i + stepSize;
    let count = data.filter((d) => d[key] > i && d[key] < nextStep).length;
    compiled.push({
      x: (i + nextStep) / 2,
      y: count,
      label: `${i.toFixed(2)}-${nextStep.toFixed(2)}: ${count}`,
    });
  }

  return { data: compiled, stepSize, min, max };
};

class Histogram extends Component {
  state = {
    stepSize: 0,
    data: [],
  };

  componentDidMount() {
    const { data, stepSize, min, max } = buildHistogram(
      this.props.data,
      this.props.key,
      this.props.steps
    );

    this.setState({ data, stepSize, min, max });
  }

  render() {
    if (this.state.data.length === 0) {
      return <div>Loading...</div>;
    }
    const xDomain = [
      this.state.min - this.state.stepSize,
      this.state.max + this.state.stepSize,
    ];

    return (
      <div style={{ maxWidth: 400, width: "100%" }}>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{ x: xDomain }}
          domainPadding={{ x: this.state.stepSize * 2 }}
          height={400}
          width={400}
        >
          <VictoryAxis dependentAxis offset="left" offsetX={50} />
          <VictoryAxis tickCount={this.props.steps} />
          <VictoryBar
            barRatio={0.9}
            alignment="middle"
            style={{ data: { fill: "tomato" } }}
            data={this.state.data}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      </div>
    );
  }
}

Histogram.defaultProps = {
  steps: 10,
  data: dummyData,
  key: "turnaround",
};

export default Histogram;
