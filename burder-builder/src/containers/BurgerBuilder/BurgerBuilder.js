import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Auxillary from "../../hoc/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    },
    totalPrice: 4.6,
    purchasable: false,
    purchasing: false
  };

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
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    const { ingredients } = this.state;
    return (
      <Auxillary>
        <Modal
          modalClosed={this.purchaseCancelled}
          show={this.state.purchasing}
        >
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          showOrderHandler={this.purchaseHandler}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          priceList={INGREDIENT_PRICES}
          purchasable={this.state.purchasable}
          ingredients={ingredients}
        />
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
