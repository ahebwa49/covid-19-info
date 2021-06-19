import React from "react";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
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

class Continents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      continent:
        this.props.continentData.continents[
          parseInt(this.props.continentData.selected) - 1
        ].continent,
      openDialog: false,
      popupdata: [],
      reportname: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { continent } = prevState;
    const { data } = nextProps;

    if (!data) return {};

    const timeSeries = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].continent === `${continent}`)
        timeSeries.push(data[i].timeseries);
    }

    const fTimeSeries = timeSeries.flat();

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

    let continentTimeSeries = [];

    for (let entry of nested) {
      continentTimeSeries.push({
        date: entry.key,
        confirmed: entry.value.totalConfirmed,
        deaths: entry.value.totalDeaths,
        recovered: entry.value.totalRecovered,
      });
    }

    console.log(continentTimeSeries);

    return {
      continentTimeSeries,
    };
  }

  componentDidUpdate() {
    console.log();
  }

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
    const { continent } = this.state;
    return (
      <div className="country-visuals">
        <FullScreenDialog
          open={this.state.openDialog}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
          data={this.state.continentTimeSeries}
          title={this.state.title}
          line
        />

        <div className="country-line-charts">
          <div className="country-line-chart">
            <p style={{ textAlign: "center" }}>{`${continent} Cases`}</p>
            <LineCards
              data={this.state.continentTimeSeries}
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
            <p style={{ textAlign: "center" }}>{`${continent} Deaths`}</p>
            <LineCards
              data={this.state.continentTimeSeries}
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

const mapStateToProps = (state) => ({
  continentData: state.continentsData,
});

export default connect(mapStateToProps, null)(Continents);
