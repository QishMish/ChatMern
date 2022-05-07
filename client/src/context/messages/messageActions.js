import {
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "./messageConstants";

export const fetchMessagesStart = () => {
  return {
    type: FETCH_MESSAGES_START,
  };
};

export const fetchMessagesSuccess = (messages) => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: messages,
  };
};
export const fetchMessagesFailure = (err) => {
  return {
    type: FETCH_MESSAGES_FAILURE,
    payload: err,
  };
};
