import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [error, setError] = useState();

  const addIngredient = (ingredient) => {
    setIsAdding(true);
    setIsLoading(true);
    fetch("https://react-hooks-update-3be73.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { ...ingredient, id: data.name },
        ]);
        setIsAdding(false);
        setIsLoading(false);
      });
  };

  const removeIngredient = (id) => {
    setDeleteId(id);
    fetch(
      `https://react-hooks-update-3be73.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        setIngredients((prevIngredients) =>
          prevIngredients.filter((ingredient) => ingredient.id !== id)
        );
        setDeleteId('');
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
        setDeleteId('');
      });
  };

  const setFilteredIngredients = useCallback(
    (filteredIngredients) => setIngredients(filteredIngredients),
    [setIngredients]
  );

  const clearError = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm addIngredient={addIngredient} isLoading={isLoading} />

      <section>
        <Search setFilteredIngredients={setFilteredIngredients} />
        {ingredients.length > 0 && (
          <IngredientList
            ingredients={ingredients}
            onRemoveItem={removeIngredient}
            isAdding={isAdding}
            deleteId={deleteId}
          />
        )}
      </section>
    </div>
  );
}

export default Ingredients;
