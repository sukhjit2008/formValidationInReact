import React, { Component } from "react";
import axios from "axios";

import "./ContactData.css";
import Input from "../Input/Input";

class ContactData extends Component {
  //STATE//////
  state = {
    orderFrom: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        validate: {
          required: true
        },
        valid: false,
        isTouched: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        validate: {
          required: true
        },
        valid: false,
        isTouched: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Name"
        },
        validate: {
          required: true
        },
        valid: false,
        isTouched: false,
        value: ""
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "PostalCode"
        },
        validate: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        isTouched: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },

        validate: {
          required: true
        },
        valid: false,
        isTouched: false,
        value: ""
      },
      delivery: {
        elementType: "drop-down",
        elementConfig: {
          options: [
            { value: "Basic", displayValue: "Basic" },
            { value: "fastest", displayValue: "Fastest" }
          ]
        },
        validate: {},
        isTouched: false,
        valid: false,

        value: "Basic"
      }
    },
    isFormValid: false
  };

  //FUNCTION TO HANDLE VALUE CHANGE
  changed = (e, id) => {
    e.preventDefault();
    const duplicateOrderForm = { ...this.state.orderFrom };
    const duplicateOrderFormElements = { ...duplicateOrderForm[id] };
    duplicateOrderFormElements.value = e.target.value;

    duplicateOrderFormElements.valid = this.validateFrom(
      duplicateOrderFormElements.validate,
      duplicateOrderFormElements.value
    );
    duplicateOrderFormElements.isTouched = true;

    duplicateOrderForm[id] = duplicateOrderFormElements;
    let isFormValid = true;
    for (let key in duplicateOrderForm) {
      isFormValid = duplicateOrderForm[key].valid && isFormValid;
    }

    this.setState({ orderFrom: duplicateOrderForm, isFormValid });

    this.setState({ value: e.target.value });
  };

  //TO CHECK FOR VALIDATION
  validateFrom = (rule, value) => {
    //console.log(rule);
    let isValid = true;

    if (rule.required && isValid) {
      isValid = isValid = value.trim() !== "";
    }
    if (rule.minLength && isValid) {
      isValid = value.length >= rule.minLength;
    }
    if (rule.maxLength && isValid) {
      isValid = value.length <= rule.maxLength;
    }

    return isValid;
  };
  //ON FROM SUBMITTED
  onSubmitHandler = e => {
    e.preventDefault();
    const orderForm = { ...this.state.orderFrom };

    let modOrderForm = {};
    for (let key in orderForm) {
      modOrderForm[key] = orderForm[key].value;
    }
    //TO SUBMIT DATA TO FIREBASE
    axios
      .post(
        `https://burgerbuilder-f8b38.firebaseio.com/order.json`,
        modOrderForm
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(modOrderForm);
  };
  render() {
    let inputList = [];
    // TO CREATE ARRARY TO HANDLE FROM
    for (let key in this.state.orderFrom) {
      inputList.push({
        id: key,
        config: this.state.orderFrom[key]
      });
    }
    const inputElementList = inputList.map(el => {
      return (
        <Input
          key={el.id}
          elementtype={el.config.elementType}
          elementConfig={el.config.elementConfig}
          value={el.config.value}
          changed={e => this.changed(e, el.id)}
          required={el.config.validate.required}
          valid={!el.config.valid}
          validate={el.config.validate.required}
          isTouched={el.config.isTouched}
        />
      );
    });

    return (
      <div className="ContactData">
        <form onSubmit={this.onSubmitHandler}>
          {inputElementList}
          <button type="submit" disabled={!this.state.isFormValid}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default ContactData;
