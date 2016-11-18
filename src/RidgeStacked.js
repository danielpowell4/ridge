import React, { Component } from 'react';
import * as d3 from "d3";

class RidgeStacked extends Component {

  render() {
    // chart setup
    const margin=this.props.margin;
    const innerPadding=this.props.innerPadding;

    const h=this.props.height - ( margin.top + margin.bottom );
    const w=this.props.width - ( margin.right + margin.left );

    const transform='translate(' + margin.left + ',' + margin.top + ')';

    // scale setup

    const x = d3.scaleBand()
                .rangeRound([0, w])
                .paddingInner(innerPadding)
                .align(0.3);

    const y = d3.scaleLinear()
                .rangeRound([h, 0]);

    const color = d3.scaleOrdinal()
                    .range(this.props.colors);

    // data set up
    let data = this.props.data;

    const group_by = this.props.group_by;

    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== group_by;
    }));

    data.forEach(function(d) {
      var y0 = 0;
      d.dimension = color.domain().map(function(name) {
        return {
          name: name,
          y0: y0,
          y1: y0 += +d[name]
        };
      });
      d.total = d.dimension[d.dimension.length - 1].y1;
    });

    data.sort(function(a, b) {
      return b[group_by] - a[group_by];
    });

    // map data to scale domain

    x.domain(data.map(function(d) {
      return d[group_by];
    }));

    y.domain([0, d3.max(data, function(d) {
      return d.total;
    })]);

    // iterate through data making bars

    let bars=(data).map(function(d, i) {
      return d.dimension.map(function(e,j) {
        return (
            <rect fill={color(e.name)}
                  key={i+'-'+j}
                  y={ y(e.y1) }
                  x={x(d[group_by])}
                  height={ y(e.y0) - y(e.y1) }
                  width={ x.bandwidth() }
            />
        )
      })
    });

    return(
      <div>
          <svg id={this.props.chartId}
               width={this.props.width}
               height={this.props.height}
               transform={transform}>

                  {bars}

          </svg>
      </div>
    );
  }
}

RidgeStacked.defaultProps = {
    width: 300,
    height: 200,
    chartId: 'stacked_chart',
    colors: ["#3498db", "#16a085", "#2ecc71", "#8e44ad", "#9b59b6", "#e67e22", "#e74c3c"],
    innerPadding: 0.1,
    margin: { top: 14,
              right: 14,
              bottom: 14,
              left: 14 }
}

export default RidgeStacked;
