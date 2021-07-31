/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ResponsiveLine, Line } from "@nivo/line";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
// import { action_selectDateRange } from "../store/daterange";
import { Calender, FullScreen } from "../constants/svgicons";
import { generateAxisValues } from "../helpers/axis";
import { transformLinedata, getLineTotal } from "../transforms/line";
import { MicNone } from "@material-ui/icons";

const theme = {
  tooltip: {
    background: "#FFFFFF",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
    color: "#333",
    lineHeight: "18px",
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 4,
  },

  background: "#ffffff",
  textColor: "#333333",
  fontFamily: "Open Sans",
  fontSize: 13,
  axis: {
    domain: {
      line: {
        stroke: "#333",
        strokeWidth: 2,
      },
    },
    ticks: {
      line: {
        stroke: "#fff",
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: "#999",
      strokeWidth: 1,
    },
  },
};

const useStyles = makeStyles({
  root: {
    // width: "100%",
    height: "440px",
    padding: 24,
    ["&:hover"]: {
      cursor: "pointer",
      boxShadow: "0px 6px 30px rgba(51, 51, 51, 0.08)",

      "& $details": {
        ["& $nexticon"]: {
          color: "#26BBED",
        },
      },
    },
    borderRadius: 4,
    position: "relative",
    border: "1px solid #DADADA",
  },
  mobileRoot: {
    height: "440px",
    paddingTop: 24,
    marginBottom: "3rem",
    ["&:hover"]: {
      cursor: "pointer",
      boxShadow: "0px 6px 30px rgba(51, 51, 51, 0.08)",

      "& $details": {
        ["& $nexticon"]: {
          color: "#26BBED",
        },
      },
    },
    borderRadius: 4,
    position: "relative",
    border: "1px solid #DADADA",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    // border: "1px solid blue",
  },
  mobileDetails: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingLeft: "1rem",
  },
  toolTipContainer: {
    display: "flex",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 10,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(51, 51, 51, 0.2)",
    zIndex: 0,
  },
  durationContainer: {
    display: "flex",
    color: "#333",
    opacity: 0.8,
    fontSize: 14,
    lineHeight: "20px",
  },
  duration: {
    marginLeft: "0.5rem",
  },
  nexticon: {
    // transform: "rotate(-90deg)",
    fontSize: 26,
    color: "#999",
  },
  fullscreenicon: {
    display: "inline",
    ["&:hover"]: {
      cursor: "pointer",
    },
  },
  mobilefullscreenicon: {
    display: "none",
  },
  lineblock: {
    display: "flex",
    justifyContent: "center",
    height: "90%",
    // border: "1px solid blue",
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: "27.24px",
    color: "#333",
  },
  total: {
    color: "#333",
    fontWeight: "600",
    marginLeft: 8,
  },
  tooltip: {
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
    borderRadius: 12,
  },
  tooltiptext: {
    color: "#333",
    fontSize: 12,
    lineHeight: "18px",
  },
});

export const getDimensions = (myRef) => ({
  width: myRef?.current?.offsetWidth,
  height: myRef?.current?.offsetHeight,
});

