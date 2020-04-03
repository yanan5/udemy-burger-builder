import React from "react";
import classes from "./Order.module.css";
const order = props => {
  const {
    order: { ingredients, price }
  } = props;
  const {
    order: {
      orderData: { name, zipCode, email, country, deliveryMethod }
    }
  } = props;
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {Object.keys(ingredients).map(ingredient => (
          <span className={classes.Order_Ingredient} key={ingredient}>
            {ingredient} ({ingredients[ingredient]})
          </span>
        ))}
      </p>
      <div>Customer:</div>
      <table>
        <tbody>
          <tr>
            <td>Name: </td>
            <td><span className={classes.Order_Ingredient}>{name}</span></td>
          </tr>
          <tr>
            <td>ZipCode:</td>
            <td><span className={classes.Order_Ingredient}>{zipCode}</span></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><span className={classes.Order_Ingredient}>{email}</span></td>
          </tr>
          <tr>
            <td>Country:</td>
            <td><span className={classes.Order_Ingredient}>{country}</span></td>
          </tr>
          <tr>
            <td>DeliveryMethod:</td>
            <td><span className={classes.Order_Ingredient}>{deliveryMethod}</span></td>
          </tr>
        </tbody>
      </table>      
      <p>
        Price: <strong>USD {price}</strong>
      </p>
    </div>
  );
};

export default order;
