import React from "react";
import Africa from "./Africa";
import All from "./All";
import Asia from "./Asia";
import Australia from "./Australia";
import Europe from "./Europe";
import NorthAmerica from "./NorthAmerica";
import SouthAmerica from "./SouthAmerica";
import Tabs from "./Tabs";

const Continents = (props) => {
  const { data } = props;
  return (
    <div className="App">
      <Tabs>
        <div label="All">
          <All data={props.worldData} />
        </div>
        <div label="Africa">
          <Africa data={props.data} />
        </div>
        <div label="Asia">
          <Asia data={props.data} />
        </div>
        <div label="Australia">
          <Australia data={props.data} />
        </div>
        <div label="Europe">
          <Europe data={props.data} />
        </div>
        <div label="North America">
          <NorthAmerica data={props.data} />
        </div>
        <div label="South America">
          <SouthAmerica data={props.data} />
        </div>
      </Tabs>
    </div>
  );
};

export default Continents;
