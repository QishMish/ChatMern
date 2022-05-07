import React, { useContext, useState, useEffect, useReducer } from "react";
import { authReducer } from "./auth/authReducers";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import axios from "axios";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginFailure,
  loginSucces,
  logOut,
} from "./auth/authActions";

const authContext = React.createContext();

const userLS = JSON.parse(localStorage.getItem("chat_user"));

const USER_INITIAL_STATE = {
  user: userLS || null,
  loading: false,
  error: false,
  errorMessage: "",
};

export const AuthProvider = (props) => {
  const [userState, dispatchUser] = useReducer(authReducer, USER_INITIAL_STATE);
  const navigate = useNavigate();

  const registerHandler = async (userData) => {
    try {
      dispatchUser(registerStart());
      const res = await axiosInstance.post("user/register", userData);
      console.log(res)
      dispatchUser(registerSuccess(res.data));
      navigate("/chat");
    } catch (error) {
      dispatchUser(registerFailure(error));
    }
  };
  const loginHandler = async (userData) => {
    try {
      dispatchUser(loginStart());
      const res = await axiosInstance.post("user/login", userData);
      dispatchUser(loginSucces(res.data));
      navigate("/chat");
    } catch (error) {
      dispatchUser(loginFailure(error));
    }
  };

  return (
    <authContext.Provider
      value={{
        userState: userState,
        registerHandler: registerHandler,
        loginHandler: loginHandler,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authContext
