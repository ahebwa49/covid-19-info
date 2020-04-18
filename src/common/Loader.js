import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  margin: auto;
  border-color: #099dd9;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="loader">
        <ClipLoader
          css={override}
          size={150}
          color={"#099dd9"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
export default Loader;
