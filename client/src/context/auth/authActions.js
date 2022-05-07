import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
} from "./authConstants";

export const registerStart = () => {
  return {
    type: REGISTER_START,
  };
};
export const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
};
export const registerFailure = (err) => {
  return {
    type: REGISTER_FAILURE,
    payload: err,
  };
};
export const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};
export const loginSucces = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};
export const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
