import React, { useState, useEffect, useCallback } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary/Auxillary";

const withErrorHandler = (Component, axiosInstance) => (props) => {
  const [error, setError] = useState(null);
  const requestInterceptor = axiosInstance.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const responseInterceptors = axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
      return error;
    }
  );
  useEffect(() => {  
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptors);
    };
  }, [requestInterceptor, responseInterceptors]);

  const closeModal = useCallback(() => setError(null), []);

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
