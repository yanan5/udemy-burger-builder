import React from "react";
import { Route, withRouter } from "react-router-dom";
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
    this.props.authCheckState()
  }
  render() {
    return (
      <div>
        <Layout>
          <Route exact path="/" component={BurgerBuilder} />
          <Route exact path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = {
  authCheckState,
};
export default withRouter(connect(null, mapDispatchToProps)(App));
