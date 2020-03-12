import PropTypes from "prop-types";
import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = props =>
  props.show ? (
    <div onClick={props.modalClosed} className={classes.Backdrop}></div>
  ) : null;

Backdrop.propTypes = {
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default Backdrop;
