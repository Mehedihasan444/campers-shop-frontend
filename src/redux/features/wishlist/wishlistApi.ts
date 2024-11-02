import { baseApi } from "@/redux/api/baseApi";

//  wishlist : builder
const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useAddWishlistProductMutation,
  useDeleteWishlistProductMutation,
  useGetWishlistProductsQuery,
} = wishlistApi;
