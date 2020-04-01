import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { Loader } from "../../components/UI/Spinner/spinner";
import Input from "../../components/UI/Input/input";

import classes from "./ContactData.module.css";
import axios from "../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max Schwarzmuller",
        address: {
          street: "Teststreet 1",
          zipCode: "239034",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => this.setState({ loading: false }));
  };
  render() {
    return (
      <Loader loading={!this.state.loading}>
        <div className={classes.ContactData}>
          <h4>Enter Your Contact Data</h4>
          <form>
            <Input
              input_type="input"
              label="Name"
              type="text"
              name="name"
              placeholder="Your Name"
            />
            <Input
              input_type="input"              
              label="Email"
              type="email"
              name="Email"
              placeholder="Your email"
            />
            <Input
              input_type="input"
              label="Street"
              type="text"
              name="street"
              placeholder="Your Street"
            />
            <Input
              input_type="input"
              label="Postal Code"
              type="text"
              name="postal"
              placeholder="Your Postal Code"
            />
            <Button btnType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        </div>
      </Loader>
    );
  }
}

export default ContactData;