export const useContainerDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleResize = () => {
    setDimensions(getDimensions(myRef));
  };

  useEffect(() => {
    if (myRef.current) {
      setDimensions(getDimensions(myRef));
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return dimensions;
};

const LineCards = (props) => {
  const componentRef = useRef();
  const { width: deviceWidth, height } = useContainerDimensions(componentRef);
  const [lineWidth, setLineWidth] = useState(undefined);
  const classes = useStyles();
  const [drilldownColor, setDrillDown] = useState("#333");
  let [width, setWidth] = useState(deviceWidth);
  let [timer, setTimer] = useState(null);
  let [timer2, setTimer2] = useState(null);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatNumbers(value) {
    if (value >= 1000 && value < 1000000) {
      value = value / 1000;
      let fixed = 1;

      if (value.toFixed(0) == value) fixed = 0;

      value = numberWithCommas(value.toFixed(fixed));
      return value + "k";
    } else if (value >= 1000000 && value < 10000000000) {
      value = value / 1000000;
      let fixed = 1;

      if (value.toFixed(1) == value) fixed = 0;
      value = numberWithCommas(value.toFixed(fixed));
      return value + "M";
    } else if (value >= 10000000000) {
      value = value / 10000000000;
      let fixed = 1;

      if (value.toFixed(1) == value) fixed = 0;
      value = numberWithCommas(value.toFixed(fixed));
      return value + "B";
    }

    return value + "";
  }

  function formatAxis(value, type) {
    switch (type) {
      case "number":
        return formatNumbers(value);
      default:
        return value;
    }
  }

  useEffect(() => {
    setLineWidth(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    if (width == deviceWidth) return;

    clearTimeout(timer);
    clearTimeout(timer2);
    setTimer(
      setTimeout(() => {
        setWidth(deviceWidth - 10);
      }, 1500)
    );

    setTimer2(
      setTimeout(() => {
        setWidth(deviceWidth);
      }, 1500)
    );
  }, [props.data, props.title, props.x, props.y, deviceWidth, height]);

  let lineData = transformLinedata(props.data, props.title, props.x, props.y);

  const renderTick = ({
    opacity,
    textAnchor,
    textBaseline,
    textX,
    textY,
    value,
    x,
    y,
    animatedProps,
    tickIndex,
    ...others
  }) => {
    if (Number(value) % 1 != 0) return null;

    let showable =
      lineData.length - 1 == tickIndex ? Math.ceil(value) : parseInt(value);

    return (
      <g
        transform={`translate(${x},${y})`}
        style={{ opacity: animatedProps.opacity }}
      >
        <text
          alignmentBaseline={textBaseline}
          textAnchor={textAnchor}
          transform={`translate(${textX},${textY})`}
          style={{ fontSize: 13 }}
        >
          {props.formatLeft ? props.formatLeft(showable) : showable}
        </text>
      </g>
    );
  };

  let defaultExtraProps = {
    axisLeft: props.axisLeft || {
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    },
    axisBottom: props.axisBottom,
  };

  if (props.noDecimalLeft) {
    defaultExtraProps.axisLeft = defaultExtraProps.axisLeft || {};
    defaultExtraProps.axisLeft.renderTick = renderTick;
  }

  if (props.noDecimalBottom) {
    defaultExtraProps.axisBottom = defaultExtraProps.axisBottom || {};
    defaultExtraProps.axisBottom.renderTick = renderTick;
  }

  return (
    <Paper
      elevation={0}
      className={lineWidth < 700 ? classes.mobileRoot : classes.root}
      onMouseEnter={() => {
        setDrillDown("#26BBED");
      }}
      onMouseLeave={() => {
        setDrillDown("#333");
      }}
    >
      <div
        className={lineWidth > 768 ? classes.details : classes.mobileDetails}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography className={classes.title} variant="h2">
            <span>{props.title}:</span>

            <span className={classes.total}>
              {numberWithCommas(props.data[props.data.length - 1][props.y])}
            </span>
          </Typography>

          <div style={{ display: "flex", alignItems: "center", paddingTop: 8 }}>
            <Typography className={classes.durationContainer}>
              <Calender />
              <span className={classes.duration}>{props.duration}</span>
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            onClick={(e) =>
              props.handleClickOpenDialog(
                e,
                transformLinedata(props.data, props.title, props.x, props.y),
                props.title,
                { x: props.x, y: props.y, color: props.color },
                true
              )
            }
            className={
              lineWidth >= 1000
                ? classes.fullscreenicon
                : classes.mobilefullscreenicon
            }
          >
            <FullScreen
              style={{ display: "inline" }}
              onMouseEnter={() => {
                setDrillDown("#333");
              }}
              onMouseLeave={() => {
                setDrillDown("#26BBED");
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes.lineblock} ref={componentRef}>
        <ResponsiveLine
          tooltip={(point) => {
            return (
              <div className={classes.toolTipContainer}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: `${props.color}`,
                    marginRight: "0.8rem",
                  }}
                ></div>
                <div>
                  <strong>
                    {point.point.data.xFormatted}:{" "}
                    {numberWithCommas(point.point.data.yFormatted)}
                  </strong>
                </div>
              </div>
            );
          }}
          data={lineData}
          height={380}
          width={
            lineWidth === 768
              ? lineWidth - 90
              : lineWidth > 768
              ? 0.4 * lineWidth - 90
              : lineWidth - 45
          }
          margin={{ top: 50, right: 40, bottom: 50, left: 50 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve={props.curve === undefined ? "natural" : props.curve}
          axisTop={null}
          axisRight={null}
          enableGridX={false}
          enableGridY={false}
          theme={theme}
          colors={props.color}
          pointSize={1}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={3}
          pointBorderColor="#ffffff"
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          {...defaultExtraProps.axisLeft}
          axisLeft={{
            format: (value) => formatAxis(value, props.axisLeftType),
          }}
          axisBottom={{
            format: "%b %d",
            tickValues: 5,
          }}
          animate={props.animate || false}
          enablePointLabel={props.enablePointLabel || false}
          enablePoints={false}
        />
      </div>
    </Paper>
  );
};
export default withRouter(LineCards);
