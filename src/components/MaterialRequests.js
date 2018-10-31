import React, { Component } from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip
} from "victory";

/*

Market.all.map do |market|
  students = Student.joins(:client).merge(Client.where(market_id: market.id))
  market_requests = MaterialRequest.joins(:student).merge(students)

  MaterialType.active.map do |type|
    request_count = MaterialRequest.joins(:type).merge(MaterialType.where(id: type.id)).merge(market_requests).count
    {x: type.name, y: request_count, label: market.name}
  end
end

*/

const marketData = [
  [
    { x: "ACT", y: 16, label: "NYC" },
    { x: "SAT", y: 8, label: "NYC" },
    { x: "SSAT", y: 1, label: "NYC" },
    { x: "SSAT/ISEE", y: 0, label: "NYC" },
    { x: "ISEE LL", y: 8, label: "NYC" },
    { x: "ISEE ML", y: 3, label: "NYC" },
    { x: "ISEE UL", y: 7, label: "NYC" },
    { x: "SHSAT", y: 3, label: "NYC" }
  ],
  [
    { x: "ACT", y: 72, label: "WEST" },
    { x: "SAT", y: 26, label: "WEST" },
    { x: "SSAT", y: 2, label: "WEST" },
    { x: "SSAT/ISEE", y: 0, label: "WEST" },
    { x: "ISEE LL", y: 4, label: "WEST" },
    { x: "ISEE ML", y: 0, label: "WEST" },
    { x: "ISEE UL", y: 1, label: "WEST" },
    { x: "SHSAT", y: 0, label: "WEST" }
  ],
  [
    { x: "ACT", y: 129, label: "LI" },
    { x: "SAT", y: 33, label: "LI" },
    { x: "SSAT", y: 3, label: "LI" },
    { x: "SSAT/ISEE", y: 0, label: "LI" },
    { x: "ISEE LL", y: 0, label: "LI" },
    { x: "ISEE ML", y: 1, label: "LI" },
    { x: "ISEE UL", y: 1, label: "LI" },
    { x: "SHSAT", y: 0, label: "LI" }
  ],
  [
    { x: "ACT", y: 49, label: "DC" },
    { x: "SAT", y: 5, label: "DC" },
    { x: "SSAT", y: 3, label: "DC" },
    { x: "SSAT/ISEE", y: 1, label: "DC" },
    { x: "ISEE LL", y: 0, label: "DC" },
    { x: "ISEE ML", y: 0, label: "DC" },
    { x: "ISEE UL", y: 2, label: "DC" },
    { x: "SHSAT", y: 0, label: "DC" }
  ],
  [
    { x: "ACT", y: 18, label: "Bergen" },
    { x: "SAT", y: 3, label: "Bergen" },
    { x: "SSAT", y: 1, label: "Bergen" },
    { x: "SSAT/ISEE", y: 0, label: "Bergen" },
    { x: "ISEE LL", y: 3, label: "Bergen" },
    { x: "ISEE ML", y: 2, label: "Bergen" },
    { x: "ISEE UL", y: 2, label: "Bergen" },
    { x: "SHSAT", y: 0, label: "Bergen" }
  ],
  [
    { x: "ACT", y: 9, label: "LA" },
    { x: "SAT", y: 6, label: "LA" },
    { x: "SSAT", y: 1, label: "LA" },
    { x: "SSAT/ISEE", y: 0, label: "LA" },
    { x: "ISEE LL", y: 1, label: "LA" },
    { x: "ISEE ML", y: 1, label: "LA" },
    { x: "ISEE UL", y: 4, label: "LA" },
    { x: "SHSAT", y: 0, label: "LA" }
  ],
  [
    { x: "ACT", y: 9, label: "LISS" },
    { x: "SAT", y: 2, label: "LISS" },
    { x: "SSAT", y: 0, label: "LISS" },
    { x: "SSAT/ISEE", y: 0, label: "LISS" },
    { x: "ISEE LL", y: 0, label: "LISS" },
    { x: "ISEE ML", y: 0, label: "LISS" },
    { x: "ISEE UL", y: 0, label: "LISS" },
    { x: "SHSAT", y: 0, label: "LISS" }
  ],
  [
    { x: "ACT", y: 0, label: "INT" },
    { x: "SAT", y: 0, label: "INT" },
    { x: "SSAT", y: 0, label: "INT" },
    { x: "SSAT/ISEE", y: 0, label: "INT" },
    { x: "ISEE LL", y: 0, label: "INT" },
    { x: "ISEE ML", y: 0, label: "INT" },
    { x: "ISEE UL", y: 0, label: "INT" },
    { x: "SHSAT", y: 0, label: "INT" }
  ],
  [
    { x: "ACT", y: 12, label: "Essex" },
    { x: "SAT", y: 9, label: "Essex" },
    { x: "SSAT", y: 10, label: "Essex" },
    { x: "SSAT/ISEE", y: 6, label: "Essex" },
    { x: "ISEE LL", y: 0, label: "Essex" },
    { x: "ISEE ML", y: 0, label: "Essex" },
    { x: "ISEE UL", y: 0, label: "Essex" },
    { x: "SHSAT", y: 0, label: "Essex" }
  ],
  [
    { x: "ACT", y: 7, label: "SFl" },
    { x: "SAT", y: 2, label: "SFl" },
    { x: "SSAT", y: 0, label: "SFl" },
    { x: "SSAT/ISEE", y: 0, label: "SFl" },
    { x: "ISEE LL", y: 0, label: "SFl" },
    { x: "ISEE ML", y: 0, label: "SFl" },
    { x: "ISEE UL", y: 0, label: "SFl" },
    { x: "SHSAT", y: 0, label: "SFl" }
  ],
  [
    { x: "ACT", y: 2, label: "CT" },
    { x: "SAT", y: 0, label: "CT" },
    { x: "SSAT", y: 0, label: "CT" },
    { x: "SSAT/ISEE", y: 0, label: "CT" },
    { x: "ISEE LL", y: 0, label: "CT" },
    { x: "ISEE ML", y: 0, label: "CT" },
    { x: "ISEE UL", y: 0, label: "CT" },
    { x: "SHSAT", y: 0, label: "CT" }
  ],
  [
    { x: "ACT", y: 3, label: "Tampa" },
    { x: "SAT", y: 0, label: "Tampa" },
    { x: "SSAT", y: 0, label: "Tampa" },
    { x: "SSAT/ISEE", y: 0, label: "Tampa" },
    { x: "ISEE LL", y: 0, label: "Tampa" },
    { x: "ISEE ML", y: 0, label: "Tampa" },
    { x: "ISEE UL", y: 0, label: "Tampa" },
    { x: "SHSAT", y: 0, label: "Tampa" }
  ]
];

