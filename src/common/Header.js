import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import MobileMenu from "./mobileMenu";
import ContinentMenu from "./ContinentMenu";
import CountryMenu from "./CountryMenu";
import DateRange from "./DateRange";
import { DropdownIcon, VerticalLineIcon } from "../constants/svgicons";

const useStyles = makeStyles({});

const Header = () => {
  const [mobileMenu, setShowMobileMenu] = useState(false);
  const [theme, setTheme] = useState("dark");

  const classes = useStyles();

  const continentData = useSelector((state) => state.continentsData);

  let countries = continentData.selected
    ? continentData.continents[parseInt(continentData.selected) - 1].countries
    : [];

  const handleToggleOffClick = () => {
    setTheme("dark");
  };

  const handleToggleOnClick = () => {
    setTheme("light");
  };

  const handleListItemsClick = () => {
    setShowMobileMenu(false);
  };

  const showMobileMenu = () => {
    setShowMobileMenu(true);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="Header">
      <div className="Header-Container">
        <Link to="/" style={{ textDecoration: "none", color: "#110a57" }}>
          <div className="Header-Logo">
            <img
              src="/static/img/coronavirus.svg"
              alt="world"
              width="50"
              color="#110a57"
              className="logo"
            />
            <span className="logo-word" data-testid="logo-word">
              2019nCoV
            </span>
          </div>
        </Link>

        <div className="header-options">
          <ContinentMenu continentData={continentData} />
          <VerticalLineIcon className="bar" />
          <CountryMenu countries={countries} continentData={continentData} />
          <VerticalLineIcon className="bar" />
          <DateRange countries={countries} continentData={continentData} />
        </div>

        <div className="header-buttons">
          {theme === "light" ? (
            <ToggleOffIcon
              className="toggle-off-icon"
              onClick={handleToggleOffClick}
            />
          ) : (
            <ToggleOnIcon
              className="toggle-on-icon"
              onClick={handleToggleOnClick}
            />
          )}

          <div onClick={showMobileMenu}>
            <MenuButton />
          </div>
        </div>
      </div>
      {mobileMenu ? (
        <div id="mobile-menu">
          <MobileMenu
            closeMobileMenu={closeMobileMenu}
            handleListItemsClick={handleListItemsClick}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
