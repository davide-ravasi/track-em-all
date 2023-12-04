import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "../../features/auth/authSlice";

import "./SignIn.scss";

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
  const dispatch = useDispatch();

  const timer = 2000;
  //const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("You have successfully login!", { autoClose: timer });
      toast.info("We are redirecting you to the homepage", {
        autoClose: timer,
      });

      // redirect to the login page after registration
      setTimeout(() => {
        history.push("/");
      }, timer);
    }
  }, [isSuccess, history]);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        onClose: () => {
          resetEmail();
          resetPassword();
        },
      });
    }
  }, [isError, resetEmail, resetPassword, message]);

  async function handleSubmit(e) {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };

    dispatch(login(loginUser));
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
