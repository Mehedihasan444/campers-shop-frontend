import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (CategoryId) => ({
        url: `/category/${CategoryId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ CategoryId, ...data }) => ({
        url: `/category/${CategoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (CategoryId) => ({
        url: `/category/${CategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
