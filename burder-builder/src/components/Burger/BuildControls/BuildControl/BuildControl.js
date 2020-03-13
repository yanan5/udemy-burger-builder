import PropTypes from "prop-types";
import React from "react";
import classes from "./BuildControl.module.css";
const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      {/* <div>{props.price}</div> */}
      <div className={classes.Label}>{props.label}</div>
      <button disabled={props.disabled} onClick={props.remove} className={classes.Less}>
        Less
      </button>
      <button  onClick={props.add} className={classes.More}>
        More
      </button>
      {/* <div>{props.count}</div>
      <div>{'==='}</div>
      <div>{(props.count * props.price).toFixed(2)}</div> */}
    </div>
  );
};

BuildControl.defaultProps = {
  disabled: false
}
BuildControl.propTypes = {
  add: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
}

export default BuildControl;
