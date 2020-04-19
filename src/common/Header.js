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
            covid-19-info
          </div>
        </div>
        <div className="header-options">
          <div className="header-option">Data</div>
          <div className="header-option">Wiki</div>
          <div className="header-option">Newsletter</div>
          <div className="header-option">About</div>
        </div>
      </div>
    );
  }
}

export default Header;
