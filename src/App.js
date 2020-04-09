import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
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
        <Route exact path="/" component={Users} />
        <Route path="/pizza" component={asyncPizza} />
      </div>
    );
  }
}

export default App;