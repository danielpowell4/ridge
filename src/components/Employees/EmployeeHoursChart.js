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
import fetch from "cross-fetch";

class EmployeeHoursChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartActive: false,
      startDate: new Date(2017, 6, 1),
      endDate: new Date(2018, 8, 1),
      data: [],
      hourQuota: null,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    const employeeId = 316; // Mike Cerro placeholder

    fetch(`http://localhost:5000/data/employees/${employeeId}/sytd_lessons`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(raw => raw.json())
      .then(res => {
        this.setState({
          data: res.data.map(d => ({ ...d, x: moment(d.x).toDate() })),
          hourQuota: res.hourQuota,
          isFetching: false,
        });
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

    return (
      <div className="employee-hours-chart" style={styles.container}>
        <VictoryChart
          domain={{ x: xDomain, y: yDomain }}
          containerComponent={
            <VictoryZoomContainer zoomDomain={{ x: xDomain, y: yDomain }} />
          }
          style={{ overflow: "visible" }}
        >
          <VictoryAxis
            dependentAxis
            domain={yDomain}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={styles.yAxis}
            tickCount={7}
          />
          <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisYears}
          />
          {quotaLine}
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
                        mutation: () => ({
                          style: styles.activeDot,
                          size: 6,
                        }),
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: true }),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => {},
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: false }),
                      },
                    ];
                  },
                },
              },
            ]}
          />
          <VictoryLabel
            x={18}
            y={32}
            style={styles.yAxisLabel}
            text={"Hours coached \n this school year"}
          />
        </VictoryChart>
      </div>
    );
  }

  toggleActive() {
    this.setState({ chartActive: !this.state.chartActive });
  }

  getXDomain() {
    const { startDate, endDate } = this.state;
    return [startDate, endDate];
  }

  getYDomain() {
    const data = this.state.data.map(d => d.y);
    if (data.length !== 0) {
      const maxData = data.reduce((a, b) => (a > b ? a : b));
      const quota = this.state.hourQuota;

      const timeLeftInYear =
        1 -
        (this.state.endDate.getTime() -
          this.state.data.slice(-1)[0].x.getTime()) /
          (this.state.endDate.getTime() - this.state.startDate.getTime());

      const highestValue = maxData > quota ? maxData / timeLeftInYear : quota;

      return [0, highestValue * 1.2];
    } else {
      Promise.resolve();
    }
  }

  getStyles() {
    const MED_GREY = "#999";
    // const LIGHT_GREY = "#f0f0f0";
    const WHITE = "#fff";
    const GREEN = "#009f29";
    const LIGHT_GREEN = "#009f2994";
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
          size: tick => {
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
          stroke: tick => (tick < 1 ? "transparent" : WHITE),
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

export default EmployeeHoursChart;
