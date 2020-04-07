import PropTypes from "prop-types";
import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle onClick={props.toggleSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated}/>
    </nav>
  </header>
);

Toolbar.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired
};

export default Toolbar;
