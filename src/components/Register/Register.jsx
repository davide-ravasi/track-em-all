import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { reset } from '../../features/auth/authSlice';

import './Register.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/UseToast';
import Loader from '../Loader/Loader';

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
          aria-label='Loading episodes'
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
            id='firstName'
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
            id='lastName'
            name='lastName'
            required='required'
            {...bindLastName}
          ></input>
        </div>
        <div className='register__input-container'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            className='register__input'
            {...bindEmail}
          ></input>
        </div>
        <div className='register__input-container'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            className='register__input'
            {...bindPassword}
          ></input>
        </div>
        <button
          type='submit'
          className='register__button'
          title='Register'
          value='Register'
        >
          Register
        </button>
      </form>
    </main>
  );
}
