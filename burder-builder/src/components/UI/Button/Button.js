import PropTypes from "prop-types";
import React from "react";
import classes from "./Button.module.css";

const Button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  clicked: () => {}
}
Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  children: PropTypes.any,
  clicked: PropTypes.func
};

export default Button;
