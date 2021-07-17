import { combineReducers } from "redux";
import continentsReducer from "./continents";
import loadingReducer from "./uilayer";

const mainReducer = combineReducers({
  continentsData: continentsReducer,
  loading: loadingReducer,
});
export default mainReducer;
