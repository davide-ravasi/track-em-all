import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Login.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/UseToast';
import {
  AUTH_FORM_MESSAGES,
  isValidEmailFormat,
} from '../../utils/authValidation';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export default function Login() {
  const history = useHistory();

  const { loginUser } = useAuth();

  const timer = 2000;

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { notifySuccess, notifyInfo, notifyError } = useToast();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    AUTH_FORM_MESSAGES.emailRequired
  );
  const [passwordError, setPasswordError] = useState(false);
  const passwordErrorMessage = AUTH_FORM_MESSAGES.loginPasswordRequired;

  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput('');

  useEffect(() => {
    if (isSuccess) {
      notifySuccess('You have successfully logged in!', { autoClose: timer });
      notifyInfo('We are redirecting you to the homepage', {
        autoClose: timer,
      });

      setTimeout(() => {
        history.push('/');
      }, timer);
    }
  }, [isSuccess, history, notifySuccess, notifyInfo]);

  useEffect(() => {
    if (isError) {
      notifyError(message, {
        onClose: () => {
          resetEmail();
          resetPassword();
        },
      });
    }
  }, [isError, resetEmail, resetPassword, message, notifyError]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    setEmailError(false);
    setPasswordError(false);

    if (!trimmedEmail) {
      setEmailError(true);
      setEmailErrorMessage(AUTH_FORM_MESSAGES.emailRequired);
      return;
    }

    if (!isValidEmailFormat(trimmedEmail)) {
      setEmailError(true);
      setEmailErrorMessage(AUTH_FORM_MESSAGES.emailInvalidFormat);
      return;
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setPasswordError(true);
      return;
    }

    loginUser({ email: trimmedEmail, password: trimmedPassword });
  }

  return (
    <main id='main-content' className='page'>
      <form className='login__form-container' onSubmit={handleSubmit} noValidate>
        <div className='login__input-container'>
          <label htmlFor='email'>Email: </label>
          <input
            className='login__input'
            type='email'
            id='email'
            name='email'
            aria-invalid={emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
            {...bindEmail}
          ></input>
          {emailError && <span className='login__input-error' id='email-error' role='alert'>{emailErrorMessage}</span>}
        </div>
        <div className='login__input-container'>
          <label htmlFor='password'>Password: </label>
          <input
            className='login__input'
            type='password'
            id='password'
            name='password'
            aria-invalid={passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
            {...bindPassword}
          ></input>
          {passwordError && <span className='login__input-error' id='password-error' role='alert'>{passwordErrorMessage}</span>}
        </div>
        <button type='submit' className='login__button' disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
        <div className='login__register-text'>
          <span>Don&apos;t have account?</span>
          <Link to='/register'>
            <span className='login__register-text__link'>Register</span>
          </Link>
        </div>
      </form>
    </main>
  );
}
