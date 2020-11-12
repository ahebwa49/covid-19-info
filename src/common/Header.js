import React from "react";
import { Link } from "react-router-dom";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import MenuButton from "./MenuButton";
import MobileMenu from "./mobileMenu";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMobileMenu: false };
  }

  showMobileMenu = () => {
    this.setState(
      {
        showMobileMenu: true
      },
      () => {
        document
          .querySelector(".listItems")
          .addEventListener("click", this.closeMobileMenu);
      }
    );
  };

  closeMobileMenu = () => {
    this.setState({
      showMobileMenu: false
    });
  };

  componentWillUnmount() {
    document
      .querySelector(".listItems")
      .removeEventListener("click", this.closeMobileMenu);
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
            <ToggleOffIcon className="toggle-off-icon" />
            <div onClick={this.showMobileMenu}>
              <MenuButton />
            </div>
          </div>
        </div>
        {this.state.showMobileMenu ? (
          <div id="mobile-menu">
            <MobileMenu closeMobileMenu={this.closeMobileMenu} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Header;
