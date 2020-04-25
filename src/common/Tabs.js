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

    const styles = {
      container: {
        display: "flex",
        marginTop: "1rem"
        // border: "1px solid cyan"
      },
      tabs: {
        display: "flex",
        JustifyContent: "center",
        width: "20%",
        // border: "1px solid red"
      },
      children: {
        // border: "1px solid green",
        width: "100%"
      },
      tabsList: {
        padding: "0 1rem"
      },
      logout: {}
    };

    return (
      <div className="container" style={styles.container}>
        <div style={styles.tabs}>
          <ol style={styles.tabsList}>
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
        <div style={styles.children}>
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
