import React, { Component } from 'react';
import * as d3 from "d3";

class RidgeBar extends Component {

  render() {
    const margin=this.props.margin;
    const fill=this.props.fill;
    const innerPadding=this.props.innerPadding;

    const h=this.props.height - ( margin.top + margin.bottom );
    const w=this.props.width - ( margin.right + margin.left );

    let x_attr=this.props.x_attr;
    let y_attr=this.props.y_attr;

    const transform='translate(' + margin.left + ',' + margin.top + ')';

    // scale setup

    let x=d3.scaleBand()
                .rangeRound([0, w])
                .paddingInner(innerPadding);

    let y=d3.scaleLinear()
                .range([h, 0]);

    // map data to scale domain

    x.domain(this.props.data.map(function(d){
      return d[x_attr];
    }))

    y.domain([0, d3.max(this.props.data, function(d){
        return d[y_attr];
      })]
    );

    let bars=(this.props.data).map(function(d, i) {

        return (
            <rect fill={fill}
                  rx="3"
                  ry="3"
                  key={i}
                  x={ x(d[x_attr]) }
                  y={ y(d[y_attr]) }
                  className="shadow"
                  height={ h-y(d[y_attr]) }
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

RidgeBar.defaultProps = {
    width: 300,
    height: 200,
    chartId: 'bar_chart',
    fill: '#1abc9c',
    innerPadding: 0.1,
    margin: { top: 14,
              right: 14,
              bottom: 14,
              left: 14 }
}

export default RidgeBar;
