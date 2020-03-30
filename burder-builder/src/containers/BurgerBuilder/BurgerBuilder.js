import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import { withSpinner, Loader } from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.6,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(res => this.setState({ ingredients: res.data }))
      .catch(error => this.setState({ error }));
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, val) => {
        return sum + val;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelled = () => {
    this.setState({
      purchasing: false
    });
  };
  purchaseContinued = () => {   
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    })
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    const {
      ingredients,
      error,
      totalPrice,
      purchasing,
      purchasable
    } = this.state;
    let OrderSummaryWithSpinner = withSpinner(OrderSummary, ingredients);
    let BurgerWithSpinner = withSpinner(Burger, ingredients);
    return (
      <Auxillary>
        {error && <p>Cannot load ingredients</p>}
        {!error && (
          <Auxillary>
            <Modal modalClosed={this.purchaseCancelled} show={purchasing}>
              <OrderSummaryWithSpinner
                ingredients={ingredients}
                purchaseCancelled={this.purchaseCancelled}
                purchaseContinued={this.purchaseContinued}
                price={totalPrice}
              />
            </Modal>
            <BurgerWithSpinner ingredients={ingredients} />
            <Loader loading={ingredients}>
              <BuildControls
                showOrderHandler={this.purchaseHandler}
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={totalPrice}
                priceList={INGREDIENT_PRICES}
                purchasable={purchasable}
                ingredients={ingredients}
              />
            </Loader>
          </Auxillary>
        )}
      </Auxillary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
