/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveLine, Line } from "@nivo/line";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { getDimensions, useContainerDimensions } from "./linecards";

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
//   const dispatch = useDispatch();
  const componentRef = useRef();
  const { width: deviceWidth, height } = useContainerDimensions(componentRef);

  let [width, setWidth] = useState(props.defaultDeviceWidth || deviceWidth);
  let [timer, setTimer] = useState(null);
  let [timer2, setTimer2] = useState(null);

  const oncardClicked = () => {
    //dispatch actions here and after action dispatched callback change route
    // dispatch(
    //   action_selectDateRange({
    //     range: props.rangeindex,
    //     callback: onrouteChangeCallback,
    //   })
    // );
  };

  const onrouteChangeCallback = () => {
    props.history.push(props.onclickroute);
  };

  const transformdata = (
    data,
    id = "Leads",
    x = "createdDate",
    y = "leads"
  ) => {
    if (typeof data === "undefined") return [];

    return [
      {
        id,
        data: data.map((d) => {
          return {
            x: d[x],
            y: d[y],
          };
        }),
      },
    ];
  };

  const getTotal = (data, y) => {
    if (typeof data === "undefined") return 0;
    return data.reduce((total, obj) => {
      if (typeof obj[y] === "string") obj[y] = parseInt(obj[y]);
      return total + obj[y];
    }, 0);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  transformdata(props.data);

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

  window.addEventListener("Drawer_open_close", (e) => {
    if (!componentRef.current) return;
    let { width: deviceWidth, height } = getDimensions(componentRef);

    // if (width == deviceWidth) return;

    setWidth(deviceWidth);
  });

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
    <div className={classes.lineblock} ref={componentRef}>
      <ResponsiveLine
        // onClick={oncardClicked}
        data={props.data}
        margin={{ top: 50, right: 40, bottom: 50, left: 55 }}
        xScale={{ type: "point", min: 0 }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
          min: 0,
        }}
        // width={width}
        // height={height}
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
        enablePointLabel={props.enablePointLabel || true}
      />
    </div>
  );
};
export default withRouter(FullScreenLine);
