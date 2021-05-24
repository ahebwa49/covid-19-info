import { combineReducers } from "redux";
import continentsReducer from "./continents";

const mainReducer = combineReducers({
  continents: continentsReducer,
});
export default mainReducer;
