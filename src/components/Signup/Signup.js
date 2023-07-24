import React, { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { register } from "../../features/auth/authSlice";

import "./Signup.scss";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export default function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("");
  const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    dispatch(register(newUser))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      }).catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });

    // let response;

    // try {
    //   response = await fetch("http://localhost:8888/.netlify/functions/express/user/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: new URLSearchParams({
    //       firstName: firstName,
    //       lastName: lastName,
    //       email: email,
    //       password: password,
    //     }),
    //   })
    // } catch (error) {
    //   // catch only network error
    //   console.log(
    //     "Failed to create an account. Please retry later (or contact us if the problem persists)"
    //   );
    //   console.log(error);
    // }

    // // catch if status code is not in range of 200--299
    // if (response?.ok) {
    //   console.log('Use the response here!');
    //   console.log(response);

    //   resetFirstName();
    //   resetLastName();
    //   resetEmail();
    //   resetPassword();
    //   history.push("/");
    // } else {
    //   // manaage errors from response code 400 
    //   const res = await response.json();
    //   console.log(await res.message)
    //   console.log(`HTTP Response Code: ${response?.status}`)
    // }
  }

  return (
    <div className="page">
      <form className="signup__form-container" onSubmit={handleSubmit}>
        <div className="login__input-container">
          <label htmlFor="firstname">First Name: </label>
          <input
            className="login__input"
            type="text"
            id="firstname"
            name="firstname"
            required="required"
            {...bindFirstName}
          ></input>
        </div>
        <div className="login__input-container">
          <label htmlFor="lastname">Last Name: </label>
          <input
            className="login__input"
            type="text"
            id="lastname"
            name="lastname"
            required="required"
            {...bindLastName}
          ></input>
        </div>
        <div className="signup__input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="signup__input"
            {...bindEmail}
          ></input>
        </div>
        <div className="signup__input-container">
          <label htmlFor="password" type="text">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="signup__input"
            {...bindPassword}
          ></input>
        </div>
        <button
          type="submit"
          className="signup__button"
          title="Sign Up"
          value="Sign Up"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
