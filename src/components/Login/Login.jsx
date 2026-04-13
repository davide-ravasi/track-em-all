import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Login.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/UseToast';

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

    loginUser({ email, password });
  }

  return (
    <main id='main-content' className='page'>
      <form className='login__form-container' onSubmit={handleSubmit}>
        <div className='login__input-container'>
          <label htmlFor='email'>Email: </label>
          <input
            className='login__input'
            type='email'
            id='email'
            name='email'
            required='required'
            {...bindEmail}
          ></input>
        </div>
        <div className='login__input-container'>
          <label htmlFor='password'>Password: </label>
          <input
            className='login__input'
            type='password'
            id='password'
            name='password'
            required='required'
            {...bindPassword}
          ></input>
        </div>
        <button type='submit' className='login__button' disabled={isLoading}>
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
