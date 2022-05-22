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
  tagTypes: ["chat", "user"],
  endpoints: (builder) => ({
    fetchLoggedUser: builder.query({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      providesTags: ["user"],
    }),
    signInUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      providesTags: ["user"],
    }),
    logOutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/user/update",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["user"],
    }),
    fetchConversations: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
        // body: payload,
      }),
    }),
    fetchConversationMessages: builder.query({
      query: (id) => ({
        url: `/chat/conversations/${id}`,
        method: "GET",
      }),
    }),
    createConversations: builder.mutation({
      query: (payload) => ({
        url: "/chat/conversations",
        method: "POST",
        body: payload,
      }),
    }),
    deleteConversations: builder.mutation({
      query: (id) => ({
        url: `/chat/conversations/${id}`,
        method: "DELETE",
      }),
    }),
    sendPrivateMessage: builder.mutation({
      query: (message) => ({
        url: "/chat/messages",
        method: "POST",
        body: message,
      }),
    }),
    retrieveUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useLogOutUserMutation,
  useFetchConversationsQuery,
  useFetchConversationMessagesQuery,
  useSendPrivateMessageMutation,
  useRetrieveUsersQuery,
  useCreateConversationsMutation,
  useDeleteConversationsMutation,
  useUpdateUserMutation,
  useFetchLoggedUserQuery,
} = appApi;

export default appApi;
