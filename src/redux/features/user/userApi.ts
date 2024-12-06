import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlluser: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    getMyData: builder.query({
      query: () => {
        return {
          url: `/user/me`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    adduser: builder.mutation({
      query: (data) => {
        return {
          url: "/user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),

    updateuser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),

    blockUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/block/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),

    unblockUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/unblock/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAlluserQuery,
  useAdduserMutation,
  useGetMyDataQuery,
  useUpdateuserMutation,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApi;
