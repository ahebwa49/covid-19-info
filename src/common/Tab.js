import React from "react";
import PropTypes from "prop-types";

class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { onClick, label } = this.props;
    onClick(label);
  };
  render() {
    let className = "tab-list-item";
    const { label, activeTab } = this.props;

    if (activeTab === label) {
      className += " tab-list-active-item";
    }
    return (
      <li className={className} onClick={this.onClick}>
        {label}
      </li>
    );
  }
}

export default Tab;
