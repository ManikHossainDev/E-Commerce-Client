import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerOrder: builder.query({
      query: () => {
        return {
          url: "/order/for-customer",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    getShopOrder: builder.query({
      query: (id) => {
        return {
          url: `/order/for-vendor`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetCustomerOrderQuery,
  useGetShopOrderQuery,
} = orderApi;
