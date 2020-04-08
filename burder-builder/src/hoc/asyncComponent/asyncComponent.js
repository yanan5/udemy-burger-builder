import React from "react";

export const asyncComponent = (importComponent) =>
  class extends React.Component {
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
