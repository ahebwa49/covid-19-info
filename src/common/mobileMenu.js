import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ContinentMenu from "./ContinentMenu";
import CountryMenu from "./CountryMenu";
import DateRange from "./DateRange";
import { useSelector } from "react-redux";
import { DropdownIcon, VerticalLineIcon } from "../constants/svgicons";

const MobileMenu = (props) => {
  const continentData = useSelector((state) => state.continentsData);

  let countries = continentData.selected
    ? continentData.continents[parseInt(continentData.selected) - 1].countries
    : [];
  return (
    <div className="mobileMenu">
      <div className="listItems">
        <ContinentMenu continentData={continentData} />
        <CountryMenu countries={countries} continentData={continentData} />
        <DateRange countries={countries} continentData={continentData} />
      </div>
      <div className="close" onClick={props.closeMobileMenu}>
        <CloseIcon style={{ color: "white" }} />
      </div>
    </div>
  );
};
export default MobileMenu;
