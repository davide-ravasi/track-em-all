import React, { useState } from "react";

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
  function handleSubmit(e) {
    e.preventDefault();
    //alert(`email: ${email} password ${password} `);
    //resetEmail();
    //resetPassword();
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <div>
          <label for="email"></label>
          <input
            type="email"
            name="email"
            required="required"
            placeholder="Email Address"
            /*{...bindEmail} */
          ></input>
        </div>
        <div>
          <label for="password" type="text"></label>
          <input
            type="password"
            name="password"
            required="required"
            placeholder="Password"
            /*{...bindPassword}*/
          ></input>
        </div>
        <div>
          <input
            type="submit"
            class="button"
            title="Sign In"
            value="Sign In"
            onClick={handleSubmit}
          ></input>
        </div>
      </form>
    </div>
  );
}
