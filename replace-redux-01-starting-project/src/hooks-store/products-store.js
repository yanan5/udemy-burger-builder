import { initStore } from "./store";
import { initialProducts } from "../context/products-context";

const configureProductsStore = () => {
  const actions = {
    TOGGLE_FAV: (currentSates, productId) => {
      const updatedProducts = currentSates.products.map((currentState) => {
        if (currentState.id === productId) {
          return {
            ...currentState,
            isFavorite: !currentState.isFavorite,
          };
        }
        return currentState
      });
      return {
        ...currentSates,
        products: updatedProducts,
      };
    },
  };
  initStore(actions, { products: initialProducts });
};

export { configureProductsStore };
