/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit,searchTerm ,sortBy}) => {
        let queryString = "/products?";
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
      providesTags: ["product"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        //!must remove
        //   toast.success("Product deleted successfully");
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
