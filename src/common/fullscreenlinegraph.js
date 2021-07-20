/* eslint-disable no-useless-computed-key */
import React from "react";
// import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveLine } from "@nivo/line";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
// import { action_selectDateRange } from "../General/store//daterange";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { transformLinedata, getLineTotal } from "../transforms/line";

const useStyles = makeStyles({
  root: {
    height: "440px",
    paddingBottom: "60px",
    paddingLeft: 15,
    ["&:hover"]: {
      cursor: "pointer",
      boxShadow:
        "0px 5px 4px -1px rgba(0,0,0,0.2), 0px 3px 3px 0px rgba(0,0,0,0.14), 0px 3px 3px 0px rgba(0,0,0,0.12)",
      "& $details": {
        ["& $nexticon"]: {
          color: "#26BBED",
        },
      },
    },
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 0,
  },
  duration: {
    color: "#999",
    fontSize: 14,
    marginTop: 8,
  },
  nexticon: {
    // transform: "rotate(-90deg)",
    fontSize: 26,
    color: "#999",
  },
  fullscreenicon: {
    minWidth: 40,
    fontSize: "2.4rem",
    marginRight: 10,
    ["&:hover"]: {
      cursor: "pointer",
    },
  },
  toolTipContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
    color: "#333",
    lineHeight: "18px",
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 4,
  },
});

const FullScreenLine = (props) => {
  const classes = useStyles();

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
        break;
      default:
        return value;
    }
  }

  let fullLineData = transformLinedata(
    props.data,
    props.title,
    props.x,
    props.y
  );

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
      props.data.length - 1 == tickIndex ? Math.ceil(value) : parseInt(value);

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
    axisBottom: props.axisBottom || {
      orient: "bottom",
      tickSize: 2,
      tickPadding: 5,
      tickRotation: props.rotation && -30,
    },
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
    <ResponsiveLine
      // onClick={oncardClicked}
      data={fullLineData}
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
      margin={{ top: 50, right: 120, bottom: 50, left: 55 }}
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
      enableGridX={true}
      enableGridY={false}
      axisBottom={{
        orient: "bottom",
        tickSize: 2,
        tickPadding: 5,
        tickRotation: props.rotation && -30,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      colors={props.color}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      {...defaultExtraProps}
      axisLeft={{
        format: (value) => formatAxis(value, props.axisLeftType),
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: 16,
      }}
      animate={props.animate || false}
      enablePointLabel={props.enablePointLabel || false}
      enablePoints={false}
    />
  );
};
export default withRouter(FullScreenLine);
