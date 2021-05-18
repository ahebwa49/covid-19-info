import { combineReducers } from "redux";
import userReducer from "./user";
import continentsReducer from "./continents";

const mainReducer = combineReducers({
  user: userReducer,
  continents: continentsReducer,
});
export default mainReducer;
