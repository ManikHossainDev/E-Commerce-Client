"use client";
import React, { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/src/redux/features/Category/catogoryApi";
import { MdDelete } from "react-icons/md";
import AddCategoryModel from "@/src/components/modals/AddCategoryModel";
import { toast } from "sonner";
import Swal from "sweetalert2";
import UpdateCategoryModel from "@/src/components/modals/updateCategory";

const CategoryPage = () => {
  const [categoryId, setCategoryId] = useState("");
  const { data: getAllCategory } = useGetAllCategoryQuery(undefined);
  const categoryOptions = getAllCategory?.data;
  const [deleteCategory] = useDeleteCategoryMutation();

  const findCatgory = categoryOptions?.find(
    (category: any) => category.id == categoryId
  );
  const handleDeleteCoupon = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCategory(id).unwrap();
        if (res.success) toast.success("Category Deleted Successfully");
      }
    });
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto  shadow-md rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold ">Manage Category</h1>
          <button className="">
            <AddCategoryModel />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Key
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryOptions?.length > 0 ? (
                categoryOptions.map((coupon: any, index: number) => (
                  <tr key={coupon.id} className="hover:bg-gray-800">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {coupon.key}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {coupon.label}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      <div className="flex justify-center items-center gap-2">
                        <div
                          onClick={() => handleDeleteCoupon(coupon?.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") &&
                            handleDeleteCoupon(coupon?.id)
                          }
                          className=" text-xl text-red-500 items-center hover:text-red-300"
                          aria-label="Delete coupon"
                        >
                          <MdDelete />
                        </div>

                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setCategoryId(coupon?.id)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setCategoryId(coupon?.id);
                            }
                          }}
                        >
                          <UpdateCategoryModel category={findCatgory} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-600">
                    No category available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
