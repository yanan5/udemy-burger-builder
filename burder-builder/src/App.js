import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "../src/actions";
import {asyncComponent} from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncBurgerBuilder = asyncComponent(() => import('./containers/BurgerBuilder/BurgerBuilder'));

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={asyncBurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />          
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={asyncBurgerBuilder} />
          <Redirect to="/" />
        </Switch>
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
export default (connect(mapStateToProps, mapDispatchToProps)(App));
