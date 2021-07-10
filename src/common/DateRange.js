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
// import { useDispatch, useSelector } from "react-redux";
// import { action_apiRunQery } from "../store/generalactions";
// import allorgs from "../bigQuery/getAllOrgs";
import SvgIcon from "@material-ui/core/SvgIcon";
import { DropdownIcon } from "../constants/svgicons";

// import {
//   action_addOrgs,
//   action_selectOrg,
//   action_selectAllOrgs,
//   action_clearAllOrgs,
// } from "../store/org";
// import { action_orgLoadingSwitch } from "../store/uilayer";
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
    width: "fit-content",
    ["&:hover"]: {
      backgroundColor: "#fff",
      color: "rgba(38, 187, 237, 1)",
    },
    textTransform: "none",
    whiteSpace: "nowrap",
    // border: "1px solid red",
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
    width: 200,
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
    fontSize: "1.6rem",
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

const DateRange = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [iconstroke, setIconStroke] = useState("#C0C0C0");

  // const dispatch = useDispatch();

  const dateData = [
    { dateName: "Last Week", dateId: "1" },
    { dateName: "Last 2 Weeks	", dateId: "2" },
    { dateName: "This Month", dateId: "3" },
    { dateName: "Last Month", dateId: "4" },
    { dateName: "This Quarter", dateId: "5" },
    { dateName: "Last Quarter", dateId: "6" },
    { dateName: "This Year", dateId: "7" },
    { dateName: "Last Year", dateId: "8" },
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
          disabled
          aria-controls="simpRange"
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
          Select Date Range
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
            {dateData.map((date) => (
              <ListItem
                key={date.dateName}
                className={classes.menuItem}
                //   onClick={(event) => orgselected(event, date.dateId)}
                //   className={
                //     dateData.selected.includes(date.dateId)
                //       ? classes.menuItemSelected
                //       : classes.menuItem
                //   }
                dense
                button
              >
                {date.dateName}
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

export default DateRange;
