import React from "react";
import { Link } from "react-router-dom";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import MenuButton from "./MenuButton";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: "coffee-button" };
  }

  render() {
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
              <span className="logo-word">2019nCoV</span>
            </div>
          </Link>

          <div className="header-options">
            <Link
              style={{ textDecoration: "none", color: "#110a57" }}
              to="/symptoms"
            >
              <div className="header-option">Symptoms</div>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#110a57" }}
              to="/transmission"
            >
              <div className="header-option">Transmission</div>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#110a57" }}
              to="/about"
            >
              <div className="header-option">About</div>
            </Link>
          </div>

          <div className="header-buttons">
            <ToggleOffIcon className="toggle-off-icon" />
            <MenuButton />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
