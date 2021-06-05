import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { auth } from '../../firebase/firebase';

import './Signup.scss';

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
  const { signup } = useAuth();
  const history = useHistory();

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(email, password);
      history.push("/");
      resetEmail();
      resetPassword();
    } catch {
      alert("Failed to create an account");
    }
  }

  return (
    <div className="page">
      <form className="signup__form-container">
        <div className="signup__input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="signup__input"
            //required="required"
            // placeholder="Email Address"
            {...bindEmail}
          ></input>
        </div>
        <div className="signup__input-container">
          <label htmlFor="password" type="text">Password:</label>
          <input
            type="password"
            name="password"
            className="signup__input"
            //required="required"
            // placeholder="Password"
            {...bindPassword}
          ></input>
        </div>
          <button
            type="submit"
            className="signup__button"
            title="Sign Up"
            value="Sign Up"
            onClick={handleSubmit}
          >Sign Up</button>
      </form>
    </div>
  );
}
