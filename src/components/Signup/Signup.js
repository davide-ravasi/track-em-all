import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { reset } from "../../features/auth/authSlice";

import "./Signup.scss";
import { useAuth } from "../../contexts/AuthContext";

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

  const timer = 2000;

  const { registerUser } = useAuth();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { value: firstName, bind: bindFirstName } = useInput("");
  const { value: lastName, bind: bindLastName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("You have successfully registered!", { autoClose: timer });
      toast.info("We are redirecting you to the login page", {
        autoClose: timer,
      });

      // redirect to the login page after registration
      setTimeout(() => {
        dispatch(reset());
        history.push("/signin");
      }, timer);
    }
  }, [isSuccess, history, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser({ firstName, lastName, email, password });
  };

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
