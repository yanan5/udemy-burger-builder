import PropTypes from "prop-types";
import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
  const { ingredients } = props;
  const transformedIngredients = Object.keys(ingredients)
    .map(ingredient =>
      [...Array(ingredients[ingredient])].map((_, idx) => (
        <BurgerIngredients key={ingredient + idx} type={ingredient} />
      ))
    )
    .reduce((prev, curr) => prev.concat(curr), []);
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients.length === 0 ? (
        <p>Please enter ingredients</p>
      ) : (
        transformedIngredients
      )}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default Burger;
