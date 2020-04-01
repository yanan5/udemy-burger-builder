import React from "react";
import classes from "./input.module.css";

const input = props => {
  let inputElement = null;
  const { elementType, label, elementConfig, value, onChange } = props;
  const inputClasses = [classes.InputElement]
  if (props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid)
  }
  switch (elementType) {
    case "input":
    case "email":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={onChange}          
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} value={value}
        onChange={onChange}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
