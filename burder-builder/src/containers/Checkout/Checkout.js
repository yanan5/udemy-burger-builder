import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Loader } from "../../components/UI/Spinner/spinner";
class Checkout extends React.Component {
  state = {
    ingredients: null
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = parseInt(param[1], 10);
    }
    this.setState({
      ingredients
    });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <Loader loading={this.state.ingredients}>
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.state.ingredients}
          />
        </Loader>
      </div>
    );
  }
}

export default Checkout;
