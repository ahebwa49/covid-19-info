import React from "react";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import moment from "moment";
import LineCards from "./linecards";
import BumpCard from "./bumpcard";
import FullScreenDialog from "./fullscreenpopup";
import { numberWithCommas } from "../helpers/index";

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
      openDialog: false,
      popupdata: [],
      reportname: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;

    let continent = nextProps.continentData.selected
      ? nextProps.continentData.continents[
          parseInt(nextProps.continentData.selected) - 1
        ].continent
      : "world";

    // console.log(continent);

    if (!data) return {};

    const timeSeries = [];

    if (continent === "world") {
      for (let i = 0; i < data.length; i++) {
        timeSeries.push(data[i].timeseries);
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].continent === `${continent}`)
          timeSeries.push(data[i].timeseries);
      }
    }

    const fTimeSeries = timeSeries.flat();

    // console.log(fTimeSeries);

    let countryCases = [];

    if (continent === "world") {
      for (let i = 0; i < data.length; i++) {
        let timeseries = data[i].timeseries.flat();
        countryCases.push({
          country: data[i].country,
          confirmed: data[i].timeseries[timeseries.length - 1].confirmed,
        });
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        let timeseries = data[i].timeseries.flat();
        if (data[i].continent === `${continent}`)
          countryCases.push({
            country: data[i].country,
            confirmed: data[i].timeseries[timeseries.length - 1].confirmed,
          });
      }
    }

    // console.log(countryCases);

    let topCountryCases = countryCases
      .sort((a, b) => b.confirmed - a.confirmed)
      .slice(0, 10);
    // console.log(topCountryCases);

    let topCountryNames = topCountryCases.map((item) => item.country);

    let topCountryTimeSeries = data.filter(
      (item) => topCountryNames.indexOf(item.country) !== -1
    );

    // console.log(topCountryTimeSeries);
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

    // console.log(continentTimeSeries);

    return {
      topCountryTimeSeries,
      continentTimeSeries,
      data,
    };
  }

  componentDidUpdate() {
    // console.log();
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
    let { continentData } = this.props;

    let countryBumpData = this.state.topCountryTimeSeries.map((entry) => {
      return {
        id: entry.country,
        data: entry.timeseries
          .filter(
            (item, index) =>
              item.date == "2020-3-1" ||
              item.date == "2020-9-1" ||
              item.date == "2021-3-1" ||
              item.date == "2021-9-1" ||
              item.date == "2022-3-1" ||
              item.date == "2022-9-1" ||
              index === entry.timeseries.length - 1
          )
          .map((item, index) => ({
            x: item.date,
            y: item.confirmed,
          })),
      };
    });

    let bumpData = countryBumpData;
    let continent = this.props.continentData.selected
      ? this.props.continentData.continents[
          parseInt(this.props.continentData.selected) - 1
        ].continent
      : "Total";
    return (
      <>
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
                duration="Date Range"
                color="#696969"
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
                duration="Date Range"
                color="red"
                onclickroute={``}
                rangeindex="2"
                axisLeftType="number"
                noDecimalLeft
              />
            </div>
          </div>
        </div>
        <div className="continental-bumpcard">
          {continentData.selected ? (
            <div className="heading">
              <p>Coronavirus Visualisation By Continent - Rank Over Time </p>
            </div>
          ) : (
            <div className="heading">
              <p>
                World Coronavirus Visualisation By Country - Rank Over Time{" "}
              </p>
            </div>
          )}

          <BumpCard
            data={bumpData}
            tooltip={(e, i) => {
              return (
                <div
                  style={{
                    background: "white ",
                    padding: "9px 12px",
                    border: "1px solid #ccc",
                  }}
                >
                  <strong style={{ fontSize: 14, marginBottom: 10 }}>
                    {e.serie.id}
                  </strong>
                  Hello
                  {/* {e.serie.data.map((point) => (
                    <div
                      key={point.x}
                      style={{
                        padding: "3px 0",
                        fontSize: 12,
                      }}
                    >
                      <strong>{point.x}: </strong>
                      {`${numberWithCommas(point.y)}`}
                    </div>
                  ))} */}
                </div>
              );
            }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  continentData: state.continentsData,
});

export default connect(mapStateToProps, null)(Continents);
