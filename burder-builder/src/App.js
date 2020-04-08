import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "../src/actions";

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <React.Fragment>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </React.Fragment>
    );
    if (isAuthenticated) {
      routes = (
        <React.Fragment>
          <Route exact path="/" component={BurgerBuilder} />
          <Route exact path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </React.Fragment>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null,
});
const mapDispatchToProps = {
  authCheckState,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
