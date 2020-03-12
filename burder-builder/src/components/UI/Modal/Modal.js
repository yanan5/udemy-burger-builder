import PropTypes from "prop-types";
import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxillary from "../../../hoc/Auxillary";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }
  
  render() {
    return (
      <Auxillary>
        <Backdrop modalClosed={this.props.modalClosed} show={this.props.show} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxillary>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.any,
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default Modal;
