import React from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="line-container">
        <div className="line-container-tabs">
          <ol className="line-container-tabs-list">
            {this.props.children.map(child => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  label={label}
                  key={label}
                  onClick={this.onClickTabItem}
                />
              );
            })}
          </ol>
        </div>
        <div className="line-container-children">
          {this.props.children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}
export default Tabs;
