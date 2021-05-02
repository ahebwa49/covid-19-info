import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import { makeStyles } from "@material-ui/styles";
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
          <ContinentMenu />
          <VerticalLineIcon className="bar" />
          <CountryMenu />
          <VerticalLineIcon className="bar" />
          <DateRange />
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
