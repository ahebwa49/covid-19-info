import React from "react";
import { Link } from "react-router-dom";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import MenuButton from "./MenuButton";
import MobileMenu from "./mobileMenu";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMobileMenu: false, theme: "dark" };
  }

  handleToggleOffClick = () => {
    this.setState({
      theme: "dark"
    });
  };

  handleToggleOnClick = () => {
    this.setState({
      theme: "light"
    });
  };

  handleListItemsClick = () => {
    this.setState({
      showMobileMenu: false
    });
  };

  showMobileMenu = () => {
    this.setState({
      showMobileMenu: true
    });
  };

  closeMobileMenu = () => {
    this.setState({
      showMobileMenu: false
    });
  };

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
              <span className="logo-word" data-testid="logo-word">
                2019nCoV
              </span>
            </div>
          </Link>

          <div className="header-options">
            <Link
              to="/symptoms"
              style={{ textDecoration: "none", color: "#110a57" }}
            >
              <div className="header-option">Symptoms</div>
            </Link>
            <Link
              to="/transmission"
              style={{ textDecoration: "none", color: "#110a57" }}
            >
              <div className="header-option">Transmission</div>
            </Link>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "#110a57" }}
            >
              <div className="header-option">About</div>
            </Link>
          </div>

          <div className="header-buttons">
            {this.state.theme === "light" ? (
              <ToggleOffIcon
                className="toggle-off-icon"
                onClick={this.handleToggleOffClick}
              />
            ) : (
              <ToggleOnIcon
                className="toggle-on-icon"
                onClick={this.handleToggleOnClick}
              />
            )}

            <div onClick={this.showMobileMenu}>
              <MenuButton />
            </div>
          </div>
        </div>
        {this.state.showMobileMenu ? (
          <div id="mobile-menu">
            <MobileMenu
              closeMobileMenu={this.closeMobileMenu}
              handleListItemsClick={this.handleListItemsClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Header;
