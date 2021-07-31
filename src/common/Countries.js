import React from "react";
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

class Countries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      popupdata: [],
      reportname: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { continentData } = nextProps;
    let countries = continentData.selected
      ? continentData.continents[parseInt(continentData.selected) - 1].countries
      : [];

    let country =
      continentData.continents[parseInt(continentData.selected) - 1].countries[
        "countries"
      ][`${countries.selected}` - 1].name;

    const { data } = nextProps;
    if (!data) return {};

    const timeSeries = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].country === `${country}`) timeSeries.push(data[i].timeseries);
    }

    const fTimeSeries = timeSeries.flat();

    // console.log(fTimeSeries);

    return {
      fTimeSeries,
      countries,
      country,
    };
  }

  componentDidUpdate(prevProps, prevState) {}

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
    const { continentData } = this.props;

    let countries = continentData.selected
      ? continentData.continents[parseInt(continentData.selected) - 1].countries
      : [];

    let country =
      continentData.continents[parseInt(continentData.selected) - 1].countries[
        "countries"
      ][`${countries.selected}` - 1].name;

    // console.log(country);

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

        <div className="country-line-charts">
          <div className="country-line-chart">
            <p style={{ textAlign: "center" }}>{`${country} Cases`}</p>
            <LineCards
              data={this.state.fTimeSeries}
              handleClickOpenDialog={this.handleConfirmedClickOpen}
              title="Confirmed"
              x="date"
              y="confirmed"
              duration="Date Range"
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
    );
  }
}

const mapStateToProps = (state) => ({
  continentData: state.continentsData,
});

export default connect(mapStateToProps, null)(Countries);
