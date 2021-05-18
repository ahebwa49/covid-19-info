import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
    loggedIn : false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            const newState = Object.assign({}, initialState, action.user, {loggedIn: true});
            return newState;

        case LOGOUT:
            return initialState;

        default:
            return state;
    }

}

export default userReducer;
