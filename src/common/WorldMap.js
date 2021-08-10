import React from "react";
import * as d3 from "d3";

const width = window.innerWidth - 32;

// const MARGIN = 5;
let projectionScaleChange;
let origProjectionScale;
let prevTransformScale = 1;
let rotation;
let selected = false;

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: width > 900 ? width * 0.7 : width,
      height: width > 900 ? width / 2 : width,
    };
  }

  drawWorldMap = () => {
    const { width, height } = this.state;
    var projectionScale = (origProjectionScale = height / 2.1);
    var translation = [width / 2, height / 2];

    const { data, covid } = this.props;
    var canvas = d3
      .select("#canvas-container")
      .append("canvas")
      .attr("id", "canvas-globe")
      .attr("width", width)
      .attr("height", height);
    var context = canvas.node().getContext("2d");

    var hiddenCanvas = d3
      .select("#canvas-container")
      .append("canvas")
      .attr("id", "canvas-hidden")
      .attr("width", width)
      .attr("height", height);

    var hiddenContext = hiddenCanvas.node().getContext("2d");

    var bufferCanvas = document.createElement("canvas");
    var bufferContext = bufferCanvas.getContext("2d");

    bufferContext.canvas.width = width;
    bufferContext.canvas.height = height;

    var projection = d3
      .geoOrthographic()
      .scale(projectionScale)
      .translate(translation)
      .clipAngle(90);

    var bufferPath = d3.geoPath().projection(projection).context(bufferContext);

    var hiddenProjection = d3
      .geoEquirectangular()
      .translate([width / 2, height / 2])
      .scale(width / 7);

    var hiddenPath = d3
      .geoPath()
      .projection(hiddenProjection)
      .context(hiddenContext);

    function drawHiddenCanvas(data) {
      var countries = data.features;
      countries.forEach(function (el, i) {
        hiddenContext.beginPath();
        hiddenPath(el);
        hiddenContext.fillStyle = "rgb(" + i + ",0,0)";
        hiddenContext.fill();
      });
    }

    var sphere = { type: "Sphere" };
    var grid = d3.geoGraticule()();

    ready(data, covid);
    function ready(data, covid) {
      insertCovidDataLinear(); // ~ 5 ms

      function insertCovidDataLinear() {
        covid.forEach(function (el) {
          data.features.forEach(function (elem) {
            if (el.country === elem.properties.name) {
              elem.properties.confirmed = +el.confirmed;
              elem.properties.deaths = +el.deaths;
              elem.properties.recovered = +el.recovered;
            }
          }); // loop through GeoJSON countries
        }); // loop through covid array of country objects
      } // insertForestDataLinear()

      /* Initial Draw */
      /* ------------ */

      // Draw the world

      requestAnimationFrame(function () {
        renderScene(data);
        drawHiddenCanvas(data);
      });
    }

    /* Interactivity */
    /* ============= */

    // The deltaMove module offers a fallback for calculating delta x and y as Safari and IE
    // don't expose d3.event.sourceEvent.movementX and .y which we need for the globe rotation
    let deltaMove = (function () {
      let prevX = 0;
      let prevY = 0;

      function getDeltas(position) {
        const [x, y] = position;

        let movementX = prevX ? x - prevX : 0;
        let movementY = prevY ? y - prevY : 0;

        prevX = x;
        prevY = y;

        return {
          x: movementX,
          y: movementY,
        };
      }

      function resetDeltas() {
        prevX = 0;
        prevY = 0;
      }

      return {
        coords: getDeltas,
        reset: resetDeltas,
      };
    })();

    /* Zoom and pan */
    /* ------------ */

    let zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .on("zoom", zoomed)
      .on("end", deltaMove.reset);

    canvas.call(zoom);

    function getPostions(e) {
      let x;
      let y;

      // Ringfencing, in case type is not defined.
      if (!e) return [0, 0];

      // Distinguish between desktop and touch.
      if (e.type === "mousemove") {
        x = e.screenX;
        y = e.screenY;
      } else if (e.type === "touchmove") {
        x = e.changedTouches[0].screenX;
        y = e.changedTouches[0].screenY;
      }

      return [x, y];
    }

    function zoomed() {
      // Get the shift in x and y coordinates

      // Get the current positions.
      const positions = getPostions(d3.event.sourceEvent);

      // Cross-browser solution:
      let delta = deltaMove.coords(positions);

      // get the deltas
      let dx = delta.x;
      let dy = delta.y;

      // // Fine for Chrome, Firefox:
      // var dx = d3.event.sourceEvent.movementX;
      // var dy = d3.event.sourceEvent.movementY;

      // This will return either 'mousemove' or 'wheel'
      let event = d3.event.sourceEvent ? d3.event.sourceEvent.type : null;

      // if the user zooms in using the mousewheel (or equivalent):
      if (event === "wheel") {
        // Change the scale according to the user interaction
        let transformScale = d3.event.transform.k;
        projectionScaleChange =
          (transformScale - prevTransformScale) * origProjectionScale;
        projectionScale += projectionScaleChange;
        projection.scale(projectionScale);
        prevTransformScale = transformScale;
        // if the user pans:
      } else if (event === "mousemove" || event === "touchmove") {
        // Change the rotation according to the user interaction
        let r = projection.rotate();
        rotation = [r[0] + dx * 0.4, r[1] - dy * 0.5, r[2]];
        projection.rotate(rotation);
      } else {
        // fallback

        console.warn("invalid mouse event in zoomed()");
      }

      // Rerender the globe
      requestAnimationFrame(function () {
        renderScene(data, selected);
      });

      hideTooltip();
    } // zoomed()

    function renderScene(countries, countryIndex) {
      drawScene(countries, countryIndex);
      context.clearRect(0, 0, width, height);
      context.drawImage(
        bufferCanvas,
        0,
        0,
        bufferCanvas.width,
        bufferCanvas.height
      );
    }

    function drawScene(countries, countryIndex) {
      // console.log(countries);

      const colorExtent = d3
        .extent(countries.features, (d) =>
          Math.sqrt(Math.cbrt(d.properties.confirmed))
        )
        .reverse();

      const colorScale = d3
        .scaleSequential()
        .domain(colorExtent)
        .interpolator(d3.interpolateRgb("red", "#FDF3F2"));

      bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
      // Sphere fill
      bufferContext.beginPath();
      bufferPath(sphere);
      bufferContext.fillStyle = "#D9EAEF";
      bufferContext.fill();

      // Grid
      bufferContext.beginPath();
      bufferPath(grid);
      bufferContext.lineWidth = 0.5;
      bufferContext.strokeStyle = "#BDDAE3";
      bufferContext.stroke();

      // Country fill - individual
      countries.features.forEach(function (el) {
        bufferContext.beginPath();
        bufferPath(el);
        bufferContext.fillStyle = colorScale(
          Math.sqrt(Math.cbrt(el.properties.confirmed))
        );
        bufferContext.fill();
      });

      // Country stroke
      bufferContext.beginPath();
      bufferPath(countries);
      bufferContext.lineWidth = 0.5;
      bufferContext.strokeStyle = "#FFFFFF";
      bufferContext.stroke();

      // Country stroke - hovered country
      if (countryIndex >= 0) {
        bufferContext.beginPath();
        bufferContext.setLineDash([4, 2]);
        bufferPath(countries.features[countryIndex]);
        bufferContext.lineWidth = 1;
        bufferContext.strokeStyle = "black";
        bufferContext.stroke();
        bufferContext.setLineDash([]);
      }
    }

    canvas.on("mousemove", highlightPicking);

    function highlightPicking() {
      let selected;
      var pos = d3.mouse(this);
      var longlat = projection.invert(pos);
      var hiddenPos = hiddenProjection(longlat);
      var pickedColor = hiddenContext.getImageData(
        hiddenPos[0],
        hiddenPos[1],
        1,
        1
      ).data;

      var inGlobe =
        Math.abs(pos[0] - projection(projection.invert(pos))[0]) < 0.5 &&
        Math.abs(pos[1] - projection(projection.invert(pos))[1]) < 0.5; // checking if the mouse is within the globe bounds

      selected = inGlobe && pickedColor[3] === 255 ? pickedColor[0] : false; // checking for inGlobe (above) and antialiasing
      // console.log(selected);

      requestAnimationFrame(function () {
        renderScene(data, selected);
      });
      var country = data.features[selected];
      // console.log(country);
      if (selected !== false) showTooltip(pos, country); // build tooltip
      if (selected === false) hideTooltip(); // remove tooltip
    }
    // buildTooltip(data);
    function buildTooltip(data) {
      // console.log(data);
    }

    var countryQueue = [undefined, undefined];

    function showTooltip(mouse, element) {
      var countryProps = element.properties;
      // console.log(mouse);
      countryQueue.unshift(countryProps.name);
      countryQueue.pop();

      if (countryQueue[0] !== countryQueue[1]) {
        let commaSeparatedConfirmedCases;
        let commaSeparatedDeathCases;
        let commaSeparatedRecoveredCases;
        d3.select("#tooltip div p").html(countryProps.name);
        if (countryProps.confirmed) {
          commaSeparatedConfirmedCases = countryProps.confirmed
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          commaSeparatedDeathCases = countryProps.deaths
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          commaSeparatedRecoveredCases = countryProps.recovered
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          d3.select("#confirmed").html(` ${commaSeparatedConfirmedCases}`);
          d3.select("#deaths").html(` ${commaSeparatedDeathCases}`);
          d3.select("#recovered").html(` ${commaSeparatedRecoveredCases}`);
        } else {
          d3.select("#confirmed").html(` Not recorded`);
          d3.select("#deaths").html(` Not recorded`);
          d3.select("#recovered").html(` Not recorded`);
        }

        // svg.selectAll(".bar").attr("fill", function(d) {
        //   return d.color;
        // });
        // d3.select("#" + stripString(countryProps.name)).attr("fill", "orange");

        d3.select("#tooltip")
          .style("display", "flex")
          .style("left", width > 630 ? mouse[0] + 20 + "px" : 5 + "px")
          .style("top", width > 630 ? mouse[1] + 20 + "px" : 5 + "px")
          .transition()
          .duration(100)
          .style("opacity", 0.98);
      } else {
        d3.select("#tooltip")
          .style("left", width > 630 ? mouse[0] + 20 + "px" : 5 + "px")
          .style("top", width > 630 ? mouse[1] + 20 + "px" : 5 + "px");
      }
    }
    function hideTooltip() {
      countryQueue.unshift(undefined);
      countryQueue.pop();
      d3.select("#tooltip").transition().duration(100).style("opacity", 0);
    }
  };

  componentDidMount() {
    this.drawWorldMap();
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    let newWindowWidth = window.innerWidth - 32;
    this.setState({
      width: newWindowWidth > 900 ? newWindowWidth * 0.7 : newWindowWidth,
      height: newWindowWidth > 900 ? newWindowWidth / 2 : newWindowWidth,
    });
  };

  componentWillUnmount() {
    document.removeEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    d3.select("#canvas-globe").remove();

    d3.select("#canvas-hidden").remove();

    this.drawWorldMap();
  }

  render() {
    return (
      <div id="canvas-container">
        <div id="tooltip" style={{ display: "none", position: "absolute" }}>
          <div id="tooltip-heading">
            <p />
          </div>
          <div id="tooltip-body">
            <div id="tooltip-body-entry">
              <span id="confirmed-label">Confirmed:</span>
              <span id="confirmed" />
            </div>
            <div id="tooltip-body-entry">
              <span id="deaths-label">Deaths:</span>
              <span id="deaths" />
            </div>

            {/* <div id="tooltip-body-entry">
              <span id="recovered-label">Recovered:</span>
              <span id="recovered" />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default WorldMap;
