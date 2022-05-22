import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uploadFile = createApi({
  reducerPath: "uploadFile",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  tagTypes: ["chat", "user"],
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation({
      query: (file) => ({
        url: "/file/single",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUploadSingleFileMutation } = uploadFile;

export default uploadFile;
