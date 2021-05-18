import React from "react";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import LineCards from "./linecards";
import FullScreenDialog from "./fullscreenpopup";

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
  bottom: 30,
  left: 50,
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
      country: "Afghanistan",
      openDialog: false,
      popupdata: [],
      reportname: "",
    };
  }

  xAxisConfirmed = d3.axisBottom().ticks(5);
  xAxisDeaths = d3.axisBottom().ticks(5);
  yAxisConfirmed = d3.axisLeft().tickFormat(d3.format(".2s"));
  yAxisDeaths = d3.axisLeft().tickFormat(d3.format(".2s"));

  static getDerivedStateFromProps(nextProps, prevState) {
    const { country } = prevState;
    // console.log(country);
    const { data } = nextProps;
    if (!data) return {};

    // console.log(data)

    let countries = [];

    const timeSeries = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].country === `${country}`) timeSeries.push(data[i].timeseries);
      countries.push({ name: data[i].country, id: id++ });
    }
    // console.log(countries);

    const fTimeSeries = timeSeries.flat();

    // console.log(fTimeSeries);

    const nested = d3
      .nest()
      .key((d) => d.date)
      .rollup((leaves) => {
        const totalConfirmed = d3.sum(leaves, (d) => d.confirmed);
        const totalDeaths = d3.sum(leaves, (d) => d.deaths);
        const totalRecovered = d3.sum(leaves, (d) => d.recovered);

        return {
          totalConfirmed: totalConfirmed,
          totalDeaths: totalDeaths,
          totalRecovered: totalRecovered,
        };
      })
      .entries(fTimeSeries);

    // console.log(nested);

    // Confirmed --------------------------------------
    const xExtentConfirmed = d3.extent(nested, (d) => new Date(d.key));
    const xScaleConfirmed = d3
      .scaleTime()
      .domain(xExtentConfirmed)
      .range([margin.left, width - margin.right]);

    const maxConfirmed = d3.max(nested, (d) => d.value.totalConfirmed);
    // console.log(maxConfirmed);

    const yScaleConfirmed = d3
      .scaleLinear()
      .domain([0, maxConfirmed])
      .range([height - margin.bottom, margin.top]);

    // Deaths --------------------------------------
    const xExtentDeaths = d3.extent(nested, (d) => new Date(d.key));
    const xScaleDeaths = d3
      .scaleTime()
      .domain(xExtentDeaths)
      .range([margin.left, width - margin.right]);

    const maxDeaths = d3.max(nested, (d) => d.value.totalDeaths);

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
      yScaleDeaths,
      fTimeSeries,
    };
  }

  componentDidUpdate() {
    this.xAxisConfirmed.scale(this.state.xScaleConfirmed);
    this.xAxisDeaths.scale(this.state.xScaleDeaths);
    d3.select(this.x_axis_confirmed.current).call(this.xAxisConfirmed);
    d3.select(this.x_axis_deaths.current).call(this.xAxisDeaths);
    this.yAxisConfirmed.scale(this.state.yScaleConfirmed);
    this.yAxisDeaths.scale(this.state.yScaleDeaths);
    d3.select(this.y_axis_confirmed.current).call(this.yAxisConfirmed);
    d3.select(this.y_axis_deaths.current).call(this.yAxisDeaths);
  }

  componentDidMount() {
    this.xAxisConfirmed.scale(this.state.xScaleConfirmed);
    this.xAxisDeaths.scale(this.state.xScaleDeaths);
    d3.select(this.x_axis_confirmed.current).call(this.xAxisConfirmed);
    d3.select(this.x_axis_deaths.current).call(this.xAxisDeaths);
    this.yAxisConfirmed.scale(this.state.yScaleConfirmed);
    this.yAxisDeaths.scale(this.state.yScaleDeaths);
    d3.select(this.y_axis_confirmed.current).call(this.yAxisConfirmed);
    d3.select(this.y_axis_deaths.current).call(this.yAxisDeaths);
  }

  handleChange = (e) => {
    this.setState({ country: e.target.value });
  };

  handleConfirmedClickOpen = (e) => {
    e.stopPropagation();
    this.setState({
      openDialog: true,
      title: "Confirmed",
    });
  };
  handleDeathsClickOpen = (e) => {
    e.stopPropagation();
    this.setState({
      openDialog: true,
      title: "Deaths",
    });
  };

  handleClose = (e) => {
    this.setState({ openDialog: false, title: "" });
  };

  render() {
    const { country, countries } = this.state;
    const lineConfirmed = d3
      .line()
      .x((d) => this.state.xScaleConfirmed(new Date(d.key)))
      .y((d) => this.state.yScaleConfirmed(d.value.totalConfirmed));

    const lineDeaths = d3
      .line()
      .x((d) => this.state.xScaleDeaths(new Date(d.key)))
      .y((d) => this.state.yScaleDeaths(d.value.totalDeaths));
    return (
      <div className="country-visuals">
        <FullScreenDialog
          open={this.state.openDialog}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
          data={this.state.fTimeSeries}
          title={this.state.title}
          line
        />
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
              {countries.map((country) => {
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
            <LineCards
              data={this.state.fTimeSeries}
              handleClickOpenDialog={this.handleConfirmedClickOpen}
              title="Confirmed"
              x="date"
              y="confirmed"
              duration="Last Year"
              color="green"
              onclickroute={``}
              rangeindex="2"
              axisLeftType="number"
              noDecimalLeft
            />
          </div>
          <div className="country-line-chart">
            <p style={{ textAlign: "center" }}>{`${country} Deaths`}</p>
            <LineCards
              data={this.state.fTimeSeries}
              handleClickOpenDialog={this.handleDeathsClickOpen}
              title="Deaths"
              x="date"
              y="deaths"
              duration="Last Year"
              color="red"
              onclickroute={``}
              rangeindex="2"
              axisLeftType="number"
              noDecimalLeft
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Countries;
