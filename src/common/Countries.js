import React from "react";
import * as d3 from "d3";

// const width = 450;
let id = 0;
let width;
const windowWidth = window.innerWidth - 32;
if (windowWidth > 900) {
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

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.x_axis_confirmed = React.createRef();
    this.y_axis_confirmed = React.createRef();
    this.x_axis_deaths = React.createRef();
    this.y_axis_deaths = React.createRef();
    this.state = {
      country: "Afghanistan"
    };
  }

  xAxisConfirmed = d3.axisBottom();
  xAxisDeaths = d3.axisBottom();
  yAxisConfirmed = d3.axisLeft();
  yAxisDeaths = d3.axisLeft();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { country } = prevState;
    const { data } = nextProps;
    if (!data) return {};

    let countries = [];

    const timeSeries = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].country === `${country}`) timeSeries.push(data[i].timeseries);
      countries.push({ name: data[i].country, id: id++ });
    }
    // console.log(countries);

    const fTimeSeries = timeSeries.flat();

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
      .entries(fTimeSeries);

    // console.log(nested);

    // Confirmed --------------------------------------
    const xExtentConfirmed = d3.extent(nested, d => new Date(d.key));
    const xScaleConfirmed = d3
      .scaleTime()
      .domain(xExtentConfirmed)
      .range([margin.left, width - margin.right]);

    const maxConfirmed = d3.max(nested, d => d.value.totalConfirmed);
    // console.log(maxConfirmed);

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
      countries,
      nested,
      yScaleConfirmed,
      xScaleConfirmed,
      xScaleDeaths,
      yScaleDeaths
    };
  }

  componentDidUpdate() {
    this.xAxisConfirmed.scale(this.state.xScaleConfirmed).tickArguments([10]);
    this.xAxisDeaths.scale(this.state.xScaleDeaths);
    d3.select(this.x_axis_confirmed.current).call(this.xAxisConfirmed);
    d3.select(this.x_axis_deaths.current).call(this.xAxisDeaths);
    this.yAxisConfirmed.scale(this.state.yScaleConfirmed);
    this.yAxisDeaths.scale(this.state.yScaleDeaths);
    d3.select(this.y_axis_confirmed.current).call(this.yAxisConfirmed);
    d3.select(this.y_axis_deaths.current).call(this.yAxisDeaths);
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

  handleChange = e => {
    this.setState({ country: e.target.value });
  };

  render() {
    const { country, countries } = this.state;
    const lineConfirmed = d3
      .line()
      .x(d => this.state.xScaleConfirmed(new Date(d.key)))
      .y(d => this.state.yScaleConfirmed(d.value.totalConfirmed));

    const lineDeaths = d3
      .line()
      .x(d => this.state.xScaleDeaths(new Date(d.key)))
      .y(d => this.state.yScaleDeaths(d.value.totalDeaths));
    return (
      <div className="country-visuals">
        <div className="select-country">
          <div>
            <label htmlFor="countries">Choose a country:</label>
          </div>
          <div>
            <select
              id="countries"
              value={this.state.country}
              onChange={this.handleChange}
            >
              {countries.map(country => {
                return (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="country-line-charts">
          <div className="country-line-chart">
            <p style={{ textAlign: "center" }}>{`${country} Cases`}</p>
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
          <div className="country-line-chart">
            <p style={{ textAlign: "center" }}>{`${country} Deaths`}</p>
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
      </div>
    );
  }
}

export default Countries;
