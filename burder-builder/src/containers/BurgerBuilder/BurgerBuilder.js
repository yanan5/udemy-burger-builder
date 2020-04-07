import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { withSpinner, Loader } from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import INGREDIENT_PRICES from "../../constants/constants";
import { connect } from "react-redux";
import {
  onAddIngredient,
  onDeleteIngredient,
  initIngredients,
  setAuthRedirectPath
} from "../../actions";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState(ingredients) {
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
  }
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push("/auth");
    }
  };
  purchaseCancelled = () => {
    this.setState({
      purchasing: false,
    });
  };
  purchaseContinued = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };
  render() {
    const { purchasing } = this.state;
    const {
      ingredients,
      totalPrice,
      onAddIngredient,
      onDeleteIngredient,
      error,
      isAuthenticated,
    } = this.props;
    const disabledInfo = {
      ...ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let OrderSummaryWithSpinner = withSpinner(OrderSummary, ingredients);
    let BurgerWithSpinner = withSpinner(Burger, ingredients);
    const purchasable = this.updatePurchaseState(ingredients);
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
  }
}

const mapStateToProps = ({
  burger: { ingredients, totalPrice, error },
  auth: { token },
}) => ({
  ingredients,
  totalPrice,
  error,
  isAuthenticated: token !== null,
});
const mapDispatchToProps = {
  onAddIngredient,
  onDeleteIngredient,
  initIngredients,
  setAuthRedirectPath
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
