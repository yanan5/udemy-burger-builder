import React, { useCallback, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

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
const httpInitialState = {
  isLoading: false,
  isAdding: false,
  deleteId: '',
  error: null
}
const httpReducer = (httpReducer, action) => {
  console.log(httpReducer, action)
  switch(action.type) {
    case 'SEND':
      return {
        ...httpReducer,
        isAdding : true,
        isLoading: true
      }
    case 'RESPONSE':
      return {
        ...httpReducer,
        isAdding: false,
        isLoading: false
      }
    case 'ERROR':      
      return {
        ...httpReducer,
        isLoading: false,
        isAdding: false,
        deleteId: '',
        error: action.error
      }
    case 'ADD_INGREDIENT':
      return {
        ...httpReducer,
        isAdding : true,
        deleteId: ''
      }
    case 'DELETE':
      return {
        ...httpReducer,
        isAdding : false,
        deleteId: action.id
      }
    case 'CLEAR_DELETE':
      return {
        ...httpReducer,
        isAdding : false,
        deleteId: action.id
      }
    default:
      throw new Error("http Reducer Error");
  }
}
function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredients, setIngredients] = useState([]);
  const [httpState, dispatchHttp] = useReducer(httpReducer, httpInitialState);
  const {
    isLoading,
    isAdding,
    deleteId,
    error
  } = httpState;

  const addIngredient = useCallback((ingredient) => {    
    dispatchHttp({
      type: 'SEND'
    });
    fetch("https://react-hooks-update-3be73.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "ADD_INGREDIENT",
          ingredient: {
            ...ingredient,
            id: data.name,
          },
        });
        dispatchHttp({
          type: 'RESPONSE'
        });
      });
  }, []);

  const removeIngredient = useCallback(id => {
    dispatchHttp({
      type: 'DELETE',
      id
    })
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
        dispatch({
          type: "DELETE_INGREDIENT",
          id,
        });

        dispatchHttp({
          type: 'CLEAR_DELETE'
        })
      })
      .catch((e) => {
        dispatchHttp({
          type: 'ERROR',
          error:e
        })
        dispatchHttp({
          type: 'CLEAR_DELETE'
        })
      });
  }, []);

  const setFilteredIngredients = useCallback((filteredIngredients) =>
    dispatch({
      type: "SET_INGREDIENTS",
      ingredients: filteredIngredients,
    })
  ,[]);

  const clearError = () => {
    dispatchHttp({
      type: 'CLEAR_ERROR'
    })
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
