import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Loader } from "../../components/UI/Spinner/spinner";
import ContactData from "../ContactData/ContactData";
class Checkout extends React.Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = parseInt(param[1], 10);
      }
    }
    this.setState({
      ingredients,
      totalPrice: price
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
          ]
          <Route
            exact
            path={`${this.props.match.path}/contact-data`}
            render={props => (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                {...props}
              />
            )}
          />
        </Loader>
      </div>
    );
  }
}

export default Checkout;
