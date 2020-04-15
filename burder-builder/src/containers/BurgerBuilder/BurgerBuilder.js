import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { withSpinner, Loader } from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import INGREDIENT_PRICES from "../../constants/constants";
import * as actions  from "../../actions";
import axios from "../../axios-orders";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector(({burger: { ingredients }}) => ingredients)
  const totalPrice = useSelector(({burger: { totalPrice }}) => totalPrice)
  const error = useSelector(({burger: { error }}) => error)
  const isAuthenticated = useSelector(({auth: { token }}) => token !== null)
  
  const onAddIngredient = (ingredient) => dispatch(actions.onAddIngredient(ingredient))
  const onDeleteIngredient = (ingredient) => dispatch(actions.onDeleteIngredient(ingredient));
  const initIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  const { history } = props;

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = ingredients
      ? Object.keys(ingredients)
          .map((igKey) => {
            return ingredients[igKey];
          })
          .reduce((sum, val) => {
            return sum + val;
          }, 0)
      : -1;
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      setAuthRedirectPath("/checkout");
      history.push("/auth");
    }
  };
  const purchaseCancelled = () => {
    setPurchasing(false);
  };
  const purchaseContinued = () => {
    history.push({
      pathname: "/checkout",
    });
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let OrderSummaryWithSpinner = withSpinner(OrderSummary, ingredients);
  let BurgerWithSpinner = withSpinner(Burger, ingredients);
  const purchasable = updatePurchaseState(ingredients);
  return (
    <Auxillary>
      {error && <p>Cannot load ingredients</p>}
      {!error && (
        <Auxillary>
          <Modal modalClosed={purchaseCancelled} show={purchasing}>
            <OrderSummaryWithSpinner
              ingredients={ingredients}
              purchaseCancelled={purchaseCancelled}
              purchaseContinued={purchaseContinued}
              price={totalPrice}
            />
          </Modal>
          <BurgerWithSpinner ingredients={ingredients} />
          <Loader loading={ingredients}>
            <BuildControls
              showOrderHandler={purchaseHandler}
              addIngredient={onAddIngredient}
              removeIngredient={onDeleteIngredient}
              disabled={disabledInfo}
              price={totalPrice}
              priceList={INGREDIENT_PRICES}
              purchasable={purchasable}
              ingredients={ingredients}
              isAuthenticated={isAuthenticated}
            />
          </Loader>
        </Auxillary>
      )}
    </Auxillary>
  );
};

export { BurgerBuilder };
export default withErrorHandler(BurgerBuilder, axios);
