import React from "react";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import LineCards from "./linecards";
import BumpCard from "./bumpcard";
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
      openDialog: false,
      popupdata: [],
      reportname: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;

    let continent =
      nextProps.continentData.continents[
        parseInt(nextProps.continentData.selected) - 1
      ].continent;

    console.log(continent);

    if (!data) return {};

    const timeSeries = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].continent === `${continent}`)
        timeSeries.push(data[i].timeseries);
    }

    const fTimeSeries = timeSeries.flat();
    // console.log(fTimeSeries);

    console.log(data);
    const bumpCountries = [];
    for (let i = 0; i < data.length; i++) {
      bumpCountries.push(data[i].country);
    }
    console.log(bumpCountries);

    bumpCountries.map((country) => {
      let timeseries = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].country === `${country}`)
          timeseries.push(data[i].timeseries);
      }
    })

    // const bumpNested = d3
    //   .nest()
    //   .key((d) => d.country)
    //   .rollup((leaves) => {
    //     const totalConfirmed = d3.sum(leaves, (d) => d.);

    //     return {
    //       totalConfirmed: totalConfirmed,

    //     };
    //   })
    //   .entries(bumpTimeSeries);

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
    let bumpData = [
      {
        id: "Serie 1",
        data: [
          {
            x: 2000,
            y: 2,
          },
          {
            x: 2001,
            y: 4,
          },
          {
            x: 2002,
            y: 12,
          },
          {
            x: 2003,
            y: 9,
          },
          {
            x: 2004,
            y: 9,
          },
        ],
      },
      {
        id: "Serie 2",
        data: [
          {
            x: 2000,
            y: 9,
          },
          {
            x: 2001,
            y: 12,
          },
          {
            x: 2002,
            y: 2,
          },
          {
            x: 2003,
            y: 10,
          },
          {
            x: 2004,
            y: 1,
          },
        ],
      },
      {
        id: "Serie 3",
        data: [
          {
            x: 2000,
            y: 12,
          },
          {
            x: 2001,
            y: 3,
          },
          {
            x: 2002,
            y: 7,
          },
          {
            x: 2003,
            y: 2,
          },
          {
            x: 2004,
            y: 8,
          },
        ],
      },
      {
        id: "Serie 4",
        data: [
          {
            x: 2000,
            y: 1,
          },
          {
            x: 2001,
            y: 2,
          },
          {
            x: 2002,
            y: 1,
          },
          {
            x: 2003,
            y: 11,
          },
          {
            x: 2004,
            y: 4,
          },
        ],
      },
      {
        id: "Serie 5",
        data: [
          {
            x: 2000,
            y: 5,
          },
          {
            x: 2001,
            y: 6,
          },
          {
            x: 2002,
            y: 5,
          },
          {
            x: 2003,
            y: 8,
          },
          {
            x: 2004,
            y: 6,
          },
        ],
      },
      {
        id: "Serie 6",
        data: [
          {
            x: 2000,
            y: 3,
          },
          {
            x: 2001,
            y: 11,
          },
          {
            x: 2002,
            y: 3,
          },
          {
            x: 2003,
            y: 7,
          },
          {
            x: 2004,
            y: 3,
          },
        ],
      },
      {
        id: "Serie 7",
        data: [
          {
            x: 2000,
            y: 7,
          },
          {
            x: 2001,
            y: 7,
          },
          {
            x: 2002,
            y: 9,
          },
          {
            x: 2003,
            y: 4,
          },
          {
            x: 2004,
            y: 7,
          },
        ],
      },
      {
        id: "Serie 8",
        data: [
          {
            x: 2000,
            y: 8,
          },
          {
            x: 2001,
            y: 1,
          },
          {
            x: 2002,
            y: 4,
          },
          {
            x: 2003,
            y: 1,
          },
          {
            x: 2004,
            y: 10,
          },
        ],
      },
      {
        id: "Serie 9",
        data: [
          {
            x: 2000,
            y: 10,
          },
          {
            x: 2001,
            y: 5,
          },
          {
            x: 2002,
            y: 8,
          },
          {
            x: 2003,
            y: 12,
          },
          {
            x: 2004,
            y: 2,
          },
        ],
      },
      {
        id: "Serie 10",
        data: [
          {
            x: 2000,
            y: 4,
          },
          {
            x: 2001,
            y: 10,
          },
          {
            x: 2002,
            y: 6,
          },
          {
            x: 2003,
            y: 3,
          },
          {
            x: 2004,
            y: 5,
          },
        ],
      },
      {
        id: "Serie 11",
        data: [
          {
            x: 2000,
            y: 11,
          },
          {
            x: 2001,
            y: 9,
          },
          {
            x: 2002,
            y: 11,
          },
          {
            x: 2003,
            y: 6,
          },
          {
            x: 2004,
            y: 11,
          },
        ],
      },
      {
        id: "Serie 12",
        data: [
          {
            x: 2000,
            y: 6,
          },
          {
            x: 2001,
            y: 8,
          },
          {
            x: 2002,
            y: 10,
          },
          {
            x: 2003,
            y: 5,
          },
          {
            x: 2004,
            y: 12,
          },
        ],
      },
    ];
    let continent =
      this.props.continentData.continents[
        parseInt(this.props.continentData.selected) - 1
      ].continent;
    return (
      <>
        <div className="country-visuals" style={{ border: "1px solid red" }}>
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
        <div
          style={{
            border: "1px solid red",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <BumpCard data={bumpData} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  continentData: state.continentsData,
});

export default connect(mapStateToProps, null)(Continents);
