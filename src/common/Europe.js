import React from "react";
import * as d3 from "d3";

// const width = 450;
let width;
const windowWidth = window.innerWidth - 32;
if (windowWidth > 700) {
  width = windowWidth / 3;
} else {
  width = windowWidth;
}
const height = 400;
const margin = {
  top: 20,
  right: 15,
  bottom: 55,
  left: 70
  // left: 0
};

class Europe extends React.Component {
  constructor(props) {
    super(props);
    this.x_axis_confirmed = React.createRef();
    this.y_axis_confirmed = React.createRef();
    this.x_axis_deaths = React.createRef();
    this.y_axis_deaths = React.createRef();
    this.state = {};
  }
  xAxisConfirmed = d3.axisBottom();
  xAxisDeaths = d3.axisBottom();
  yAxisConfirmed = d3.axisLeft();
  yAxisDeaths = d3.axisLeft();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

    const europeTimeSeries = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].continent === "Europe")
        europeTimeSeries.push(data[i].timeseries);
    }
    const fEuropeTimeSeries = europeTimeSeries.flat();

    const nested = d3
      .nest()
      .key(d => d.date)
      .rollup(leaves => {
        const totalConfirmed = d3.sum(leaves, d => d.confirmed);
        const totalDeaths = d3.sum(leaves, d => d.deaths);
        const totalRecovered = d3.sum(leaves, d => d.recovered);

        return {
          totalConfirmed: totalConfirmed,
          totalDeaths: totalDeaths,
          totalRecovered: totalRecovered
        };
      })
      .entries(fEuropeTimeSeries);

    // Confirmed --------------------------------------
    const xExtentConfirmed = d3.extent(nested, d => new Date(d.key));
    const xScaleConfirmed = d3
      .scaleTime()
      .domain(xExtentConfirmed)
      .range([margin.left, width - margin.right]);

    const maxConfirmed = d3.max(nested, d => d.value.totalConfirmed);

    const yScaleConfirmed = d3
      .scaleLinear()
      .domain([0, maxConfirmed])
      .range([height - margin.bottom, margin.top]);

    // Deaths --------------------------------------

    const xExtentDeaths = d3.extent(nested, d => new Date(d.key));
    const xScaleDeaths = d3
      .scaleTime()
      .domain(xExtentDeaths)
      .range([margin.left, width - margin.right]);

    const maxDeaths = d3.max(nested, d => d.value.totalDeaths);

    const yScaleDeaths = d3
      .scaleLinear()
      .domain([0, maxDeaths])
      .range([height - margin.bottom, margin.top]);

    return {
      nested,
      yScaleConfirmed,
      xScaleConfirmed,
      xScaleDeaths,
      yScaleDeaths
    };
  }

  componentDidMount() {
    this.xAxisConfirmed.scale(this.state.xScaleConfirmed).tickArguments([10]);
    this.xAxisDeaths.scale(this.state.xScaleDeaths);
    d3.select(this.x_axis_confirmed.current).call(this.xAxisConfirmed);
    d3.select(this.x_axis_deaths.current).call(this.xAxisDeaths);
    this.yAxisConfirmed.scale(this.state.yScaleConfirmed);
    this.yAxisDeaths.scale(this.state.yScaleDeaths);
    d3.select(this.y_axis_confirmed.current).call(this.yAxisConfirmed);
    d3.select(this.y_axis_deaths.current).call(this.yAxisDeaths);
  }
  render() {
    const lineConfirmed = d3
      .line()
      .x(d => this.state.xScaleConfirmed(new Date(d.key)))
      .y(d => this.state.yScaleConfirmed(d.value.totalConfirmed));

    const lineDeaths = d3
      .line()
      .x(d => this.state.xScaleDeaths(new Date(d.key)))
      .y(d => this.state.yScaleDeaths(d.value.totalDeaths));
    return (
      <div className="world-line-charts">
        <div className="world-line-chart-confirmed">
          <p style={{ textAlign: "center" }}>Europe Cases</p>
          <svg width={width} height={height}>
            <path
              d={lineConfirmed(this.state.nested)}
              stroke="#696969"
              fill="transparent"
            />
            <text
              className="yAxisLabel"
              transform={`translate(10, ${(height - margin.bottom) /
                1.5}) rotate(270)`}
            >
              Coronavirus Cases
            </text>
            <text
              className="xAxisLabel"
              transform={`translate(${(width - margin.left - margin.right) /
                2}, ${height - 5})`}
            >
              Dates for the last 90 days
            </text>
            <g
              className="axis-bottom"
              ref={this.x_axis_confirmed}
              transform={`translate(0, ${height - margin.bottom})`}
            />
            <g
              ref={this.y_axis_confirmed}
              transform={`translate(${margin.left}, 0)`}
            />
          </svg>
        </div>
        <div className="world-line-chart-confirmed">
          <p style={{ textAlign: "center" }}>Europe Deaths</p>
          <svg width={width} height={height}>
            <path
              d={lineDeaths(this.state.nested)}
              stroke="red"
              fill="transparent"
            />
            <text
              className="yAxisLabel"
              transform={`translate(15, ${(height - margin.bottom) /
                1.5}) rotate(270)`}
            >
              Coronavirus Deaths
            </text>
            <text
              className="xAxisLabel"
              transform={`translate(${(width - margin.left - margin.right) /
                2}, ${height - 5})`}
            >
              Dates for the last 90 days
            </text>

            <g
              className="axis-bottom"
              ref={this.x_axis_deaths}
              transform={`translate(0, ${height - margin.bottom})`}
            />
            <g
              ref={this.y_axis_deaths}
              transform={`translate(${margin.left}, 0)`}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default Europe;
