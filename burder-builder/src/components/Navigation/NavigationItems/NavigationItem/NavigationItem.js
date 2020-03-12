import PropTypes from "prop-types";
import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <a className={props.active ? classes.active : null} href={props.link}>
      {props.children}
    </a>
  </li>
);

NavigationItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired
};

export default NavigationItem;
