import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  tagTypes: ["product", "wishlist"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queries) => {
        const cleanedQueries = Object.entries(queries).reduce((acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});
    
        const params = new URLSearchParams(cleanedQueries);
    
        return {
          url: `/products?${params.toString()}`,
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
        toast.success("Product added successfully");
        return {
        url: "/products",
        method: "POST",
        body: data,
      }},
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        toast.success("Product updated successfully");
        return {
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }},
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        toast.success("Product deleted successfully");
        return {
        url: `/products/${id}`,
        method: "DELETE",
      }},
      invalidatesTags: ["product"],
    }),
//  wishlist
    getWishlistProducts: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    addWishlistProduct: builder.mutation({
      query: (productId) => {
        toast.success("Product added successfully in the cart");
        return {
          url: `/wishlist`,
          method: "POST",
          body: { product: productId },
        };
      },
      invalidatesTags: ["wishlist"],
    }),
    deleteWishlistProduct: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddWishlistProductMutation,
  useDeleteWishlistProductMutation,
  useGetWishlistProductsQuery,
} = baseApi;
