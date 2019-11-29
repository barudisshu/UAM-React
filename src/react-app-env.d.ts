/** @format */

/// <reference types="react-scripts" />

type ConstraintViolation = {
  field?: string;
  value: string;
  validateStatus?: typeof ValidateStatuses[number];
  errorMsg?: string;
};
type CurrentUser = {
  uid: string;
  username: string;
  role: string;
  email: string;
};
