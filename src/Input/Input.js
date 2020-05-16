import React from "react";
import "./Input.css";

const Input = props => {
  let inputElement = null;
  let classList = [];

  //CHECK IF THE FORM IS VALID AND FORM IS NOT ALL INVAID WHEN STARTED
  if (props.valid && props.validate && props.isTouched) {
    classList.push("invalid");
  }
  //SWITCH TO HANDLE DIFFERENT TYPE OF INPUTS
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          required={props.required}
          className={classList.join(" ")}
        />
      );
      break;
    case "drop-down":
      inputElement = (
        <select
          value={props.value}
          onChange={props.changed}
          className={classList.join(" ")}
        >
          {props.elementConfig.options.map(el => {
            return (
              <option key={el.value} value={el.value}>
                {el.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          required={props.required}
          className={classList.join(" ")}
        />
      );
  }
  return <div>{inputElement}</div>;
};

export default Input;
