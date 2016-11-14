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

    const group_by=this.props.group_by;
    const dimensions=this.props.dimensions;

    const addTotalToData = (data, dimensions) => {
      for(let d of data){
        d.total = 0;
        for(let dimension of dimensions){
          d.total += d[dimension];
        }
      }
      return data;
    }

    addTotalToData(data, dimensions);
    console.log(data);

    const dataIntermediate = dimensions.map(function(key,i){
      return data.map(function(d,j){
        return {x: d[group_by], y: d[key] };
      })
    });

    var dataStackLayout = d3.stack()(dataIntermediate);

    // map data to scale domain

    x.domain(dataStackLayout[0].map(function (d) {
      return d.x;
    }));

    y.domain([0, d3.max(dataStackLayout[dataStackLayout.length - 1],
                        function (d) { return d.y0 + d.y;})
             ])
      .nice();


    let bars=(this.props.data).map(function(d, i) {

        return (
            <rect fill={color(i)}
                  key={i}
                  x={ x(d.x) }
                  y={ y(d.y + d.y0) }
                  height={ y(d.y0) - y(d.y + d.y0) }
                  width={ x.bandwidth() }
            />
        )
    });


    return(
      <div>
          <svg id={this.props.chartId}
               width={this.props.width}
               height={this.props.height} >

              <g transform={transform}>
                  {bars}
              </g>
          </svg>
      </div>
    );
  }
}

RidgeStacked.defaultProps = {
    width: 300,
    height: 200,
    chartId: 'stacked_chart',
    colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
    innerPadding: 0.1,
    margin: { top: 14,
              right: 14,
              bottom: 14,
              left: 14 }
}

export default RidgeStacked;
