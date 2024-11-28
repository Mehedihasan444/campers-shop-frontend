import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: ({ page, limit, searchTerm, sortBy }) => {
        let queryString = "/category?";
        if (page) {
          queryString += `page=${page}&`;
        }
        if (limit) {
          queryString += `limit=${limit}&`;
        }
        if (sortBy) {
          queryString += `sortBy=${sortBy}&`;
        }
        if (searchTerm) {
          queryString += `searchTerm=${searchTerm}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (CategoryId) => ({
        url: `/category/${CategoryId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
      query: (data ) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ CategoryId, formData }: { CategoryId: string; formData: FormData }) => ({
        url: `/category/${CategoryId}`,
        method: "PUT",
        body: formData,
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
  useAddCategoryMutation
} = categoryApi;
