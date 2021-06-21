import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore, ExpandLess } from "../constants/svgicons";
import { Typography, Button } from "@material-ui/core";
import { ResponsiveAreaBump, AreaBump } from "@nivo/bump";
import { useContainerDimensions, getDimensions } from "./linecards";

const useStyles = makeStyles({
  root: {
    height: "400px",
    paddingBottom: "50px",
    paddingLeft: 15,
  },
  bumpNote: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#F9F9F9",
    color: "#333333",
    border: "1px solid #DADADA",
    boxSizing: "border-box",
    borderRadius: "4px",
    marginTop: "20px",
    paddingLeft: "1rem",
    height: "90px",
    width: "100%",
  },
  noteHeading: {
    display: "inline-block",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "21.79px",
  },
  noteText: {
    marginTop: "10px",
    fontSize: "16px",
    lineHeight: "22px",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
const BumpCard = (props) => {
  const classes = useStyles();
  const { data = [] } = props;

  const componentRef = useRef();
  const timeoutRef = useRef(null);
  const timeoutRef2 = useRef(null);
  const dataHeight =
    data.slice(0, data.length > 10 ? 10 : data.length).length *
    (data.slice(0, data.length > 10 ? 10 : data.length).length < 5 ? 160 : 70);
  const { width: deviceWidth, height: deviceHeight } =
    useContainerDimensions(componentRef);

  let [width, setWidth] = useState(props.defaultDeviceWidth || deviceWidth);
  let [height, setHeight] = useState(
    props.defaultDeviceHeight || dataHeight || deviceHeight
  );

  useEffect(() => {
    if (width == deviceWidth) return;

    clearTimeout(timeoutRef.current);
    clearTimeout(timeoutRef2.current);

    timeoutRef.current = setTimeout(() => {
      let { width: deviceWidth, height: deviceHeight } =
        getDimensions(componentRef);
      setWidth(deviceWidth - 10);
      setHeight(dataHeight);
    }, 500);

    timeoutRef2.current = setTimeout(() => {
      let { width: deviceWidth, height: deviceHeight } =
        getDimensions(componentRef);
      setWidth(deviceWidth);
      setHeight(dataHeight);
    }, 1500);
  }, [props.data, props.title, props.x, props.y, deviceWidth, deviceHeight]);

  window.addEventListener("Drawer_open_close", (e) => {
    if (!componentRef.current) return;
    let { width: deviceWidth, height } = getDimensions(componentRef);

    if (width == deviceWidth) return;

    setWidth(deviceWidth);
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        letterSpacing: 0,
      }}
    >
      <div
        style={{
          height,
        }}
        ref={componentRef}
      >
        <AreaBump
          theme={{
            fontFamily: "Open Sans",
          }}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={8}
          colors={{ scheme: "nivo" }}
          blendMode="multiply"
          width={width}
          height={height}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "CoffeeScript",
              },
              id: "dots",
            },
            {
              match: {
                id: "TypeScript",
              },
              id: "lines",
            },
          ]}
          startLabel="id"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -36,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          colors={[
            "#FFC656",
            "#78D9C9",
            "#C1C35D",
            "#C1B7DB",
            "#FF6F69",
            "#77B1D5",
            "#DDE765",
            "#FFC7E4",
            "#DCD5D5",
            "#54494E",
            "#C872BD",
            "#C3F0C5",
            "#E0C081",
            "#B58194",
            "#90A8B6",
            "#C79898",
            "#F5D656",
            "#94E3F8",
            "#806062",
            "#D4885E",
          ]}
          {...props}
          data={data.length > 10 ? data.slice(0, 10) : data}
        />
      </div>
      {data.length > 10 && (
        <div className={classes.bumpNote}>
          <span className={classes.noteHeading}>NOTE</span>
          <Typography className={classes.noteText}>
            {props.noteText ||
              `The above bump chart only shows the Engagement for the Top 10 Emails`}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default BumpCard;
