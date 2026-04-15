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

  const [passwordError, setPasswordError] = useState(false);
  const passwordErrorMessage = 'Password must be at least 10 characters and include upper and lowercase letters, a number, and a symbol from @$!%*?&.';
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const confirmPasswordErrorMessage = 'Passwords do not match';
  const [firstNameError, setFirstNameError] = useState(false);
  const firstNameErrorMessage = 'First name is required';
  const [lastNameError, setLastNameError] = useState(false);
  const lastNameErrorMessage = 'Last name is required';
  const [emailError, setEmailError] = useState(false);
  const emailErrorMessage = 'Email is required';

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

    if (!firstName) {
      setFirstNameError(true);
      return;
    }
    setFirstNameError(false);
    if (!lastName) {
      setLastNameError(true);
      return;
    }
    setLastNameError(false);
    if (!email) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    if (!REGISTER_PASSWORD_REGEX.test(password)) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordError(false);

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
          <label htmlFor='firstname'>First Name*: </label>
          <input
            className='register__input'
            type='text'
            id='firstname'
            name='firstName'
            {...bindFirstName}
          ></input>
          {firstNameError && <span className='register__input-error'>{firstNameErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='lastname'>Last Name*: </label>
          <input
            className='register__input'
            type='text'
            id='lastname'
            name='lastName'
            {...bindLastName}
          ></input>
          {lastNameError && <span className='register__input-error'>{lastNameErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='email'>Email*: </label>
          <input
            type='email'
            id='email'
            name='email'
            className='register__input'
            {...bindEmail}
          ></input>
          {emailError && <span className='register__input-error'>{emailErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='password'>Password*: </label>
          <input
            type='password'
            id='password'
            name='password'
            className='register__input'
            {...bindPassword}
          ></input>
          {passwordError && <span className='register__input-error'>{passwordErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='confirmPassword'>Confirm Password*: </label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            className='register__input'
            {...bindConfirmPassword}
          ></input>
          {confirmPasswordError && <span className='register__input-error'>{confirmPasswordErrorMessage}</span>}
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
