import React, { useEffect, useState, useCallback } from "react";
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
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("");
  const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  // const resetFields = useCallback(() => {
  //   resetFirstName();
  //   resetLastName();
  //   resetEmail();
  //   resetPassword();
  // }, [resetFirstName, resetLastName, resetEmail, resetPassword])

  // check if the problem in duplicating useEffect is resetFields

  useEffect(() => {
    console.log("use effect");
    console.log("is success ", isSuccess);

    if (isSuccess) {
      toast.success("You have successfully registered!");
      toast.info("We are redirecting you to the login page");

      // redirect to the login page after registration
      setTimeout(() => {
        history.push("/signin");
      }, 2000);
    }
  }, [isSuccess, history]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message])

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    dispatch(register(registerUser));
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
