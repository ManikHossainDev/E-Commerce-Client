import { baseApi } from "../../api/baseApi";

const followerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowerCount: builder.query({
      query: (shopId) => {
        return {
          url: `/follow-count/${shopId}`,
          method: "GET",
        };
      },
      providesTags: ["follower"],
    }),

    addfollower: builder.mutation({
      query: (shopId) => {
        return {
          url: `/follow/${shopId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["follower"],
    }),

    removeFollower: builder.mutation({
      query: (shopId) => {
        return {
          url: `/unfollow/${shopId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["follower"],
    }),

    checkMyFollo: builder.query({
      query: (shopId) => {
        return {
          url: `/check-my-follow/${shopId}`,
          method: "GET",
        };
      },
      providesTags: ["follower"],
    }),
  }),
});

export const {
  useGetFollowerCountQuery,
  useAddfollowerMutation,
  useRemoveFollowerMutation,
  useCheckMyFolloQuery,
} = followerApi;
