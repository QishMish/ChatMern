import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import conversationSlice from "../features/conversationSlice";
import messageSlice from "../features/messageSlice";
import chatSlice from "../features/chatSlice";
import appApi from "../services/appApi";
import { setupListeners } from "@reduxjs/toolkit/query";

//persist store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//reducers

const reducer = combineReducers({
  user: userSlice,
  // conversation: conversationSlice,
  // message: messageSlice,
  chat: chatSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath],
};

//persist store
const persistedReducer = persistReducer(persistConfig, reducer);

//create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});

// setupListeners(store.dispatch);

export default store;
