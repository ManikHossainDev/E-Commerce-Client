import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorCoupon: builder.query({
      query: () => {
        return {
          url: "/coupon",
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),

    getSingleCoupon: builder.mutation({
      query: (data) => {
        return {
          url: `/coupon/${data?.couponId}`,
          method: "POST",
          body: { vendorId: data.vendorId },
        };
      },
    }),

    createCoupon: builder.mutation({
      query: (data) => {
        return {
          url: "/coupon",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["coupon"],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupon/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetVendorCouponQuery,
  useGetSingleCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
