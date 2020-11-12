import React, { Component } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

class MobileMenu extends Component {
  render() {
    return (
      <div className="mobileMenu">
        <div className="listItems" onClick={this.props.handleListItemsClick}>
          <Link
            to="/symptoms"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="list-item">Symptoms</div>
          </Link>
          <Link
            to="/transmission"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="list-item">Transmission</div>
          </Link>
          <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
            <div className="list-item">About</div>
          </Link>
        </div>
        <div className="close" onClick={this.props.closeMobileMenu}>
          <CloseIcon style={{ color: "white" }} />
        </div>
      </div>
    );
  }
}
export default MobileMenu;
