import PropTypes from "prop-types";
import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxillary from "../../../hoc/Auxillary";

const Modal = props => (
  <Auxillary>
    <Backdrop modalClosed={props.modalClosed} show={props.show} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Auxillary>
);

Modal.propTypes = {
  children: PropTypes.any,
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default Modal;
