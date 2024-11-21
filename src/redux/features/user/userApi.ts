import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ role, email,limit,page }) => {
        let queryString = "/users?";
        if (role&&role!=" ") queryString += `role=${role}&`;
        if (email) queryString += `email=${email}&`;
        if (limit) queryString += `limit=${limit}&`;
        if (page) queryString += `page=${page}&`;
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getUser: builder.query({
      query: (UserId) => ({
        url: `/users/${UserId}`,
        method: "GET",
      }),
      providesTags: ["user"],
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
