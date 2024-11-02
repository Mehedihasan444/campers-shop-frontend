
import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags:["user"]
    }),
    getUser: builder.query({
      query: (UserId) => ({
        url: `/users/${UserId}`,
        method: "GET",
      }),
      providesTags:["user"]
    }),
    updateUser: builder.mutation({
      query: ({ UserId, ...data }) => ({
        url: `/users/${UserId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (UserId) => ({
        url: `/users/${UserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    
  }),
});

export const {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;