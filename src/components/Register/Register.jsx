import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { reset } from '../../features/auth/authSlice';

import './Register.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/UseToast';
import Loader from '../Loader/Loader';
import {
  AUTH_FORM_MESSAGES,
  REGISTER_NAME_MAX_LENGTH,
  isValidEmailFormat,
  isValidRegisterPassword,
  isRegisterNameLengthValid,
  isRegisterNameCharactersValid,
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
  const passwordErrorMessage = AUTH_FORM_MESSAGES.registerPasswordPolicy;
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const confirmPasswordErrorMessage = AUTH_FORM_MESSAGES.confirmPasswordMismatch;
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(
    AUTH_FORM_MESSAGES.firstNameRequired
  );
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(
    AUTH_FORM_MESSAGES.lastNameRequired
  );
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    AUTH_FORM_MESSAGES.emailRequired
  );

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
    setFirstNameError(false);
    setFirstNameErrorMessage(AUTH_FORM_MESSAGES.firstNameRequired);
    setLastNameError(false);
    setLastNameErrorMessage(AUTH_FORM_MESSAGES.lastNameRequired);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName) {
      setFirstNameError(true);
      setFirstNameErrorMessage(AUTH_FORM_MESSAGES.firstNameRequired);
      return;
    }

    if (!isRegisterNameLengthValid(trimmedFirstName)) {
      setFirstNameError(true);
      setFirstNameErrorMessage(AUTH_FORM_MESSAGES.registerNameTooLong);
      return;
    }

    if (!isRegisterNameCharactersValid(trimmedFirstName)) {
      setFirstNameError(true);
      setFirstNameErrorMessage(AUTH_FORM_MESSAGES.registerNameInvalidCharacters);
      return;
    }

    if (!trimmedLastName) {
      setLastNameError(true);
      setLastNameErrorMessage(AUTH_FORM_MESSAGES.lastNameRequired);
      return;
    }

    if (!isRegisterNameLengthValid(trimmedLastName)) {
      setLastNameError(true);
      setLastNameErrorMessage(AUTH_FORM_MESSAGES.registerNameTooLong);
      return;
    }

    if (!isRegisterNameCharactersValid(trimmedLastName)) {
      setLastNameError(true);
      setLastNameErrorMessage(AUTH_FORM_MESSAGES.registerNameInvalidCharacters);
      return;
    }

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

    if (!isValidRegisterPassword(password)) {
      setPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    registerUser({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      password,
    });
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
      <form className='register__form-container' onSubmit={handleSubmit} noValidate>
        <div className='register__input-container'>
          <label htmlFor='firstname'>First Name*: </label>
          <input
            className='register__input'
            type='text'
            id='firstname'
            name='firstName'
            maxLength={REGISTER_NAME_MAX_LENGTH}
            autoComplete='given-name'
            aria-invalid={firstNameError}
            aria-describedby={firstNameError ? 'firstName-error' : undefined}
            {...bindFirstName}
          ></input>
          {firstNameError && <span className='register__input-error' id='firstName-error' role='alert'>{firstNameErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='lastname'>Last Name*: </label>
          <input
            className='register__input'
            type='text'
            id='lastname'
            name='lastName'
            maxLength={REGISTER_NAME_MAX_LENGTH}
            autoComplete='family-name'
            aria-invalid={lastNameError}
            aria-describedby={lastNameError ? 'lastName-error' : undefined}
            {...bindLastName}
          ></input>
          {lastNameError && <span className='register__input-error' id='lastName-error' role='alert'>{lastNameErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='email'>Email*: </label>
          <input
            type='email'
            id='email'
            name='email'
            className='register__input'
            aria-invalid={emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
            {...bindEmail}
          ></input>
          {emailError && <span className='register__input-error' id='email-error' role='alert'>{emailErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='password'>Password*: </label>
          <input
            type='password'
            id='password'
            name='password'
            className='register__input'
            aria-invalid={passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
            {...bindPassword}
          ></input>
          {passwordError && <span className='register__input-error' id='password-error' role='alert'>{passwordErrorMessage}</span>}
        </div>
        <div className='register__input-container'>
          <label htmlFor='confirmPassword'>Confirm Password*: </label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            className='register__input'
            aria-invalid={confirmPasswordError}
            aria-describedby={confirmPasswordError ? 'confirmPassword-error' : undefined}
            {...bindConfirmPassword}
          ></input>
          {confirmPasswordError && <span className='register__input-error' id='confirmPassword-error' role='alert'>{confirmPasswordErrorMessage}</span>}
        </div>
        <button
          type='submit'
          className='register__button'
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </main>
  );
}
