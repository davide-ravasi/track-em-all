/**
 * Auth validation for Netlify Functions (CommonJS).
 * Keep in sync with `src/utils/authValidation.js`.
 */

/** Pragmatic email shape; not full RFC. */
const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Register password policy.
 * Allowed charset + complexity + min length 10.
 */
const REGISTER_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

const AUTH_FORM_MESSAGES = {
  userAlreadyExists: 'User already exists',
  emailPasswordInvalid: 'Invalid email or password.',
  emailRequired: 'Email is required',
  emailInvalidFormat:
    'Invalid email address. The correct format is example@example.com',
  loginPasswordRequired: 'Password is required',
  registerPasswordPolicy:
    'Password must be at least 10 characters and include upper and lowercase letters, a number, and a symbol from @$!%*?&.',
  firstNameRequired: 'First name is required',
  lastNameRequired: 'Last name is required',
  confirmPasswordMismatch: 'Passwords do not match',
  registrationFailed: 'Registration failed',
  pleaseFillAllFields: 'Please fill all the fields',
  userNotFound: 'User not found',
  favoriteDataInvalid: 'The favorite data is not valid',
  invalidTokenPayload: 'Invalid token payload',
  favoriteShowIdInvalid: 'The favorite showId is not valid',
  accessTokenNotFound: 'Access token not found',
  invalidToken: 'Invalid token',
};

function isValidEmailFormat(email) {
  return EMAIL_FORMAT_REGEX.test(email);
}

function isValidRegisterPassword(password) {
  return REGISTER_PASSWORD_REGEX.test(password);
}

module.exports = {
  EMAIL_FORMAT_REGEX,
  REGISTER_PASSWORD_REGEX,
  AUTH_FORM_MESSAGES,
  isValidEmailFormat,
  isValidRegisterPassword,
};
