import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("");
  const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  useEffect(() => {
    console.log(message);
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("You have successfully registered!");
      resetFirstName();
      resetLastName();
      resetEmail();
      resetPassword();
    }

    if (user) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [user, isError, isSuccess, message, history, resetFirstName, resetLastName, resetEmail, resetPassword])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    dispatch(register(newUser));
  }

  if (isLoading) return <div className="page">...is loading</div>;

  return (
    <div className="page">
      <form className="signup__form-container" onSubmit={handleSubmit}>
        <div className="login__input-container">
          <label htmlFor="firstname">First Name: </label>
          <input
            className="login__input"
            type="text"
            id="firstName"
            name="firstName"
            required="required"
            {...bindFirstName}
          ></input>
        </div>
        <div className="login__input-container">
          <label htmlFor="lastname">Last Name: </label>
          <input
            className="login__input"
            type="text"
            id="lastName"
            name="lastName"
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
