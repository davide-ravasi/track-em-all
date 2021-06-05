import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './SignIn.scss';

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
           /*{...bindEmail} */
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
           /*{...bindPassword}*/
         ></input>
       </div>
         <button
           type="submit"
           className="login__button"
           onClick={handleSubmit}
         >Sign In</button>
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
