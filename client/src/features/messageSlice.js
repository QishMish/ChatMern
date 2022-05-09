import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const messageSlice = createSlice({
  name: "message",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.fetchConversations.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.fetchConversationMessages.matchFulfilled,
      (state, { payload }) => payload
    );
  },
});

export const {} = messageSlice.actions;
export default messageSlice.reducer;
