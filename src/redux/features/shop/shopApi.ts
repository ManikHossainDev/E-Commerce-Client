import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllshop: builder.query({
      query: () => {
        return {
          url: "/shop",
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),

    getSingleshop: builder.query({
      query: (id) => {
        return {
          url: `/shop/${id}`,
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),

    addShop: builder.mutation({
      query: (data) => {
        return {
          url: "/shop",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["shop"],
    }),

    updateShop: builder.mutation({
      query: (data) => {
        return {
          url: `/shop`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["shop"],
    }),

    deleteshop: builder.mutation({
      query: (id) => {
        return {
          url: `/comment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["shop"],
    }),
  }),
});

export const {
  useGetAllshopQuery,
  useAddShopMutation,
  useGetSingleshopQuery,
  useUpdateShopMutation,
  useDeleteshopMutation,
} = shopApi;
