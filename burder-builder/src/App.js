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
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" render={(props) => <BurgerBuilder {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" render={(props) => <BurgerBuilder {...props} />} />
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
