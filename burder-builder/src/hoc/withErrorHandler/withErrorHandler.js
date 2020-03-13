import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary/Auxillary";
const withErrorHandler = (Component, axiosInstance) =>
  class extends React.Component {
    state = {
      error: false
    };
    constructor(props) {
      super(props);
      this.requestInterceptor = axiosInstance.interceptors.request.use(req => {
        this.setState({ error: false });
        return req;
      });
      this.responseInterceptors = axiosInstance.interceptors.response.use(
        res => res,
        error => this.setState({ error })
      );
    }
    componentWillUnmount() {
      axiosInstance.interceptors.request.eject(this.requestInterceptor);
      axiosInstance.interceptors.response.eject(this.responseInterceptors);
    }
    closeModal = () => this.setState({ error: false });
    render() {
      return (
        <Aux>
          <Modal show={Boolean(this.state.error)} modalClosed={this.closeModal}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Component {...this.props} />
        </Aux>
      );
    }
  };

export default withErrorHandler;
