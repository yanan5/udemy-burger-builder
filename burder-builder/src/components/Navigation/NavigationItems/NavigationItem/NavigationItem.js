import PropTypes from "prop-types";
import React from "react";
import {NavLink} from 'react-router-dom';
import classes from "./NavigationItem.module.css";

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink exact activeClassName={classes.active} to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired
};

export default NavigationItem;
