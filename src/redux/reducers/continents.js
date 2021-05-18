import { selectContinent, SET_AFRICA_COUNTRIES } from "../actions/types";

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
    case selectContinent:
      return state;

    case SET_AFRICA_COUNTRIES:
      return state;
      break;

    default:
      return state;
  }
};

export default continentReducer;
