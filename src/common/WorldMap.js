import React from "react";
import * as d3 from "d3";

const width = window.innerWidth;

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.state = { width: width, height: width / 2 };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    const { data } = this.props;
    const { width, height } = this.state;
    // console.log(data.covidData);
    window.addEventListener("resize", this.updateDimensions);

    const scaleValue = width > 700 ? 130 : 50;
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
      .style("fill", "rgb(9, 157, 217)")
      .style("stroke", "black")
      .style("stroke-width", 0.5);

    const confirmed_extent = d3.extent(data.covidData, d => d.confirmed);

    const rScale = d3
      .scaleSqrt()
      .domain(confirmed_extent)
      .range([2, 25]);

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
        flexDirection: "column",
        justifyContent: "center"
      },
      chart: {
        // border: "1px solid red"
      }
    };
    return (
      <div style={styles.container}>
        <p style={{ textAlign: "center" }}>COVID-19 CORONAVIRUS PANDEMIC</p>
        <div ref={this.chart} style={styles.chart} />
      </div>
    );
  }
}
export default WorldMap;
