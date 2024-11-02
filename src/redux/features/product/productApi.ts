/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

interface IQueries {
  [key: string]: any;
}
const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queries) => {
        // if (queries.searchTerm === "") {
        //   delete queries.searchTerm;
        // }
        const cleanedQueries = Object.entries(queries).reduce<IQueries>(
          (acc, [key, value]) => {
            if (value !== "") {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );

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
