import React, { Component } from 'react';
import * as d3 from "d3";

class RidgePie extends Component {

  render() {
    const margin=this.props.margin;

    const fill = d3.scaleOrdinal().range(this.props.colors);

    const h=this.props.height - ( margin.top + margin.bottom );
    const w=this.props.width - ( margin.right + margin.left );

    const radius = Math.max(h, w) / 4;
    const innerRadius=radius/this.props.innerRadiusRatio;

    const dimension = this.props.dimension;

    const arc=d3.arc()
                .outerRadius(radius)
                .innerRadius(innerRadius);

    let pie=d3.pie()
              .value(function(d){return d[dimension]})
              .padAngle(this.props.padAngle)
              .sort(null);

    const transform='translate('+h/2+','+w/2+')';

    var paths = pie(this.props.data).map(function(d, i) {
                   console.log(d, arc(d))
                   return (
                      <g className="arc" transform={transform}>
                         <path fill={fill(i)}
                               d={arc(d)}
                               key={i}>
                         </path>
                      </g>
                   )
                });
    return(
      <div>
          <svg id={this.props.chartId}
               width={this.props.width}
               height={this.props.height} >

               {paths}

          </svg>
      </div>
    );
  }
}

RidgePie.defaultProps = {
    width: 300,
    height: 300,
    chartId: 'pie_chart',
    colors: ["#8e44ad", "#9b59b6", "#3498db", "#16a085", "#2ecc71", "#e67e22", "#e74c3c"],
    innerRadiusRatio: .68,
    padAngle: .02,
    margin: { top: 14,
              right: 14,
              bottom: 14,
              left: 14 }
}

export default RidgePie;
