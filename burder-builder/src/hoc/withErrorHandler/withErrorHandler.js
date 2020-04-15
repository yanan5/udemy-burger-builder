import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary/Auxillary";
import useAxiosErrorHandler from "../../hooks/axios-error-handler";

const withErrorHandler = (Component, axiosInstance) => (props) => {
  const [error, closeModal] = useAxiosErrorHandler(axiosInstance);

  return (
    <Aux>
      <Modal show={Boolean(error)} modalClosed={closeModal}>
        {error ? error.message : null}
      </Modal>
      <Component {...props} />
    </Aux>
  );
};

export default withErrorHandler;
