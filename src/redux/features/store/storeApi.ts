import { baseApi } from "@/redux/api/baseApi";

const storeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStore: builder.query({
      query: ({ page, limit, searchTerm, sortBy }) => {
        let queryString = "/store?";
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
      providesTags: ["store"],
    }),
    getStore: builder.query({
      query: (StoreId) => ({
        url: `/store/${StoreId}`,
        method: "GET",
      }),
      providesTags: ["store"],
    }),
    updateStore: builder.mutation({
      query: ({ StoreId, ...data }) => ({
        url: `/store/${StoreId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["store"],
    }),
    deleteStore: builder.mutation({
      query: (StoreId) => ({
        url: `/store/${StoreId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["store"],
    }),
  }),
});

export const {
  useDeleteStoreMutation,
  useGetAllStoreQuery,
  useGetStoreQuery,
  useUpdateStoreMutation,
} = storeApi;
