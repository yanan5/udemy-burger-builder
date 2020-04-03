import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { Loader } from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import { onFetchOrdersFulfilled, onFetchOrdersPending } from "../../actions/action";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrdersPending()
    axios.get("/orders.json").then(res => {
      if (res.data) {
        this.props.onFetchOrdersFulfilled(res.data);
      }
    });
  }
  render() {
    const { data, keys } = this.props;
    return (
      <Loader loading={data}>
        <div>
          {keys.map(key => (
            <Order key={key} order={data[key]} />
          ))}
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = ({ orders: { data, keys } }) => ({
  data,
  keys
});
const mapDispatchToProps = {
  onFetchOrdersFulfilled,
  onFetchOrdersPending
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
