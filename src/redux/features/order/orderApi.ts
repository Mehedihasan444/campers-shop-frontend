import { baseApi } from "@/redux/api/baseApi";

interface IQueries {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Use the appropriate type instead of `any` if you know it
  }
const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  //orders: builder 
  order: builder.mutation({
    query: (data) => {
        //!must remove
    //   toast.success("Order placed successfully");
      console.log(data)
      return {
      url: "/order",
      method: "POST",
      body: data,
    }},
    invalidatesTags: ["order","product"],
  }),
  getOrders: builder.query({
    query: (queries) => {
      const cleanedQueries = Object.entries(queries).reduce<IQueries>((acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});
  
      const params = new URLSearchParams(cleanedQueries);
  
      return {
        url: `/orders?${params.toString()}`,
        method: "GET",
      };
    },
    providesTags: ["order"],
  }),
  getOrder: builder.query({
    query: (id) => ({
      url: `/orders/${id}`,
      method: "GET",
    }),
    providesTags: ["order"],
  }),

    })})

export const {
    useOrderMutation,
    useGetOrdersQuery,
    useGetOrderQuery,
}=orderApi;