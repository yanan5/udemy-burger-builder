import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { auth, setAuthRedirectPath } from "../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/spinner";
import { checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      label: "Email",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
        autoComplete: "on",
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
        autoComplete: "on",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const {
    loading,
    error,
    isAuthenticated,
    building,
    authRedirectPath,
    setAuthRedirectPath,
    auth,
  } = props;

  useEffect(() => {
    if (!building && authRedirectPath !== "/") {
      setAuthRedirectPath("/");
    }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (fieldNameInState) => (e) => {
    const fieldValueInState = controls[fieldNameInState];
    const updatedState = {
      ...controls,
      [fieldNameInState]: {
        ...fieldValueInState,
        value: e.target.value,
        valid: checkValidity(e.target.value, fieldValueInState.validation),
        touched: true,
      },
    };
    let formIsValid = true;
    for (let fieldKey in updatedState.controls) {
      formIsValid = updatedState.controls[fieldKey].valid && formIsValid;
    }
    setControls(updatedState);
    setIsSignUp(formIsValid);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      email: { value: emailVal },
      password: { value: passwordVal },
    } = controls;
    auth(emailVal, passwordVal, isSignUp);
  };
  const onSwitchSignInHandler = (e) => setIsSignUp(!isSignUp);

  const formFields = [];
  for (let fieldKey in controls) {
    const fieldValue = controls[fieldKey];
    formFields.push(
      <Input
        key={fieldKey}
        {...fieldValue}
        onChange={onChange(fieldKey)}
        shouldValidate={fieldValue.validation}
        invalid={!fieldValue.valid}
        touched={fieldValue.touched}
      />
    );
  }
  const formOrSpinnerComp = loading ? (
    <Spinner />
  ) : (
    <form onSubmit={onSubmitHandler}>
      {formFields}
      <Button btnType="Success">SUBMIT</Button>
    </form>
  );
  let errorMessage = null;
  if (error) {
    errorMessage = (
      <p
        style={{
          backgroundColor: "red",
          color: "#FFF",
        }}
      >
        {error.message}
      </p>
    );
  }
  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {formOrSpinnerComp}
      <Button btnType="Danger" onClick={onSwitchSignInHandler}>
        Switch To {isSignUp ? "SignIn" : "SignUp"}
      </Button>
    </div>
  );
};

const mapStateToProps = ({
  auth: { loading, error, token, authRedirectPath },
  burger: { building },
}) => ({
  loading,
  error,
  isAuthenticated: token !== null,
  building,
  authRedirectPath,
});
const mapDispatchToProps = {
  auth,
  setAuthRedirectPath,
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
