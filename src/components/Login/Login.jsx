import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Login.scss';
import { reset } from '../../features/auth/authSlice';
import { useAuth } from '../../contexts/AuthContext';
import { useInput } from '../../hooks/useInput';
import { useToast } from '../../hooks/UseToast';
import {
  AUTH_FORM_MESSAGES,
  isValidEmailFormat,
} from '../../utils/authValidation';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../features/auth/authSlice';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loginUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      dispatch(login.fulfilled(response));
      notifySuccess('You have successfully logged in!', { autoClose: timer });
      notifyInfo('We are redirecting you to the homepage', { autoClose: timer });

      history.push('/');
    },
    onError: (error) => {
      notifyError(error.message, {
        onClose: () => {
          resetEmail();
          resetPassword();
          dispatch(reset());
        },
      });
    },
  });

  const timer = 2000;

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

    loginMutation.mutate({ email: trimmedEmail, password: trimmedPassword });
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
        <button type='submit' className='login__button' disabled={loginMutation.isPending} aria-busy={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in...' : 'Log in'}
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
