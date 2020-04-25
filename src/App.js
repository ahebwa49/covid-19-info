import React from "react";
import Loader from "./common/Loader.js";
import WorldMap from "./common/WorldMap";
import QuickFacts from "./common/QuickFacts";
import LineChart from "./common/LineChart";
import Continents from "./common/Continents";
// import WorldMap from "./WorldMap";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        geoData: null,
        covidData: null,
        plainCovidData: null,
        capitalData: null,
        newTimeSeries: null
      }
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"
      ),
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/covid-info-api/master/public/data.json"
      ),
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/covid-info-api/master/public/country-capitals.json"
      )
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([geoData, covidData, capitalData]) => {
        // Countries with locaation data
        let capitalCountries = [];
        for (let i = 0; i < capitalData.length; i++) {
          capitalCountries.push(capitalData[i].CountryName);
        }

        // Country data with last time entry

        let cleanCovidData = [];
        for (let country in covidData.timeseries) {
          const lastTimeEntry =
            covidData.timeseries[country][
              covidData.timeseries[country].length - 1
            ];
          cleanCovidData.push(
            Object.assign({}, lastTimeEntry, {
              country: country
            })
          );
        }

        // Country data with last time entry and location
        let realCovidData = [];

        for (let i = 0; i < cleanCovidData.length; i++) {
          const index = capitalCountries.indexOf(cleanCovidData[i].country);
          if (index >= 0) {
            realCovidData.push(
              Object.assign({}, cleanCovidData[i], {
                coords: {
                  lat: capitalData[index].CapitalLatitude,
                  long: capitalData[index].CapitalLongitude
                }
              })
            );
          }
        }

        let newTimeSeries = [];

        for (let country in covidData.timeseries) {
          const index = capitalCountries.indexOf(country);
          if (index >= 0) {
            newTimeSeries.push(
              Object.assign(
                {},
                {
                  timeseries: covidData.timeseries[country],
                  country: country,
                  continent: capitalData[index].ContinentName
                }
              )
            );
          }
        }
        // console.log(newTimeSeries);
        this.setState({
          data: {
            geoData: geoData,
            covidData: realCovidData,
            plainCovidData: covidData,
            capitalData: capitalData,
            newTimeSeries: newTimeSeries
          }
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    const { data } = this.state;
    if (data.geoData === null) {
      return (
        <div className="loader-wrapper">
          <Loader />
        </div>
      );
    }
    return (
      <div className="app">
        <div className="general">
          <div className="sidebar">
            <QuickFacts data={data.covidData} />
          </div>
          <div className="main">
            <WorldMap data={data} />
          </div>
        </div>

        <div className="facts">
          <QuickFacts data={data.covidData} />
        </div>
        <div className="line-graph-world">
          <LineChart data={data.plainCovidData} />
        </div>
        <div>
          <Continents data={data.newTimeSeries} />
        </div>
      </div>
    );
  }
}
export default App;
