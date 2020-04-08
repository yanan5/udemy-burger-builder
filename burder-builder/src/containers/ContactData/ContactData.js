import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { Loader } from "../../components/UI/Spinner/spinner";
import Input from "../../components/UI/Input/input";
import { connect } from "react-redux";
import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { saveOrder } from "../../actions";
import { checkValidity } from '../../shared/utility';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        label: "Name",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        label: "Street",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        label: "Zip Code",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        label: "Country",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "email",
        label: "Email",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        label: "Delivery",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "fastest",
            },
            {
              value: "cheapest",
              displayValue: "cheapest",
            },
          ],
        },
        value: "cheapest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };
  orderHandler = (e) => {
    e.preventDefault();
    const { orderForm } = this.state;
    const {ingredients, totalPrice, userId} = this.props;
    const orderData = {};
    for (let key in orderForm) {
      orderData[key] = orderForm[key].value;
    }
    const order = {
      ingredients,
      price: totalPrice,
      orderData,
      userId
    };
    this.props.saveOrder(order, this.props.token);
  };
  onChange = (fieldKeyInState) => (e) => {
    const selectedFieldValueInState = this.state.orderForm[fieldKeyInState];
    const updatedState = {
      orderForm: {
        ...this.state.orderForm,
        [fieldKeyInState]: {
          ...selectedFieldValueInState,
          value: e.target.value,
          valid: checkValidity(
            e.target.value,
            selectedFieldValueInState.validation
          ),
          touched: true,
        },
      },
    };
    let formIsValid = true;
    for (let fieldKey in updatedState.orderForm) {
      formIsValid = updatedState.orderForm[fieldKey].valid && formIsValid;
    }
    this.setState({ ...updatedState, formIsValid });
  };
  
  render() {
    const { orderForm } = this.state;
    const formFields = [];
    for (let fieldKey in orderForm) {
      const fieldValue = orderForm[fieldKey];
      formFields.push(
        <Input
          key={fieldKey}
          {...fieldValue}
          onChange={this.onChange(fieldKey)}
          shouldValidate={fieldValue.validation}
          invalid={!fieldValue.valid}
          touched={fieldValue.touched}
        />
      );
    }
    return (
      <Loader loading={!this.props.loading}>
        <div className={classes.ContactData}>
          <h4>Enter Your Contact Data</h4>
          <form onSubmit={this.orderHandler}>
            {formFields}
            <Button disabled={!this.state.formIsValid} btnType="Success">
              ORDER
            </Button>
          </form>
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = ({
  burger: { ingredients, totalPrice, loading },
  auth: { token, userId },
}) => ({
  ingredients,
  totalPrice,
  loading,
  token,
  userId
});
const mapDispatchToProps = {
  saveOrder,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
