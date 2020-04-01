import React from "react";
import classes from "./Order.module.css";
const order = ({ order: { ingredients, price } }) => (
  <div className={(classes.Order)}>
    <p>
      Ingredients:
      {Object.keys(ingredients).map(ingredient => (
        <span className={classes.Order_Ingredient} key={ingredient}>
          {ingredient} ({ingredients[ingredient]})
        </span>
      ))}
    </p>

    <p>
      Price: <strong>USD {price}</strong>
    </p>
  </div>
);

export default order;
