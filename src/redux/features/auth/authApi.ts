import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    forgetPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    resitPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password/${data?.token}`,
        method: "POST",
        body: data?.data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-passwod`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResitPasswordMutation,
  useChangePasswordMutation,
} = authApi;
