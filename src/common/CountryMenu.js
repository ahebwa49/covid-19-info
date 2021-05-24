import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch, useSelector } from "react-redux";
import SvgIcon from "@material-ui/core/SvgIcon";
import { DropdownIcon } from "../constants/svgicons";
import { Radio } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    textTransform: "none",
  },
  btn: {
    fontSize: "16px",
    width: "100%",
    ["&:hover"]: {
      backgroundColor: "#fff",
      color: "rgba(38, 187, 237, 1)",
    },
    textTransform: "none",
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
    zIndex: 5,
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

const CountryMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [iconstroke, setIconStroke] = useState("#333");

  const countryData = [
    { countryName: "Afghanistan", countryId: "1" },
    { countryName: "Albania	", countryId: "2" },
    { countryName: "Algeria", countryId: "3" },
    { countryName: "Andorra", countryId: "4" },
    { countryName: "Angola", countryId: "5" },
    { countryName: "Antigua and Barbuda", countryId: "6" },
    { countryName: "Armenia", countryId: "8" },
    { countryName: "Argentina", countryId: "7" },
    { countryName: "Australia", countryId: "9" },
    { countryName: "Austria", countryId: "10" },
    { countryName: "Azerbaijan", countryId: "11" },
    { countryName: "Bahamas	", countryId: "12" },
    { countryName: "Bahrain", countryId: "13" },
    { countryName: "Bangladesh", countryId: "14" },
    { countryName: "Barbados", countryId: "15" },
    { countryName: "Belarus", countryId: "16" },
  ];
  // const loadingState = useSelector((state) => state.UI.orgLoading);
  useEffect(() => {
    //call orgs here
  }, []);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const orgselected = (e, org) => {
    // dispatch(action_selectOrg({ orgid: org }));
    setOpen(false);
  };

  // const selectAllOrgs = () => {
  //   dispatch(action_selectAllOrgs());
  // };

  // const clearAllOrgs = () => {
  //   dispatch(action_clearAllOrgs());
  // };

  //   const getSelectedOrgName = () => {
  //     if (orgData.selected.length < 1) {
  //       return "Select Org";
  //     } else {
  //       let selectedOrgname = orgData.ById[orgData.selected[0]].orgName;
  //       if (orgData.selected.length > 1) return selectedOrgname + " ...";
  //       else return selectedOrgname;
  //     }
  //   };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.root}>
        <Button
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
              stroke={iconstroke}
              fill="none"
            />
          }
        >
          Country
        </Button>
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
          {/* {loadingState ? (
            <div className={classes.progressblock}>
              <CircularProgress className={classes.progress} />
            </div>
          ) : ( */}
          <List className={classes.listroot}>
            {countryData
              .sort((a, b) =>
                a.countryName === b.countryName
                  ? 0
                  : a.countryName > b.countryName
                  ? 1
                  : -1
              )
              .map((country) => (
                <ListItem
                  key={country.countryName}
                  className={classes.menuItem}
                  //   onClick={(event) => orgselected(event, country.countryId)}
                  //   className={
                  //     countryData.selected.includes(country.countryId)
                  //       ? classes.menuItemSelected
                  //       : classes.menuItem
                  //   }
                  dense
                  button
                >
                  {country.countryName}
                </ListItem>
              ))}
          </List>
          {/* )} */}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

const BlueCheckbox = withStyles({
  root: {
    color: "#26BBED",
    "&$checked": {
      color: "#26BBED",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default CountryMenu;
