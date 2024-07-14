import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";


interface Queries {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Use the appropriate type instead of `any` if you know it
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  tagTypes: ["product", "wishlist","order","review"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queries) => {
        const cleanedQueries = Object.entries(queries).reduce<Queries>((acc, [key, value]) => {
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
    // review: builder
    getReviews: builder.query({
      query: (queries) => {
        const cleanedQueries = Object.entries(queries).reduce<Queries>((acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});
    
        const params = new URLSearchParams(cleanedQueries);
    
        return {
          url: `/reviews?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getReview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (data) => {
        
        return {
        url: "/reviews",
        method: "POST",
        body: data,
      }},
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => {
        toast.success("Review updated successfully");
        return {
        url: `/reviews/${id}`,
        method: "PUT",
        body: data,
      }},
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        toast.success("Review deleted successfully");
        return {
        url: `/reviews/${id}`,
        method: "DELETE",
      }},
      invalidatesTags: ["review"],
    }),
    //orders: builder 
    order: builder.mutation({
      query: (data) => {
        toast.success("Order placed successfully");
        console.log(data)
        return {
        url: "/order",
        method: "POST",
        body: data,
      }},
      invalidatesTags: ["order","product"],
    }),
//  wishlist : builder
    getWishlistProducts: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    addWishlistProduct: builder.mutation({
      query: (productId) => {
       
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
  useOrderMutation,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewQuery,
  useGetReviewsQuery
} = baseApi;
