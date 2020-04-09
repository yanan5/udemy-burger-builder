import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Users from "./containers/Users";
import asyncComponent from "./hoc/asyncComponent";

const asyncPizza = asyncComponent(() => import("./containers/Pizza"));
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link>
          <Link to="/pizza">Pizza</Link>
        </div>
        <Switch>
        <Route path="/pizza" component={asyncPizza} />
        <Route path="/" component={Users} />
        </Switch>
      </div>
    );
  }
}

export default App;