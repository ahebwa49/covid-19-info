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
    this.state = {
      country: "Afghanistan",
      openDialog: false,
      popupdata: [],
      reportname: "",
    };
  }

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

    console.log(fTimeSeries);

    return {
      countries,
      fTimeSeries,
    };
  }

  componentDidUpdate() {}

  componentDidMount() {}

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
        {/* <div className="select-country">
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
        </div> */}
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
