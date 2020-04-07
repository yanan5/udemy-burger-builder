import React from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../../actions";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, { logout })(Logout);
