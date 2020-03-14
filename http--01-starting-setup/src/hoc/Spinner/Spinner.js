import React from "react";
import "./Spinner.css";

const Spinner = props => <div class="loader">Loading...</div>;

const withSpinner = (Component, spinnerState) => props =>
  Boolean(spinnerState) ? <Component {...props} /> : <Spinner />;

export { withSpinner };
export default Spinner;
