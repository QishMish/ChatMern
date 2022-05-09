import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const chatSlice = createSlice({
  name: "chat",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.fetchConversations.matchFulfilled,
      (state, { payload }) => payload
    );
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
