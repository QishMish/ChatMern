import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Conversation", "Message"],
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    signInUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    logOutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
    fetchConversations: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
        // body: payload,
      }),
      providesTags: ["Conversation"],
    }),
    fetchConversationMessages: builder.query({
      query: (id) => ({
        url: `/chat/conversations/${id}`,
        method: "GET",
      }),
      // providesTags: ["Message"],
      providesTags: ["Message"],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useLogOutUserMutation,
  useFetchConversationsQuery,
  useFetchConversationMessagesQuery,
} = appApi;

export default appApi;
