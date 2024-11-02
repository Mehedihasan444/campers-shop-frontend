import { baseApi } from "@/redux/api/baseApi";


const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
// review: builder
getReviews: builder.query({
    query: (id) => {
  
      return {
        url: `/reviews/${id}`,
        method: "GET",
      };
    },
    providesTags: ["review"],
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
        //!must remove
    //   toast.success("Review updated successfully");
      return {
      url: `/reviews/${id}`,
      method: "PUT",
      body: data,
    }},
    invalidatesTags: ["review"],
  }),
  deleteReview: builder.mutation({
    query: (id) => {
        //!must remove
    //   toast.success("Review deleted successfully");
      return {
      url: `/reviews/${id}`,
      method: "DELETE",
    }},
    invalidatesTags: ["review"],
  }),

    })})

export const {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetReviewQuery,
    useGetReviewsQuery,
}=reviewApi;