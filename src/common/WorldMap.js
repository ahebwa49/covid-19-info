import React from "react";
import * as d3 from "d3";
const margin = 75;
const width = 1200 - margin;
const height = 650 - margin;
class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.state = {};
  }
  componentDidMount() {
    const { data } = this.props;
    const svg = d3
      .select(this.chart.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");
    const projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.4]);
    const path = d3.geoPath().projection(projection);
    const map = svg
      .selectAll("path")
      .data(data.geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "rgb(9, 157, 217)")
      .style("stroke", "black")
      .style("stroke-width", 0.5);
  }
  render() {
    const { data } = this.props;
    const styles = {
      container: {
        display: "grid",
        justifyItems: "center"
      }
    };
    return (
      <div ref={this.chart} style={styles.container}>
        <p style={{ textAlign: "center" }}>COVID-19 CORONAVIRUS PANDEMIC</p>
      </div>
    );
  }
}
export default WorldMap;
