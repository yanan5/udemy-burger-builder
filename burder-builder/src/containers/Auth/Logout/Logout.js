import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../../actions";
import { connect } from "react-redux";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

export default connect(null, { logout })(Logout);
