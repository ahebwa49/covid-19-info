import React from "react";
import { Link } from "react-router-dom";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import TwitterIcon from "@material-ui/icons/Twitter";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: "coffee-button" };
  }

  handleLogoClick = () => {
    window.location.assign("/");
  };

  handleFollowCLick = () => {
    window.location.href = "https://twitter.com/lasabahebwa";
  };

  // handleCoffeeClick = () => {
  //   window.location.href = "https://ko-fi.com/asabahebwa";
  // };

  render() {
    return (
      <div className="Header">
        <div className="Header-Container">
          <div className="Header-Logo" onClick={this.handleLogoClick}>
            <img
              src="/static/img/coronavirus.svg"
              alt="world"
              width="50"
              color="#110a57"
              className="logo"
            />
            <span className="logo-word">2019nCoV</span>
          </div>

          <div className="header-options">
            <Link style={{ textDecoration: "none" }} to="/symptoms">
              <div className="header-option">Symptoms</div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/transmission">
              <div className="header-option">Transmission</div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/newsletter">
              <div className="header-option">Newsletter</div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/about">
              <div className="header-option">About</div>
            </Link>
          </div>

          <div className="header-buttons">
            <a
              href="https://twitter.com/lasabahebwa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ToggleOffIcon className="toggle-off-icon" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
