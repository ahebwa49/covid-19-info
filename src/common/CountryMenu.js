import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch } from "react-redux";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { DropdownIcon } from "../constants/svgicons";
import { action_setLoading } from "../redux/actions/uilayer";
import {
  action_selectCountry,
  action_selectContinent,
} from "../redux/actions/continents";
import { Radio } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    textTransform: "none",
  },
  btn: {
    whiteSpace: "nowrap",
    fontSize: "16px",
    width: "100%",
    ["&:hover"]: {
      backgroundColor: "#fff",
      color: "rgba(38, 187, 237, 1)",
    },
    textTransform: "none",
  },
  mobileBtn: {
    display: "flex",
    alignItems: "center",
    padding: 8,
  },
  inactiveMobileBtn: {
    display: "flex",
    alignItems: "center",
    opacity: 0.2,
    padding: 8,
  },
  btnallorg: {
    fontSize: "1.6rem",
    color: "#555",
    padding: "1rem",
    textTransform: "none",
  },
  btntext: {
    color: "#555",
    ["&:hover"]: {
      backgroundColor: "#fff",
      color: "rgba(38, 187, 237, 1)",
    },
    textTransform: "none",
  },
  arrowicon: {
    color: "#555",
  },
  menu: {
    paddingTop: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 6px 30px rgba(51, 51, 51, 0.08)",
    width: 250,
    zIndex: 1000,
    border: "1px solid #DADADA",
    marginTop: 5,
    borderRadius: 4,
  },
  menuItem: {
    fontSize: "16px",
    color: "rgba(51,51,51,0.8)",
    lineHeight: "21.79px",
    padding: "7px 24px",
    ["&:hover"]: {
      backgroundColor: "transparent",
      color: "rgba(38,187,237,1)",
    },
  },
  menuItemSelected: {
    fontSize: "16px",
    fontWeight: 600,
    padding: "10px 24px",
    color: "rgba(51,51,51,1)",
    lineHeight: "21.79px",
    ["&:hover"]: {
      backgroundColor: "transparent",
    },
  },
  formHeader: {
    width: 400,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingLeft: 24,
  },
  searchfield: {
    width: "90%",
    color: "#333",
    padding: "1rem",
    border: "1px solid #eee",
    borderRadius: 4,
    "&:focus": {
      border: "1px solid #26BBED",
      outline: "none",
    },
  },
  listroot: {
    maxHeight: "400px",
    overflow: "auto",
    width: "100%",
  },
  buttongroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  suborgcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },
  suborgcontainerr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderLeft: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },
  progressblock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  progress: {
    color: "#26BBED",
  },
}));

const CountryMenu = ({ country, countries, continentData }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [iconstroke, setIconStroke] = useState("#333");
  const [width, setWidth] = useState(undefined);

  const disabledIconStroke = "#C0C0C0";

  const classes = useStyles();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const selectCountry = (e, id) => {
    dispatch(action_selectCountry(id, continentData.selected));
    dispatch(action_selectContinent(continentData.selected));
    dispatch(action_setLoading(true));
    setTimeout(() => {
      dispatch(action_setLoading(false));
    }, 1000);
    setOpen(false);
  };

  // console.log("Country Menu has rendered");

  // console.log(countries.countries);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.root}>
        {width < 700 ? (
          <span
            className={
              continentData.selected
                ? classes.mobileBtn
                : classes.inactiveMobileBtn
            }
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={continentData.selected ? handleClick : null}
          >
            {continentData.selected
              ? continentData.continents[parseInt(continentData.selected) - 1]
                  .countries["countries"][`${countries.selected}` - 1].name
              : "Country"}
            <ExpandMore
              className={classes.dropdownicon}
              fill="none"
              onClick={handleClick}
            />
          </span>
        ) : (
          <Button
            disabled={continentData.selected ? false : true}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            disableRipple={true}
            disableFocusRipple={true}
            className={classes.btn}
            onMouseEnter={() => setIconStroke("#26BBED")}
            onMouseLeave={() => setIconStroke("#333")}
            endIcon={
              <DropdownIcon
                style={{ marginLeft: 4, marginTop: 10 }}
                stroke={
                  continentData.selected ? iconstroke : disabledIconStroke
                }
                fill="none"
              />
            }
          >
            {continentData.selected
              ? continentData.continents[parseInt(continentData.selected) - 1]
                  .countries["countries"][`${countries.selected}` - 1].name
              : "Country"}
          </Button>
        )}
        <Popper
          className={classes.menu}
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          elevation={2}
          placement="bottom-end"
        >
          <div className={classes.formHeader}></div>
          {continentData.selected ? (
            <List className={classes.listroot}>
              {countries.countries
                .sort((a, b) =>
                  a.name === b.name ? 0 : a.name > b.name ? 1 : -1
                )
                .map((country, i) => (
                  <ListItem
                    key={country.id}
                    className={classes.menuItem}
                    onClick={(event) => selectCountry(event, country.id)}
                    className={
                      countries.selected === country.id
                        ? classes.menuItemSelected
                        : classes.menuItem
                    }
                    dense
                    button
                  >
                    {country.name}
                  </ListItem>
                ))}
            </List>
          ) : null}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default CountryMenu;
