import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  const addIngredient = (ingredient) =>
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);

  const removeIngredient = (id) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.filter(
        (ingredient) => ingredient.id !== id
      );
      return updatedIngredients;
    });
  };

  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) =>
        ingredient.title
          .toLocaleLowerCase()
          .trim()
          .indexOf(searchTitle.toLocaleLowerCase().trim()) !== -1
    );
    setFilteredIngredients(filteredIngredients)
  }, [searchTitle, ingredients])
  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient} />

      <section>
        <Search title={searchTitle} setSearchTitle={setSearchTitle} />
        {filteredIngredients.length > 0 && (
          <IngredientList
            ingredients={filteredIngredients}
            onRemoveItem={removeIngredient}
          />
        )}
      </section>
    </div>
  );
}

export default Ingredients;
