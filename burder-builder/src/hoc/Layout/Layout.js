import PropTypes from "prop-types";
import React from "react";
import {connect} from 'react-redux';
import Auxillary from "../Auxillary/Auxillary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => this.setState({ showSideDrawer: false });

  toggleSideDrawer = () =>
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  render() {
    const { children } = this.props;
    return (
      <Auxillary>
        <Toolbar 
          isAuthenticated={this.props.isAuthenticated}
          toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{children}</main>
      </Auxillary>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.token !== null
})
export default connect(mapStateToProps, null)(Layout)