import PropTypes from "prop-types";
import React from "react";
import classes from "./DrawerToggle.module.css";
const drawerToggle = props => {
  return (
    <div className={classes.DrawerToggle} onClick={props.onClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

drawerToggle.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default drawerToggle;