class AbsoluteStackedBar extends Component {
  transformData = dataset =>
    dataset.map(marketSet =>
      marketSet.map(d => ({ ...d, label: `${d.label}: ${d.y}` }))
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
                    dy={d => -(d.y / 2) - 6.5}
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
            tickFormat={dataset[0].map(d => d.x)}
          />
        </VictoryChart>
      </div>
    );
  }
}

class RelativeStackedBar extends Component {
  transformData = dataset => {
    const totals = dataset[0].map((data, i) =>
      dataset.reduce((total, curr) => total + curr[i].y, 0)
    );
    return dataset.map(data =>
      data.map((datum, i) => {
        if (totals[i] == 0) {
          return {
            x: datum.x,
            y: 0,
            label: `${datum.label} None`
          };
        }
        return {
          x: datum.x,
          y: (datum.y / totals[i]) * 100,
          label: `${datum.label} ${((datum.y / totals[i]) * 100).toFixed(
            2
          )}% (${datum.y}/${totals[i]})`
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
                      dy={d => -d.y - 7}
                      dx={2}
                      cornerRadius={0}
                      flyoutStyle={{ fill: "white" }}
                    />
                  }
                />
              );
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
          <VictoryAxis
            style={{ tickLabels: { angle: -45 } }}
            tickFormat={dataset[0].map(d => d.x)}
          />
        </VictoryChart>
      </div>
    );
  }
}

const transposeStackedData = dataset =>
  dataset[0].map((_, i) =>
    dataset.map(d => {
      let { x, label, ...rest } = d[i];
      return { x: label, label: x, ...rest };
    })
  );

const MaterialRequests = _ => (
  <React.Fragment>
    <section>
      <h2 style={{ width: "1040px", margin: "auto" }}>By Material Type</h2>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          maxWidth: "1040px",
          width: "100%",
          justifyContent: "center",
          margin: "auto"
        }}
      >
        <AbsoluteStackedBar dataset={marketData} />
        <RelativeStackedBar dataset={marketData} />
      </div>
    </section>
    <section>
      <h2 style={{ width: "1040px", margin: "auto" }}>By Market</h2>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          maxWidth: "1040px",
          width: "100%",
          justifyContent: "center",
          margin: "auto"
        }}
      >
        <AbsoluteStackedBar dataset={transposeStackedData(marketData)} />
        <RelativeStackedBar dataset={transposeStackedData(marketData)} />
      </div>
    </section>
  </React.Fragment>
);

export default MaterialRequests;
