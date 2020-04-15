import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import Auxillary from "../Auxillary/Auxillary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const { children, isAuthenticated } = props;
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = useCallback(() => setShowSideDrawer(false));

  const toggleSideDrawer = useCallback(() => setShowSideDrawer(!showSideDrawer));

  return (
    <Auxillary>
      <Toolbar
        isAuthenticated={isAuthenticated}
        toggleSideDrawer={toggleSideDrawer}
      />
      <SideDrawer
        isAuthenticated={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>{children}</main>
    </Auxillary>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});
export default connect(mapStateToProps, null)(Layout);
