import { LOGIN, LOGOUT } from "./types";

export const loginUser = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
