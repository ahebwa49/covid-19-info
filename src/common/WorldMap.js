import React from "react";
import * as d3 from "d3";

const width = window.innerWidth - 32;

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.state = {
      width: width > 900 ? width * 0.7 : width,
      height: width > 900 ? width / 2.5 : width / 2
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    const { data } = this.props;
    const { width, height } = this.state;
    // console.log(data.covidData);
    window.addEventListener("resize", this.updateDimensions);

    const scaleValue = width > 630 ? 90 : 50;
    const svg = d3
      .select(this.chart.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");
    const projection = d3
      .geoMercator()
      .scale(scaleValue)
      .translate([width / 2, height / 1.4]);
    const path = d3.geoPath().projection(projection);
    const map = svg
      .selectAll("path")
      .data(data.geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 0.5);

    const confirmed_extent = d3.extent(data.covidData, d => d.confirmed);

    const rScale = d3
      .scaleSqrt()
      .domain(confirmed_extent)
      .range([1, 20]);

    svg
      .append("g")
      .attr("class", "bubble")
      .selectAll("circle")
      .data(data.covidData)
      .enter()
      .append("circle")
      .attr("fill", "red")
      .attr("cx", d => projection([d.coords.long, d.coords.lat])[0])
      .attr("cy", d => projection([d.coords.long, d.coords.lat])[1])
      .attr("r", d => rScale(d.confirmed))
      .attr("stroke", "black")
      .attr("stroke-width", 0.7)
      .attr("opacity", 0.7);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { data } = this.props;
    const styles = {
      container: {
        display: "flex",
        justifyContent: "center"
      },
      chart: {
        display: "flex"
      }
    };
    return (
      <div style={styles.container}>
        <div ref={this.chart} style={styles.chart} />
      </div>
    );
  }
}
export default WorldMap;
