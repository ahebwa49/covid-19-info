import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: "coffee-button" };
  }

  handleLogoClick = () => {
    window.location.assign("/");
  };

  handleFollowCLick = () => {
    window.location.href = "https://twitter.com/ahebwa49";
  };

  handleCoffeeClick = () => {
    window.location.href = "https://ko-fi.com/asabahebwa";
  };

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
            <a href="https://ko-fi.com/G2G01YZJE" target="_blank">
              <img
                height="36"
                style={{ height: "36px" }}
                src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>

            <a href="https://twitter.com/ahebwa49" target="_blank">
              <img src="/static/img/twitter.svg" alt="twitter" width="36" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
