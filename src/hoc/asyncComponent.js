import React, { Component } from "react";

const asyncComponent = (importComponent) =>
  class extends Component {
    state = {
      component: null,
    };
    componentDidMount() {
      importComponent().then((comp) =>
        this.setState({ component: comp.default })
      );
    }
    render() {
      const { component: Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };

export default asyncComponent;
