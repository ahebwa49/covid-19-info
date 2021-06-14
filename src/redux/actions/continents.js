import {
  SELECT_CONTINENT,
  SELECT_COUNTRY,
  SET_AFRICA_COUNTRIES,
  SET_ASIA_COUNTRIES,
  SET_AUSTRALIA_COUNTRIES,
  SET_EUROPE_COUNTRIES,
  SET_NORTH_AMERICA_COUNTRIES,
  SET_SOUTH_AMERICA_COUNTRIES,
} from "./types";

export const action_selectCountry = (id) => {
  console.log(id);
  return {
    type: SELECT_COUNTRY,
    id,
  };
};

export const action_selectContinent = (id) => {
  console.log(id);
  return {
    type: SELECT_CONTINENT,
    id,
  };
};

export const action_setAfricaCountries = (countries) => {
  return {
    type: SET_AFRICA_COUNTRIES,
    countries,
  };
};

export const action_setAsiaCountries = (countries) => {
  return {
    type: SET_ASIA_COUNTRIES,
    countries,
  };
};

export const action_setAustraliaCountries = (countries) => {
  return {
    type: SET_AUSTRALIA_COUNTRIES,
    countries,
  };
};

export const action_setEuropeCountries = (countries) => {
  return {
    type: SET_EUROPE_COUNTRIES,
    countries,
  };
};

export const action_setNorthAmericaCountries = (countries) => {
  return {
    type: SET_NORTH_AMERICA_COUNTRIES,
    countries,
  };
};

export const action_setSouthAmericaCountries = (countries) => {
  return {
    type: SET_SOUTH_AMERICA_COUNTRIES,
    countries,
  };
};
