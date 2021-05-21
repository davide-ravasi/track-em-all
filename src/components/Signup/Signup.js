import React, { useState } from "react";
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
    <div>
      <h1>Sign Up</h1>
      <form>
        <div>
          <label for="email"></label>
          <input
            type="email"
            name="email"
            //required="required"
            placeholder="Email Address"
            {...bindEmail}
          ></input>
        </div>
        <div>
          <label for="password" type="text"></label>
          <input
            type="password"
            name="password"
            //required="required"
            placeholder="Password"
            {...bindPassword}
          ></input>
        </div>
        <div>
          <input
            type="submit"
            class="button"
            title="Sign Up"
            value="Sign Up"
            onClick={handleSubmit}
          ></input>
        </div>
      </form>
    </div>
  );
}
