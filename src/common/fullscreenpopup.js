import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import FullScreenLine from "./fullscreenlinegraph";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #eee",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "#333",
  },
  closeicon: {
    color: "#333",

    minWidth: 40,
    fontSize: "2.4rem",
  },
  container: { width: "100%", height: "90%" },
  barcontainer: { width: "100%", height: "auto" },
}));

const FullScreenItem = (props) => {
  if (props.line) {
    console.log(props.data);
    return (
      <FullScreenLine
        data={props.data}
        x="date"
        y="confirmed"
        color="green"
        noDecimalLeft
      />
    );
  }
};

const FullScreenDialog = (props) => {
  let length = (props.data || []).length;
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
              className={classes.closeicon}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h2" className={classes.title}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          className={props.line ? classes.container : classes.barcontainer}
          style={
            props.line ? {} : { height: length * (length > 12 ? 40 : 60) + 105 }
          }
          container
        >
          <FullScreenItem {...props} />
        </Grid>
      </Dialog>
    </div>
  );
};

export default FullScreenDialog;
