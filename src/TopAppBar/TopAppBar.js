import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "3rem",
  },
  toolBar: {
    height: "3rem",
    minHeight: "3rem",
  },
  title: {
    color: "white",
    textDecoration: "none",
  },
}));

const TopAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={clsx(classes.appBar)}>
      <Toolbar className={classes.toolBar}>
        <Typography component={NavLink} to="/" exact className={classes.title}>
          Do Task
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
