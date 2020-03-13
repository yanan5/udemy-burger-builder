import React from "react";
import classes from "./spinner.module.css";

const Spinner = props => <div className={classes.loader}>Loading...</div>;

const withSpinner = (Component, spinnerState) => props =>
  Boolean(spinnerState) ? <Component {...props} /> : <Spinner />;

const Loader = props => (Boolean(props.loading) ? props.children : <Spinner />);

export default Spinner;
export { withSpinner, Loader };
