import React from "react";
import Loader from "./common/Loader.js";
import AwesomeComponent from "./common/AwesomeComponent";
import WorldMap from "./common/WorldMap";
// import WorldMap from "./WorldMap";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        geoData: null,
        covidData: null
      }
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"
      ),
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/covid-info-api/master/public/worldcovid.json"
      ),
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/covid-info-api/master/public/country-capitals.json"
      )
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([geoData, covidData, capitalData]) => {
        // console.log(capitalData);
        let capitalCountries = [];
        for (let i = 0; i < capitalData.length; i++) {
          capitalCountries.push(capitalData[i].CountryName);
        }
        // console.log(capitalCountries);

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
        // console.log(cleanCovidData);
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
        // console.log(realCovidData);

        this.setState({
          data: {
            geoData: geoData,
            covidData: realCovidData
          }
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    const { data } = this.state;
    if (!data.geoData) {
      return (
        <div className="loader-wrapper">
          <AwesomeComponent />
        </div>
      );
    }
    return (
      <div className="app">
        <WorldMap data={data} />
      </div>
    );
  }
}
export default App;
