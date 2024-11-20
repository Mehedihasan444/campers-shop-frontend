import { baseApi } from "@/redux/api/baseApi";

const becomeASellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBecomeASeller: builder.query({
      query: () => ({
        url: "/become-a-seller-requests",
        method: "GET",
      }),
      providesTags: ["become_a_seller"],
    }),
    getBecomeASeller: builder.query({
      query: (BecomeASellerId) => ({
        url: `/become-a-seller-requests/${BecomeASellerId}`,
        method: "GET",
      }),
      providesTags: ["become_a_seller"],
    }),
    addBecomeASeller: builder.mutation({
        query: (data) => {
          return {
            url: "/become-a-seller-requests",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["product"],
      }),
    updateBecomeASeller: builder.mutation({
      query: ({ BecomeASellerId, ...data }) => ({
        url: `/become-a-seller-requests/${BecomeASellerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["become_a_seller"],
    }),
    deleteBecomeASeller: builder.mutation({
      query: (BecomeASellerId) => ({
        url: `/become-a-seller-requests/${BecomeASellerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["become_a_seller"],
    }),
  }),
});

export const {
  useDeleteBecomeASellerMutation,
  useGetAllBecomeASellerQuery,
  useGetBecomeASellerQuery,
  useUpdateBecomeASellerMutation,
    useAddBecomeASellerMutation,
} = becomeASellerApi;
