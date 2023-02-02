import React from 'react';
import { connect } from 'react-redux';
import {
  action_setAfricaCountries,
  action_setAsiaCountries,
  action_setAustraliaCountries,
  action_setEuropeCountries,
  action_setNorthAmericaCountries,
  action_setSouthAmericaCountries,
} from './redux/actions/continents';
import Loader from './common/Loader.js';
import WorldMap from './common/WorldMap';
import QuickFacts from './common/QuickFacts';
import Countries from './common/Countries';
import Footer from './common/Footer';
import Continents from './common/Continents';
import Header from './common/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        geoData: null,
        covid: null,
        covidData: null,
        plainCovidData: null,
        capitalData: null,
        newTimeSeries: null,
      },
      // chartResize: false,
    };
  }

  componentDidMount() {
    // window.addEventListener('resize', this.handleResize);

    Promise.all([
      fetch(
        'https://raw.githubusercontent.com/ahebwa49/covid-info-api/master/public/world_countries.json'
      ),
      fetch('https://pomber.github.io/covid19/timeseries.json'),
      fetch(
        'https://raw.githubusercontent.com/ahebwa49/covid-info-api/master/public/country-capitals.json'
      ),
    ])
      .then((responses) => Promise.all(responses.map((resp) => resp.json())))
      .then(([geoData, covidData, capitalData]) => {
        console.log(covidData);
        // Countries with locaation data
        let capitalCountries = [];
        for (let i = 0; i < capitalData.length; i++) {
          capitalCountries.push(capitalData[i].CountryName);
        }

        // Country data with last time entry

        let cleanCovidData = [];
        for (let country in covidData) {
          const lastTimeEntry =
            covidData[country][covidData[country].length - 1];
          cleanCovidData.push(
            Object.assign({}, lastTimeEntry, {
              country: country,
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
                  long: capitalData[index].CapitalLongitude,
                },
              })
            );
          }
        }

        let newTimeSeries = [];

        for (let country in covidData) {
          const index = capitalCountries.indexOf(country);
          if (index >= 0) {
            newTimeSeries.push(
              Object.assign(
                {},
                {
                  timeseries: covidData[country],
                  country: country,
                  continent: capitalData[index].ContinentName,
                }
              )
            );
          }
        }
        // console.log(newTimeSeries);

        let africaCountries = [];
        let asiaCountries = [];
        let australiaCountries = [];
        let europeCountries = [];
        let northAmericaCountries = [];
        let southAmericaCountries = [];

        let data = newTimeSeries;

        for (let i = 0; i < data.length; i++) {
          if (data[i].continent === 'Africa') {
            africaCountries.push(data[i].country);
          } else if (data[i].continent === 'Asia') {
            asiaCountries.push(data[i].country);
          } else if (data[i].continent === 'Australia') {
            australiaCountries.push(data[i].country);
          } else if (data[i].continent === 'Europe') {
            europeCountries.push(data[i].country);
          } else if (data[i].continent === 'North America') {
            northAmericaCountries.push(data[i].country);
          } else if (data[i].continent === 'South America') {
            southAmericaCountries.push(data[i].country);
          } else {
          }
        }
        this.props.action_setAfricaCountries(africaCountries);
        this.props.action_setAsiaCountries(asiaCountries);
        this.props.action_setAustraliaCountries(australiaCountries);
        this.props.action_setEuropeCountries(europeCountries);
        this.props.action_setNorthAmericaCountries(northAmericaCountries);
        this.props.action_setSouthAmericaCountries(southAmericaCountries);
        this.setState({
          data: {
            geoData: geoData,
            covid: cleanCovidData,
            covidData: realCovidData,
            plainCovidData: covidData,
            capitalData: capitalData,
            newTimeSeries: newTimeSeries,
          },
        });
      })
      .catch((error) => console.log(error));
  }

  // handleResize = () => {
  //   const { chartResize } = this.state;
  //   if (chartResize === false) {
  //     this.setState({ chartResize: true });
  //   } else {
  //     setTimeout(() => {
  //       this.setState({ chartResize: false });
  //     }, '1000');
  //   }
  // };

  // componentWillUnmount() {
  //   document.removeEventListener('resize', this.handleResize);
  // }
  render() {
    const { data, chartResize } = this.state;
    const { continentData, loading } = this.props;

    if (data.geoData === null) {
      return (
        <div className="primary-loader-wrapper">
          <Loader />
        </div>
      );
    }

    // if (chartResize === true) {
    //   return (
    //     <div className="primary-loader-wrapper">
    //       <Loader />
    //     </div>
    //   );
    // }
    return (
      <>
        <Header />
        {loading ? (
          <div className="secondary-loader-wrapper">
            <Loader />
          </div>
        ) : (
          <div className="app">
            {continentData.selected ? (
              <>
                <div className="heading">
                  <p>Coronavirus Visualisation By Country - Linear Scale</p>
                </div>
                <div>
                  <Countries data={data.newTimeSeries} />
                </div>
              </>
            ) : null}

            {continentData.selected ? null : (
              <>
                <div className="globe_heading">
                  <p className="globe_heading_p">
                    World Coronavirus Visualisation - 3D Rotating Globe
                  </p>
                </div>
                <div className="general">
                  <div className="sidebar">
                    <QuickFacts data={data.covidData} />
                  </div>
                  <div className="main">
                    <WorldMap data={data.geoData} covid={data.covid} />
                  </div>
                </div>
              </>
            )}
            {continentData.selected ? null : (
              <div className="facts">
                <QuickFacts data={data.covidData} />
              </div>
            )}
            <div className="heading" style={{ marginTop: '2rem' }}>
              {continentData.selected ? (
                <p>Coronavirus Visualisation By Continent - Linear Scale</p>
              ) : (
                <p>World Coronavirus Visualisation - Linear Scale</p>
              )}
            </div>

            <div>
              <Continents
                data={data.newTimeSeries}
                worldData={data.plainCovidData}
              />
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  continentData: state.continentsData,
});

const mapDispatchToProps = {
  action_setAfricaCountries,
  action_setAsiaCountries,
  action_setAustraliaCountries,
  action_setEuropeCountries,
  action_setNorthAmericaCountries,
  action_setSouthAmericaCountries,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
