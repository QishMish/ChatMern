import {
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "./messageConstants";

export const messageReducer = (state, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: true,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
