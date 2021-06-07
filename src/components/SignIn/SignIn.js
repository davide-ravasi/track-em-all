import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.scss";
import { useAuth } from "../../contexts/AuthContext";
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
  //const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  /*const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
*/
  const { login } = useAuth();
  const history = useHistory();

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  async function handleSubmit(e) {
    e.preventDefault();
    //alert(`email: ${email} password ${password} `);
    //resetEmail();
    //resetPassword();
    try {
      await login(email, password);
      history.push("/");
      resetEmail();
      resetPassword();
    } catch {
      alert("Failed to sign in");
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
