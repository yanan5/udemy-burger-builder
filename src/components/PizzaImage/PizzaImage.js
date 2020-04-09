import React from "react";
import classes from "./PizzaImage.css";
import PizzaImage from "../../assets/pizza.jpg";

const pizzaImage = (props) => (
  <div className={classes.PizzaImage}>
    <img className={classes.PizzaImg} src={PizzaImage} />
  </div>
);

export default pizzaImage;
