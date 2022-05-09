import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.fetchConversations.matchFulfilled,
      (state, { payload }) => payload
    );
  },
});

export const {} = conversationSlice.actions;
export default conversationSlice.reducer;
