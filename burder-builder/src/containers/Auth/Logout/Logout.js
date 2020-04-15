import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../../actions";
import { connect } from "react-redux";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/" />;
};

export default connect(null, { logout })(Logout);
