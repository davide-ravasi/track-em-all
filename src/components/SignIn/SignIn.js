import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.scss";
import { useHistory } from "react-router-dom";
//import { useSelector, useDispatch } from 'react-redux'

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  //const auth = useSelector((state) => state.auth.value)
  //const dispatch = useDispatch()

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

export default function Signin() {
  const history = useHistory();

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  async function handleSubmit(e) {
    e.preventDefault();

    let response;

    try {
      response = await fetch("https://8888-davideravasi-trackemall-mclb840f9og.ws-eu92.gitpod.io/.netlify/functions/express/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      })

      console.log(response);

    } catch (error) {
      // catch only network error
      console.log(
        "Failed to create an account. Please retry later (or contact us if the problem persists)"
      );
      console.log(error);
    }

    // catch if status code is not in range of 200--299
    if (response?.ok) {
      console.log('Use the response here!');
      console.log(response);

      history.push("/");
      resetEmail();
      resetPassword();
    } else {
      console.log(`HTTP Response Code: ${response?.status}`)
    }
  }

  return (
    <div className="page">
      <form className="login__form-container">
        <div className="login__input-container">
          <label htmlFor="username">Email: </label>
          <input
            className="login__input"
            type="email"
            id="username"
            name="username"
            required="required"
            {...bindEmail}
          ></input>
        </div>
        <div className="login__input-container">
          <label htmlFor="password">Password: </label>
          <input
            className="login__input"
            type="password"
            id="password"
            name="password"
            required="required"
            {...bindPassword}
          ></input>
        </div>
        <button type="submit" className="login__button" onClick={handleSubmit}>
          Sign In
        </button>
        <div className="login__singup-text">
          <span>Don't have account?</span>
          <Link to="/signup">
            <span className="login__singup-text__link">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
