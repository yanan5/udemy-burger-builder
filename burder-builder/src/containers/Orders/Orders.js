import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { Loader } from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: null,
    orderKeys: []
  };
  componentDidMount() {
    axios.get("/orders.json").then(res => {
      if (res.data) {
        this.setState({
          orders: res.data,
          orderKeys: Object.keys(res.data)
        });
      }
    });
  }
  render() {
    return (
      <Loader loading={this.state.orders}>
        <div>
          <Order />
          <Order />
        </div>
      </Loader>
    );
  }
}

export default withErrorHandler(Orders, axios);
