import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { reset } from '../../features/auth/authSlice';

import './Register.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/UseToast';
import Loader from '../Loader/Loader';

/** Password rules for register (HTML `pattern` is unreliable with this shape; keep in sync with backend). */
const REGISTER_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

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

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const timer = 2000;

  const { registerUser } = useAuth();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { notifySuccess, notifyInfo, notifyError } = useToast();

  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');

  useEffect(() => {
    if (isSuccess) {
      notifySuccess('You have successfully registered!', { autoClose: timer });
      notifyInfo('We are redirecting you to the login page', {
        autoClose: timer,
      });

      setTimeout(() => {
        dispatch(reset());
        history.push('/login');
      }, timer);
    }
  }, [isSuccess, history, dispatch, notifySuccess, notifyInfo]);

  useEffect(() => {
    if (isError) {
      notifyError(message, {
        onClose: () => {
          dispatch(reset());
        },
      });
    }
  }, [dispatch, isError, message, notifyError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!REGISTER_PASSWORD_REGEX.test(password)) {
      notifyError(
        'Password must be at least 10 characters and include upper and lowercase letters, a number, and a symbol from @$!%*?&.'
      );
      return;
    }

    if (password !== confirmPassword) {
      notifyError('Passwords do not match');
      return;
    }

    registerUser({ firstName, lastName, email, password });
  };

  if (isLoading) {
    return (
      <main id='main-content' className='page' aria-busy='true'>
        <div
          className='loader'
          aria-live='polite'
          aria-atomic='true'
          role='status'
          aria-label='Loading register page'
        >
          <Loader aria-hidden='true' aria-busy='true' />
        </div>
      </main>
    );
  }

  return (
    <main id='main-content' className='page'>
      <form className='register__form-container' onSubmit={handleSubmit}>
        <div className='register__input-container'>
          <label htmlFor='firstname'>First Name: </label>
          <input
            className='register__input'
            type='text'
            id='firstname'
            name='firstName'
            required='required'
            {...bindFirstName}
          ></input>
        </div>
        <div className='register__input-container'>
          <label htmlFor='lastname'>Last Name: </label>
          <input
            className='register__input'
            type='text'
            id='lastname'
            name='lastName'
            required='required'
            {...bindLastName}
          ></input>
        </div>
        <div className='register__input-container'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            required='required'
            className='register__input'
            {...bindEmail}
          ></input>
        </div>
        <div className='register__input-container'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            required='required'
            minLength={10}
            className='register__input'
            {...bindPassword}
          ></input>
        </div>
        <div className='register__input-container'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            required='required'
            className='register__input'
            {...bindConfirmPassword}
          ></input>
        </div>
        <button
          type='submit'
          className='register__button'
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </main>
  );
}
