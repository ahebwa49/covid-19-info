import React from "react";
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
            <span className="logo-word">2019-nCoV</span>
          </div>

          <div className="header-options">
            <div className="header-option">Symptoms</div>
            <div className="header-option">Transmission</div>
            <div className="header-option">Newsletter</div>
            <div className="header-option">About</div>
          </div>

          <div className="header-buttons">
            <a
              href="https://twitter.com/lasabahebwa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="twitter-icon" />
              {/* <img src="/static/img/twitter.svg" alt="twitter" width="36" /> */}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
