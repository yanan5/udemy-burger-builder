import React from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

export default class Layout extends React.Component {
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
        <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{children}</main>
      </Auxillary>
    );
  }
}
