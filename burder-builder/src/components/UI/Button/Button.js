import PropTypes from "prop-types";
import React from "react";
import classes from "./Button.module.css";

const Button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  children: PropTypes.any,
  clicked: PropTypes.func.isRequired
};

export default Button;
