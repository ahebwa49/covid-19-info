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
            <button className="coffee-button" onClick={this.handleCoffeeClick}>
              <nav>
                buy me
                <img
                  src="/static/img/coffee-cup.svg"
                  alt="coffee"
                  width="25"
                  className="coffee-cup"
                />
              </nav>
            </button>

            <button onClick={this.handleFollowCLick} className="twitter-button">
              twitter
              <img
                src="/static/img/twitter.svg"
                alt="twitter"
                width="25"
                className="twitter-badge"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
