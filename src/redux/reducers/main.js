import { combineReducers } from "redux";
import continentsReducer from "./continents";

const mainReducer = combineReducers({
  continentsData: continentsReducer,
});
export default mainReducer;
