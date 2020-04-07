import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Loader } from "../../components/UI/Spinner/spinner";
import { connect } from "react-redux";
import ContactData from "../ContactData/ContactData";
class Checkout extends React.Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    const { ingredients } = this.props;
    const summary = ingredients ? (
      <Loader loading={ingredients}>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={ingredients}
        />
        ]
        <Route
          exact
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </Loader>
    ) : (
      <Redirect to="/" />
    );
    return <div>{summary}</div>;
  }
}

const mapStateToProps = ({ burger: { ingredients } }) => ({
  ingredients,
});
export default connect(mapStateToProps, null)(Checkout);
