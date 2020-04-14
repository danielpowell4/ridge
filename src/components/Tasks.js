import React from 'react';
import {
  VictoryBar,
  VictoryTooltip,
  VictoryChart,
  VictoryScatter,
} from 'victory';
import dummyData from '../lib/taskData';

const dayPair = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

const groupByWDay = (data) => {
  const keyValueData = data.reduce((acc, d) => {
    let date = new Date(d.created_at).getDay();
    date in acc ? acc[date]++ : (acc[date] = 1);
    return acc;
  }, {});

  return Object.keys(keyValueData).map((k) => ({
    x: dayPair[k],
    y: keyValueData[k],
  }));
};

const groupByDate = (data) => {
  const keyValueData = data.reduce((acc, d) => {
    let date = new Date(d.created_at).toLocaleDateString();
    date in acc ? acc[date]++ : (acc[date] = 1);
    return acc;
  }, {});

  return Object.keys(keyValueData).map((k) => ({
    x: new Date(k),
    y: keyValueData[k],
  }));
};

const increment = (data) => {
  const datedData = data.map((d) => ({
    ...d,
    createdAt: new Date(d.created_at),
  }));

  return datedData
    .map((d) => ({
      ...d,
      countToDate: datedData.filter((other) => other.createdAt <= d.createdAt)
        .length,
    }))
    .map((d) => ({
      x: d.createdAt,
      y: d.countToDate,
    }));
};

const normalize = (data) => {
  const sum = data.reduce((total, d) => total + d.y, 0);
  return data.map((d) => ({ ...d, y: (d.y * 100) / sum }));
};

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        data: { fill: 'tomato' },
      },
    };
  }

  render() {
    const dayData = groupByWDay(dummyData);
    const dailyData = groupByDate(dummyData);
    const incrementedData = increment(dummyData);

    const firstDate = Math.min(...incrementedData.map((d) => d.x));
    const lastDate = Math.max(...incrementedData.map((d) => d.x));
    const lowestValue = Math.min(...incrementedData.map((d) => d.y));
    const highestValue = Math.max(...incrementedData.map((d) => d.y));

    const scatterDomain = {
      x: [firstDate, lastDate],
      y: [lowestValue, highestValue],
    };

    const scatterDomainPadding = {
      x: lastDate * 0.05,
      y: highestValue,
    };

    return (
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          maxWidth: 660,
        }}
      >
        <VictoryBar
          polar
          data={dayData}
          labels={(d) => d.x}
          width={400}
          height={400}
          domain={{ y: [0, Math.max(...dayData.map((d) => d.y)) * 1.05] }}
          style={{
            data: { fill: 'tomato', stroke: '#ccc', strokeWidth: 3 },
            parent: { flexGrow: 1, flexShrink: 0, flexBasis: 240 },
          }}
        />
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 15, y: [0, 20] }}
          style={{ parent: { flexGrow: 1, flexShrink: 0, flexBasis: 240 } }}
        >
          <VictoryBar
            alignment="middle"
            style={this.state.style}
            data={dayData}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />
            }
            labels={(d) => d.y}
          />
        </VictoryChart>
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 15, y: [0, 20] }}
          style={{ parent: { flexGrow: 1, flexShrink: 0, flexBasis: 240 } }}
        >
          <VictoryBar
            alignment="middle"
            style={this.state.style}
            data={normalize(dayData)}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />
            }
            labels={(d) => `${d.y.toFixed(2)}%`}
          />
        </VictoryChart>
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 5, y: [0, 20] }}
          scale={{ x: 'time' }}
          style={{ parent: { flexGrow: 1, flexShrink: 0, flexBasis: 240 } }}
        >
          <VictoryBar
            alignment="middle"
            style={this.state.style}
            data={dailyData}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />
            }
            labels={(d) => d.y}
          />
        </VictoryChart>
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 5, y: [0, 20] }}
          scale={{ x: 'time' }}
          style={{ parent: { flexGrow: 1, flexShrink: 0, flexBasis: 240 } }}
        >
          <VictoryBar
            alignment="middle"
            style={this.state.style}
            data={normalize(dailyData)}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />
            }
            labels={(d) => `${d.y.toFixed(2)}%`}
          />
        </VictoryChart>
        <VictoryChart
          domain={scatterDomain}
          scale={{ x: 'time' }}
          style={{ parent: { flexGrow: 1, flexShrink: 0, flexBasis: 240 } }}
        >
          <VictoryScatter
            style={{ data: { fill: 'tomato' } }}
            domain={scatterDomain}
            domainPadding={{ y: scatterDomain.y[1] / 10 }}
            data={incrementedData}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />
            }
          />
        </VictoryChart>
      </div>
    );
  }
}

export default Tasks;
