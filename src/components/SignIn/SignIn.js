import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.scss";
// import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

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

export default function Signin() {
  // const { login } = useAuth();
  const history = useHistory();

  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("");
  const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("");
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
      response = await fetch("http://localhost:8888/.netlify/functions/express/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      })
      //.then((res) => res.json())
      //.then((data) => console.log(data));

      //await signup(email, password);
    } catch(error) {
      // catch only network error
      console.log (
        "Failed to create an account. Please retry later (or contact us if the problem persists)"
      );
      console.log(error);
    }

    // catch if status code is not in range of 200--299
    if (response?.ok) {
      console.log('Use the response here!');
      console.log(response);
      
      // history.push("/");
      //resetFirstName();
      //resetLastName();
      //resetEmail();
      //resetPassword();
    } else {
      console.log(`HTTP Response Code: ${response?.status}`)
    }
  }

  return (
    <div className="page">
      <form className="login__form-container">
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
