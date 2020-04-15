import React, { useEffect, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "../src/actions";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const BurgerBuilder = React.lazy(() =>
  import("./containers/BurgerBuilder/BurgerBuilder")
);

const App = (props) => {
  const { authCheckState, isAuthenticated } = props;
  useEffect(() => {
    authCheckState();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" render={() => <BurgerBuilder />} />
      <Redirect to="/" />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/" render={() => <BurgerBuilder />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading....</div>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};
const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null,
});
const mapDispatchToProps = {
  authCheckState,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
