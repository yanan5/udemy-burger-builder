import PropTypes from "prop-types";
import React from "react";
import Auxillary from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span
        style={{
          textTransform: "capitalize"
        }}
      >
        {igKey}
      </span>
      :{props.ingredients[igKey]}
    </li>
  ));
  return (
    <Auxillary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout</p>
      <Button btnType="Danger" onClick={props.purchaseCancelled}>
        CANCEL
      </Button>
        <Button btnType="Success" onClick={props.purchaseContinued}>
          CONTINUE
        </Button>
    </Auxillary>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired
};

export default OrderSummary;
