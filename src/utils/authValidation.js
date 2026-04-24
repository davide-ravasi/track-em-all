/**
 * Shared auth form validation (Login / Register).
 * Mirror register rules in `functions/controllers/userController.js` when adding server checks.
 */

/** Pragmatic email shape; not full RFC. */
export const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Register password policy (do not use as HTML `pattern`; validate in JS).
 * Allowed charset + complexity + min length 10.
 */
export const REGISTER_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

/** Max length for register first/last name after trim (mirror in `functions/utils/authValidation.js`). */
export const REGISTER_NAME_MAX_LENGTH = 80;

/** Letters (any script), marks, space, hyphen, apostrophes, period — no digits or symbols that suggest abuse. */
const REGISTER_NAME_PATTERN = /^[\p{L}\p{M}\s'’.-]+$/u;

export const AUTH_FORM_MESSAGES = {
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
};

export function isValidEmailFormat(email) {
  return EMAIL_FORMAT_REGEX.test(email);
}

export function isValidRegisterPassword(password) {
  return REGISTER_PASSWORD_REGEX.test(password);
}

/** @param {string} trimmedNonEmpty */
export function isRegisterNameLengthValid(trimmedNonEmpty) {
  return trimmedNonEmpty.length <= REGISTER_NAME_MAX_LENGTH;
}

/** @param {string} trimmedNonEmpty */
export function isRegisterNameCharactersValid(trimmedNonEmpty) {
  return REGISTER_NAME_PATTERN.test(trimmedNonEmpty);
}
