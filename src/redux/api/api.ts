import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["product"],

  endpoints: (builder) => ({ 
    getProducts: builder.query({
        query: () => ({
            url: "/products",
            method: "GET",
        }),
        providesTags: ["product"],
      }),
    getProduct: builder.query({
        query: (id) => ({
            url: `/products/${id}`,
            method: "GET",
        }),
        providesTags: ["product"],
      }),
      //
      addProduct: builder.mutation({
        query: (data) => ({
          url: "/products",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["product"],
      }),
      //
      updateProduct: builder.mutation({
        query: (options) => {
          return {
            url: `/products/${options.id}`,
            method: "PUT",
            body: options.data,
          };
        },
        invalidatesTags: ["product"],
      }),
      //
      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/products/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["product"],
      }),
    }),
   })


export const {
    useAddProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
} = baseApi;