import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { Loader } from "../../components/UI/Spinner/spinner";
import Input from "../../components/UI/Input/input";

import classes from "./ContactData.module.css";
import axios from "../../axios-orders";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        label: "Name",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        label: "Street",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        label: "Zip Code",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        label: "Country",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: ""
      },
      email: {
        elementType: "email",
        label: "Email",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        label: "Delivery",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "fastest"
            },
            {
              value: "cheapest",
              displayValue: "cheapest"
            }
          ]
        },
        value: "cheapest"
      }
    },
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const {orderForm} = this.state;
    const orderData = {};
    for (let key in orderForm) {
      orderData[key] = orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => this.setState({ loading: false }));
  };
  onChange = fieldKeyInState => e => {
    const selectedFieldValueInState = this.state.orderForm[fieldKeyInState];
    const updatedState = {
      orderForm: {
        ...this.state.orderForm,
        [fieldKeyInState]: {
          ...selectedFieldValueInState,
          value: e.target.value
        }
      }
    };
    this.setState({...updatedState});
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
        />
      );
    }
    return (
      <Loader loading={!this.state.loading}>
        <div className={classes.ContactData}>
          <h4>Enter Your Contact Data</h4>
          <form onSubmit={this.orderHandler}>
            {formFields}
            <Button btnType="Success">
              ORDER
            </Button>
          </form>
        </div>
      </Loader>
    );
  }
}

export default ContactData;
