import React, { Component } from "react";
import {
  VictoryLine,
  VictoryScatter,
  VictoryChart,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
import moment from "moment";
import { turnaround as dummyData } from "../lib/sampleData";

class Timegraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartActive: false,
      startDate: moment().subtract(31, "day"),
      endDate: moment().add(1, "day"),
      data: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    // get data
    this.setState({
      data: dummyData.map((d) => ({
        label: d.label,
        x: new Date(d.scheduled_time),
        y: d.turnaround,
      })),
    });
  }

  render() {
    const { data, hourQuota, isFetching } = this.state;
    const styles = this.getStyles();

    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (data.length === 0) {
      return <div>Empty message</div>;
    }

    const yDomain = this.getYDomain();
    const xDomain = this.getXDomain();

    const quotaLine =
      !!hourQuota && hourQuota !== 0 ? (
        <VictoryLine
          data={[
            { x: xDomain[0], y: hourQuota },
            { x: xDomain[1], y: hourQuota },
          ]}
          scale={{ x: "time", y: "linear" }}
          standalone={false}
          style={styles.quotaLine}
          labelComponent={
            <VictoryLabel style={styles.quotaLabel} text={"Hour Quota"} />
          }
        />
      ) : (
        <g />
      );

    const average = this.getAverage();
    const averageLine = !!average ? (
      <VictoryLine
        data={[
          { x: xDomain[0], y: average },
          { x: xDomain[1], y: average },
        ]}
        scale={{ x: "time", y: "linear" }}
        standalone={false}
        style={styles.quotaLine}
        labelComponent={
          <VictoryLabel
            style={styles.quotaLabel}
            text={`Average: ${average.toFixed(2)} hrs`}
          />
        }
      />
    ) : (
      <g />
    );

    return (
      <VictoryChart
        domain={{ x: xDomain, y: yDomain }}
        containerComponent={
          <VictoryZoomContainer zoomDomain={{ x: xDomain, y: yDomain }} />
        }
        style={{ overflow: "visible" }}
        width={600}
        height={300}
      >
        <VictoryAxis
          dependentAxis
          domain={yDomain}
          offsetX={50}
          orientation="left"
          standalone={false}
          style={styles.yAxis}
          tickCount={6}
        />
        <VictoryAxis scale="time" standalone={false} style={styles.axisYears} />
        {quotaLine}
        {averageLine}
        <VictoryScatter
          data={data}
          scale={{ x: "time", y: "linear" }}
          size={2}
          style={styles.scatter}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={styles.tooltip}
              cornerRadius={0}
              style={styles.tooltipText}
            />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({ style: styles.activeDot, size: 6 }),
                    },
                    { target: "labels", mutation: () => ({ active: true }) },
                  ];
                },
                onMouseOut: () => {
                  return [
                    { target: "data", mutation: () => {} },
                    { target: "labels", mutation: () => ({ active: false }) },
                  ];
                },
              },
            },
          ]}
        />
        {/* <VictoryLabel
          x={18}
          y={32}
          style={styles.yAxisLabel}
          text={"Summary Turnaround"}
        /> */}
      </VictoryChart>
    );
  }

  toggleActive() {
    this.setState({ chartActive: !this.state.chartActive });
  }

  getAverage() {
    const { data } = this.state;
    if (data.length) {
      let sum = data.reduce((acc, curr) => acc + curr.y, 0);
      return sum / data.length;
    } else {
      return null;
    }
  }

  getXDomain() {
    const { startDate, endDate } = this.state;
    return [startDate, endDate];
  }

  getYDomain() {
    if (this.state.data.length !== 0) {
      const maxData = this.state.data.reduce(
        (max, p) => (p.y > max ? p.y : max),
        this.state.data[0].y
      );
      // const quota = this.state.hourQuota;
      //
      // const timeLeftInYear =
      //   1 -
      //   (this.state.endDate.getTime() -
      //     this.state.data.slice(-1)[0].x.getTime()) /
      //     (this.state.endDate.getTime() - this.state.startDate.getTime());

      // const highestValue = maxData > quota ? maxData / timeLeftInYear : quota;

      return [0, maxData * 1.1];
    } else {
      Promise.resolve();
    }
  }

  getStyles() {
    const MED_GREY = "#999";
    // const LIGHT_GREY = "#f0f0f0";
    const WHITE = "#fff";
    const GREEN = "rgb(51, 200, 194)"; //"#009f29";
    const LIGHT_GREEN = "rgb(51, 200, 194)"; //"#009f2994";
    const ORANGE = "#ff7400";

    return {
      container: {
        maxWidth: "660px",
        width: "100%",
        padding: "10px",
        margin: "1rem auto",
      },
      hourLine: {
        data: { stroke: GREEN },
        parent: { border: "1px solid #ccc" },
      },
      scatter: {
        data: { fill: GREEN, opacity: 0.3 },
      },
      activeDot: {
        fill: ORANGE,
      },
      quotaLine: {
        data: {
          stroke: LIGHT_GREEN,
          strokeWidth: 1.5,
          strokeOpacity: 0.75,
          strokeDasharray: [5, 3],
        },
      },
      tooltip: {
        fill: WHITE,
        stroke: MED_GREY,
      },
      tooltipText: {
        fill: MED_GREY,
        fontFamily: "inherit",
        fontSize: 12,
      },
      yAxisLabel: {
        fill: MED_GREY,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic",
      },
      quotaLabel: {
        fill: LIGHT_GREEN,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic",
        textAnchor: "end",
      },
      axisYears: {
        axis: { stroke: MED_GREY, strokeWidth: 1 },
        ticks: {
          size: (tick) => {
            const tickSize = tick.getMonth() % 3 === 1 ? 10 : 5;
            return tickSize;
          },
          stroke: MED_GREY,
          strokeWidth: 1,
        },
        tickLabels: {
          fill: MED_GREY,
          fontFamily: "inherit",
          fontSize: 12,
        },
      },
      yAxis: {
        grid: {
          stroke: (tick) => (tick < 1 ? "transparent" : WHITE),
          strokeWidth: 2,
        },
        axis: { stroke: MED_GREY, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: MED_GREY,
          fontFamily: "inherit",
          fontSize: 12,
        },
      },
    };
  }
}

export default Timegraph;
