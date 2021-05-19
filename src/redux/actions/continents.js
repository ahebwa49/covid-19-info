import {
  SET_AFRICA_COUNTRIES,
  SET_ASIA_COUNTRIES,
  SET_AUSTRALIA_COUNTRIES,
  SET_EUROPE_COUNTRIES,
  SET_NORTH_AMERICA_COUNTRIES,
  SET_SOUTH_AMERICA_COUNTRIES,
} from "./types";

export const setAfricaCountries = (countries) => {
  return {
    type: SET_AFRICA_COUNTRIES,
    countries,
  };
};

export const setAsiaCountries = (countries) => {
  return {
    type: SET_ASIA_COUNTRIES,
    countries,
  };
};

export const setAustraliaCountries = (countries) => {
  return {
    type: SET_AUSTRALIA_COUNTRIES,
    countries,
  };
};

export const setEuropeCountries = (countries) => {
  return {
    type: SET_EUROPE_COUNTRIES,
    countries,
  };
};

export const setNorthAmericaCountries = (countries) => {
  return {
    type: SET_NORTH_AMERICA_COUNTRIES,
    countries,
  };
};

export const setSouthAmericaCountries = (countries) => {
  return {
    type: SET_SOUTH_AMERICA_COUNTRIES,
    countries,
  };
};
