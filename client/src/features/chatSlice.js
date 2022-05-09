import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.fetchConversations.matchFulfilled,
      (state, { payload }) => {
        state.conversations = payload;
      }
    );
    builder.addMatcher(
      appApi.endpoints.fetchConversationMessages.matchFulfilled,
      (state, { payload }) => {
        state.messages = payload;
      }
    );
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
