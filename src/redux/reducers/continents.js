import { selectContinent } from "../actions/types";

const continents = [
  { id: "1", continent: "Africa" },
  { id: "2", continent: "Asia" },
  { id: "3", continent: "Australia" },
  { id: "4", continent: "Europe" },
  { id: "5", continent: "North America" },
  { id: "6", continent: "South America" },
];

const initialState = {
  continents,
  selected: "2",
};

const continentReducer = (state = initialState, action) => {
  switch (action.type) {
    case selectContinent:
      //   const newState = Object.assign({}, initialState, action.user, {
      //     loggedIn: true,
      //   });
      return state;

    // case LOGOUT:
    //   return initialState;

    default:
      return state;
  }
};

export default continentReducer;
