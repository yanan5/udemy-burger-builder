import React, { useState } from "react";
import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");  
  const { isLoading } = props;

  const submitHandler = (event) => {
    event.preventDefault();
    if (title !== "" && amount !== "") {
      props.addIngredient({ title, amount });
    }

    // ...
  };
  
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="ingredient-form__actions">
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <button type="submit">Add Ingredient</button>
            )}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
