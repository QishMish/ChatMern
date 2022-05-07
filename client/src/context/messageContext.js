import React, { useContext, useState, useEffect, useReducer } from "react";
import axiosInstance from "../config/axiosConfig";
import { messageReducer } from "./messages/messageReducers";
import {
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,
} from "./messages/messageActions";

const messageContext = React.createContext();

const MESSAGE_INITIAL_STATE = {
  messages: [],
  loading: false,
  error: false,
  errorMessage: "",
};

export const MessageProvider = (props) => {
  const [messagesState, dispatchMessages] = useReducer(
    messageReducer,
    MESSAGE_INITIAL_STATE
  );

  const fetchMessages = async () => {
    try {
      dispatchMessages(fetchMessagesStart());
      const res = await axiosInstance.get("chat/messages");
      dispatchMessages(fetchMessagesSuccess(res.data));
    } catch (error) {
      dispatchMessages(fetchMessagesFailure(error));
    }
  };
  return (
    <messageContext.Provider
      value={{
        messagesState: messagesState,
        fetchMessages: fetchMessages,
      }}
    >
      {props.children}
    </messageContext.Provider>
  );
};

export default messageContext;
