import React from "react";
import { Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div>
      <Layout>
        <Route exact path="/" component={BurgerBuilder} />
        <Route exact path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
      </Layout>
    </div>
  );
}

export default App;
