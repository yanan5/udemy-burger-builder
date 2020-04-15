import PropTypes from "prop-types";
import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxillary from "../../../hoc/Auxillary/Auxillary";

const Modal = ({
  modalClosed,
  show,
  children
}) => (
  <Auxillary>
    <Backdrop modalClosed={modalClosed} show={show} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? "translateY(0)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      {children}
    </div>
  </Auxillary>
);

Modal.propTypes = {
  children: PropTypes.any,
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    prevProps.children === nextProps.children
);
