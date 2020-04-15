import React, { useCallback, useReducer, useEffect } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from '../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return [...currentIngredients, action.ingredient];
    case "DELETE_INGREDIENT":
      return currentIngredients.filter(
        (ingredient) => ingredient.id !== action.id
      );
    case "SET_INGREDIENTS":
      return action.ingredients;
    default:
      throw new Error("ingredientReducer Error");
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, sendRequest, clear] = useHttp();
  const {
    isLoading,
    data,
    error,
    meta
  } = httpState;

  useEffect(() => {
    if(!isLoading && !error && meta && meta.type === 'DELETE_INGREDIENT') {
      dispatch({
        type: meta.type,
        id: meta.value,
      });
    }
  }, [meta, error, isLoading])
  useEffect(() => {
    if(!isLoading && !error && data && meta && meta.type === 'ADD_INGREDIENT') {
      dispatch({
        type: meta.type,
        ingredient: {
          ...meta.value,
          id: data.name
        }
      })
    }
  }, [data, meta, error, isLoading])

  const addIngredient = useCallback((ingredient) => {    
    sendRequest(
      "https://react-hooks-update-3be73.firebaseio.com/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      {
        type: 'ADD_INGREDIENT',
        value: ingredient
      }
    )    
  }, [sendRequest]);

  const removeIngredient = useCallback(id => {
    sendRequest(
      `https://react-hooks-update-3be73.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      null,
      {
        type: 'DELETE_INGREDIENT',
        value: id
      }
    )
  }, [sendRequest]);

  const setFilteredIngredients = useCallback((filteredIngredients) =>
    dispatch({
      type: "SET_INGREDIENTS",
      ingredients: filteredIngredients,
    })
  ,[]);

  const clearError = useCallback(() => {
    clear()
  }, [clear]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm addIngredient={addIngredient} isLoading={isLoading && meta && meta.type === 'ADD_INGREDIENT'} />

      <section>
        <Search setFilteredIngredients={setFilteredIngredients} />
        {ingredients && ingredients.length > 0 && (
          <IngredientList
            ingredients={ingredients}
            onRemoveItem={removeIngredient}
            isAdding={isLoading && meta && meta.type === 'ADD_INGREDIENT'}
            deleteId={meta && meta.type === 'DELETE_INGREDIENT' && meta.value}
          />
        )}
      </section>
    </div>
  );
}

export default Ingredients;
