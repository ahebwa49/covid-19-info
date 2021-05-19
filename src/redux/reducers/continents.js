import {
  SET_AFRICA_COUNTRIES,
  SET_ASIA_COUNTRIES,
  SET_AUSTRALIA_COUNTRIES,
  SET_EUROPE_COUNTRIES,
  SET_NORTH_AMERICA_COUNTRIES,
  SET_SOUTH_AMERICA_COUNTRIES,
} from "../actions/types";

const continents = [
  { id: "1", continent: "Africa", countries: [] },
  { id: "2", continent: "Asia", countries: [] },
  { id: "3", continent: "Australia", countries: [] },
  { id: "4", continent: "Europe", countries: [] },
  { id: "5", continent: "North America", countries: [] },
  { id: "6", continent: "South America", countries: [] },
];

const initialState = {
  continents,
  selected: "2",
};

const continentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AFRICA_COUNTRIES:
      continents[0]["countries"] = [...action.countries];
      return state;
      break;
    case SET_ASIA_COUNTRIES:
      continents[1]["countries"] = [...action.countries];
      return state;
      break;
    case SET_AUSTRALIA_COUNTRIES:
      continents[2]["countries"] = [...action.countries];
      return state;
      break;
    case SET_EUROPE_COUNTRIES:
      continents[3]["countries"] = [...action.countries];
      return state;
      break;
    case SET_NORTH_AMERICA_COUNTRIES:
      continents[4]["countries"] = [...action.countries];
      return state;
      break;
    case SET_SOUTH_AMERICA_COUNTRIES:
      continents[5]["countries"] = [...action.countries];
      return state;
      break;
    default:
      return state;
  }
};

export default continentReducer;
