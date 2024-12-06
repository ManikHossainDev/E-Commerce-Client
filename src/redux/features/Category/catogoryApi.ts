import { baseApi } from "../../api/baseApi";

const catogoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/category/${data.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = catogoryApi;
