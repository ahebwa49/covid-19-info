import { SET_AFRICA_COUNTRIES } from "./types";

export const setAfricaCountries = (countries) => {
  return {
    type: SET_AFRICA_COUNTRIES,
    countries,
  };
};
