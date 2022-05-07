import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOG_OUT,
  } from "./authConstants";
  
  export const authReducer = (state, action) => {
    switch (action.type) {
      case REGISTER_START:
        return {
          ...state,
          loading: true,
          error: false,
          errorMessage: "",
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: false,
          errorMessage: "",
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          loading: true,
          error: true,
          errorMessage: action.payload,
        };
      case LOGIN_START:
        return {
          ...state,
          loading: true,
          error: false,
          errorMessage: "",
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: false,
          errorMessage: "",
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: true,
          error: true,
          errorMessage: action.payload,
        };
      case LOG_OUT:
        return {
          ...state,
          user: null,
          loading: false,
          error: false,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  