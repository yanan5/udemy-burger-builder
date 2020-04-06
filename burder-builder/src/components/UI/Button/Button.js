import PropTypes from "prop-types";
import React from "react";
import classes from "./Button.module.css";

const Button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  onClick: () => {}
}
Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  children: PropTypes.any,
  onClick: PropTypes.func
};

export default Button;
