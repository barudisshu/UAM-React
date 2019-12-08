/** @format */

/// <reference types="react-scripts" />

interface IConstraintViolation {
  field?: string;
  value: string;
  validateStatus?: typeof ValidateStatuses[number];
  errorMsg?: string;
}
interface ICurrentUser {
  uid: string;
  username: string;
  role: string;
  email: string;
}
