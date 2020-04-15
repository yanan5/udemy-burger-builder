import React, {useCallback} from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Loader } from "../../components/UI/Spinner/spinner";
import { connect } from "react-redux";
import ContactData from "../ContactData/ContactData";

const Checkout = props => {
  const { ingredients, history, match } = props;
  const checkoutCancelledHandler = useCallback(() => {
    history.goBack();
  }, [history]);
  const checkoutContinuedHandler = useCallback(() => {
    history.replace("/checkout/contact-data");
  }, [history]);
  
   
    const summary = ingredients ? (
      <Loader loading={ingredients}>
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={ingredients}
        />
        ]
        <Route
          exact
          path={`${match.path}/contact-data`}
          component={ContactData}
        />
      </Loader>
    ) : (
      <Redirect to="/" />
    );
    return <div>{summary}</div>;
  
}

const mapStateToProps = ({ burger: { ingredients } }) => ({
  ingredients,
});
export default connect(mapStateToProps, null)(Checkout);
