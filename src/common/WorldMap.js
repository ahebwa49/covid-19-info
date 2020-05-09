import React from "react";
import * as d3 from "d3";

const width = window.innerWidth - 32;

var origProjectionScale,
  projectionScaleChange,
  prevTransformScale = 1,
  rotation;

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: width > 900 ? width * 0.7 : width,
      height: width > 900 ? width / 2 : width
    };
  }

  componentDidMount() {
    const { width, height } = this.state;
    var projectionScale = (origProjectionScale = height / 2.1);
    var translation = [width / 2, height / 2];

    const { data, covid } = this.props;
    // console.log(data);
    // console.log(covid);
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

    var bufferPath = d3
      .geoPath()
      .projection(projection)
      .context(bufferContext);

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
      countries.forEach(function(el, i) {
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
        covid.forEach(function(el) {
          data.features.forEach(function(elem) {
            if (el.country === elem.properties.name) {
              elem.properties.confirmed = +el.confirmed;
              elem.properties.deaths = +el.deaths;
              elem.properties.recovered = +el.recovered;
            }
          }); // loop through GeoJSON countries
        }); // loop through covid array of country objects
      } // insertForestDataLinear()

      requestAnimationFrame(function() {
        renderScene(data);
        drawHiddenCanvas(data);
      });

      /* Interactivity goes here */

      // The deltaMove module offers a fallback for calculating delta x and y as Safari and IE
      // don't expose d3.event.sourceEvent.movementX and .y which we need for the globe rotation
      var deltaMove = (function() {
        var prevX = 0,
          prevY = 0;

        function getDeltas(event) {
          var movementX = prevX ? event.screenX - prevX : 0;
          var movementY = prevY ? event.screenY - prevY : 0;

          prevX = event.screenX;
          prevY = event.screenY;

          return {
            x: movementX,
            y: movementY
          };
        }

        function resetDeltas() {
          prevX = 0;
          prevY = 0;
        }

        return {
          coords: getDeltas,
          reset: resetDeltas
        };
      })();

      var zoom = d3
        .zoom()
        .scaleExtent([0.5, 4])
        .on("zoom", zoomed)
        .on("end", deltaMove.reset);

      canvas.call(zoom);

      function zoomed() {
        var event = d3.event.sourceEvent.type;
        // console.log(d3.event.transform);

        // Get the shift in x and y coordinates

        // Cross-browser solution:
        var delta = deltaMove.coords(d3.event.sourceEvent);

        // get the deltas
        var dx = delta.x;
        var dy = delta.y;

        // Fine for chrome, firefox
        // var dx = d3.event.sourceEvent.movementX;
        // var dy = d3.event.sourceEvent.movementY;

        if (event === "wheel") {
          var transformScale = d3.event.transform.k;

          projectionScaleChange =
            (transformScale - prevTransformScale) * origProjectionScale;
          projectionScale = projectionScale + projectionScaleChange;
          projection.scale(projectionScale);
          prevTransformScale = transformScale;
        } else if (event === "mousemove") {
          // Here goes the rotation logic as this will be triggered upon dragging
          var r = projection.rotate();
          rotation = [r[0] + dx * 0.4, r[1] - dy * 0.5, r[2]];
          projection.rotate(rotation);
          // } else if (event === "touchmove") {
          //   var r = projection.rotate();
          //   rotation = [r[0] + dx * 0.4, r[1] - dy * 0.5, r[2]];
          //   projection.rotate(rotation);
        } else {
          console.warn("unknown mouse event in zoomed()"); // alerting issues
        }

        requestAnimationFrame(function() {
          renderScene(data);
        });
      }

      buildTooltip(data);
    }

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
        .extent(countries.features, d =>
          Math.sqrt(Math.cbrt(d.properties.confirmed))
        )
        .reverse();

      const colorScale = d3
        .scaleSequential()
        .domain(colorExtent)
        .interpolator(d3.interpolateRdYlGn);

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
      countries.features.forEach(function(el) {
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
      bufferContext.strokeStyle = "#D2D3CE";
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

      requestAnimationFrame(function() {
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
        d3.select("#tooltip div p").html(countryProps.name);
        d3.select("#confirmed").html(`Confirmed: ${countryProps.confirmed}`);
        d3.select("#deaths").html(`Deaths: ${countryProps.deaths}`);
        d3.select("#recovered").html(`Recovered: ${countryProps.recovered}`);

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
      d3.select("#tooltip")
        .transition()
        .duration(100)
        .style("opacity", 0);
    }
  }

  render() {
    return (
      <div id="canvas-container">
        <div id="tooltip" style={{ display: "none", position: "absolute" }}>
          <div id="tooltip-heading">
            <p />
          </div>
          <div id="tooltip-body">
            <p id="confirmed" />
            <p id="deaths" />
            <p id="recovered" />
          </div>
        </div>
      </div>
    );
  }
}
export default WorldMap;
