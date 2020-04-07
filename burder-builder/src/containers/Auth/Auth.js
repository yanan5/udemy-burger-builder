import React, { Component } from "react";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { auth } from "../../actions/action";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import Spinner from "../../components/UI/Spinner/spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        label: "Email",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
          autoComplete: 'on'
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        label: "Password",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          autoComplete: 'on'
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isEmail) {
      const emailRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      isValid = value.match(emailRule) && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  onChange = (fieldNameInState) => (e) => {
    const fieldValueInState = this.state.controls[fieldNameInState];
    const updatedState = {
      controls: {
        ...this.state.controls,
        [fieldNameInState]: {
          ...fieldValueInState,
          value: e.target.value,
          valid: this.checkValidity(
            e.target.value,
            fieldValueInState.validation
          ),
          touched: true,
        },
      },
    };
    let formIsValid = true;
    for (let fieldKey in updatedState.controls) {
      formIsValid = updatedState.controls[fieldKey].valid && formIsValid;
    }
    this.setState({ ...updatedState, formIsValid });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    const { controls, isSignUp } = this.state;
    const {
      email: { value: emailVal },
      password: { value: passwordVal },
    } = controls;
    this.props.auth(emailVal, passwordVal, isSignUp);
  };
  onSwitchSignInHandler = (e) => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };
  render() {
    const { controls } = this.state;
    const { loading, error, isAuthenticated } = this.props;
    const formFields = [];
    for (let fieldKey in controls) {
      const fieldValue = controls[fieldKey];
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
    const formOrSpinnerComp = loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.onSubmitHandler}>
        {formFields}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );
    let errorMessage = null;
    if (error) {
      errorMessage= <p style={{
        backgroundColor: 'red',
        color: '#FFF'
      }}>{error.message}</p>
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {formOrSpinnerComp}
        <Button btnType="Danger" onClick={this.onSwitchSignInHandler}>
          Switch To {this.state.isSignUp ? "SignIn" : "SignUp"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { loading, error, token } }) => ({
  loading,
  error,
  isAuthenticated: token !== null
});
const mapDispatchToProps = {
  auth,
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
