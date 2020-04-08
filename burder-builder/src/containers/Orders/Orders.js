import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { Loader } from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import { fetchOrders } from "../../actions";

class Orders extends Component {
  componentDidMount() {
    const {token, userId} = this.props;
    this.props.fetchOrders(token, userId);
  }
  render() {
    const { data, keys } = this.props;
    return (
      <Loader loading={data}>
        <div>
          {keys.map((key) => (
            <Order key={key} order={data[key]} />
          ))}
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = ({ orders: { data, keys }, auth: { token, userId } }) => ({
  data,
  keys,
  token,
  userId
});
const mapDispatchToProps = {
  fetchOrders,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
