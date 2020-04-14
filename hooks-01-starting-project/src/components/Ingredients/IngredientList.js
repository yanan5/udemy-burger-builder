import React from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientList.css";

const IngredientList = React.memo(props => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig) => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            {ig.id === props.deleteId && <div className="isDeleting"></div>}
            <span>{ig.title}</span>
            <span>
              {ig.amount}
              <span className="remove">x</span>
            </span>
          </li>
        ))}
        {props.isAdding && (
          <li>
            <LoadingIndicator />
          </li>
        )}
      </ul>
    </section>
  );
});

export default IngredientList;
