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

const REGISTER_NAME_MAX_LENGTH = 80;
const REGISTER_NAME_PATTERN = /^[\p{L}\p{M}\s'’.-]+$/u;

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
  registerNameTooLong: `Each name must be at most ${REGISTER_NAME_MAX_LENGTH} characters.`,
  registerNameInvalidCharacters:
    'Names may only include letters, spaces, hyphens, apostrophes, and periods.',
  confirmPasswordMismatch: 'Passwords do not match',
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

function isRegisterNameLengthValid(trimmedNonEmpty) {
  return trimmedNonEmpty.length <= REGISTER_NAME_MAX_LENGTH;
}

function isRegisterNameCharactersValid(trimmedNonEmpty) {
  return REGISTER_NAME_PATTERN.test(trimmedNonEmpty);
}

module.exports = {
  EMAIL_FORMAT_REGEX,
  REGISTER_PASSWORD_REGEX,
  /** Keep in sync with `REGISTER_NAME_MAX_LENGTH` in `src/utils/authValidation.js`. */
  REGISTER_NAME_MAX_LENGTH,
  AUTH_FORM_MESSAGES,
  isValidEmailFormat,
  isValidRegisterPassword,
  isRegisterNameLengthValid,
  isRegisterNameCharactersValid,
};
