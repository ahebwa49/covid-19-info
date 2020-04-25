import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoClick = () => {
    window.location.assign("/");
  };

  render() {
    return (
      <div className="Header">
        <div className="Header-Container">
          <div className="Header-Logo" onClick={this.handleLogoClick}>
            <img
              src="/static/img/world.svg"
              alt="world"
              width="50"
              color="#110a57"
              className="logo"
            />
            <span className="logo-word">covid-19-info</span>
          </div>

          <div className="header-options">
            <div className="header-option">Data</div>
            <div className="header-option">Wiki</div>
            <div className="header-option">Newsletter</div>
            <div className="header-option">About</div>
          </div>
          <div className="follow-button">
            <button>Follow Me</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;