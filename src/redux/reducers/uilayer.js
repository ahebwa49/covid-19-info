import { SET_LOADING } from "../actions/types";

const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: action.loading,
      });
      break;
    default:
      return state;
  }
};

export default loadingReducer;
