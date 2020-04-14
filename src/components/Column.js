import React, { Component } from 'react';
import { VictoryChart, VictoryStack, VictoryBar, VictoryAxis } from 'victory';

const dummyData = [
  [
    { x: 'a', y: 1 },
    { x: 'b', y: 2 },
    { x: 'c', y: 3 },
    { x: 'd', y: 2 },
    { x: 'e', y: 1 },
  ],
  [
    { x: 'a', y: 2 },
    { x: 'b', y: 3 },
    { x: 'c', y: 4 },
    { x: 'd', y: 5 },
    { x: 'e', y: 5 },
  ],
  [
    { x: 'a', y: 1 },
    { x: 'b', y: 2 },
    { x: 'c', y: 3 },
    { x: 'd', y: 4 },
    { x: 'e', y: 4 },
  ],
];

class Column extends Component {
  transformData = (dataset) => {
    const totals = dataset[0].map((data, i) =>
      dataset.reduce((memo, curr) => memo + curr[i].y, 0)
    );
    return dataset.map((data) =>
      data.map((datum, i) => ({ x: datum.x, y: (datum.y / totals[i]) * 100 }))
    );
  };

  render() {
    const dataset = this.transformData(dummyData);
    console.log('dataset', dataset);
    return (
      <div style={{ maxWidth: 520, width: '100%', margin: 'auto' }}>
        <VictoryChart height={400} width={400} domainPadding={{ x: 30, y: 20 }}>
          <VictoryStack colorScale={['black', 'blue', 'tomato']}>
            {dataset.map((data, i) => {
              return <VictoryBar data={data} key={i} />;
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
          <VictoryAxis tickFormat={['a', 'b', 'c', 'd', 'e']} />
        </VictoryChart>
      </div>
    );
  }
}

export default Column;
