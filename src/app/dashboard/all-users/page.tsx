"use client";

import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAlluserQuery,
  useUnblockUserMutation,
  useUpdateuserMutation,
} from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: alluser } = useGetAlluserQuery(undefined);
  const userData = alluser?.data;
  const [userUpdate] = useUpdateuserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [blockedUser] = useBlockUserMutation();
  const [unblockedUser]= useUnblockUserMutation();

  const handleUnblockUser = async (id: string) => {
    const res = await unblockedUser(id).unwrap();
  };
  const handleBlockUser = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Vendor, Shop and Product will be blocked!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, blocked!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await blockedUser(id).unwrap();
        if (res) {
          toast.success("User blocked successfully");
        }
      }
    });
  };
  const handleDeleteUser = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Vendor, Shop adn Product will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(id).unwrap();
        if (res) {
          toast.success("User deleted successfully");
        }
      }
    });
  };

  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center pt-10 px-4">
      <div className="w-full max-w-6xl">
        {/* Futuristic Table Container for desktop and tablet */}
        <div className="overflow-x-auto shadow-2xl bg-gray-800 rounded-lg p-6 hidden md:block">
          <table className="min-w-full table-auto text-sm">
            {/* Head */}
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {userData?.map((user: any, idx: number) => (
                <tr
                  key={user?.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {user?.role}
                  </td>
                  <td className=" py-4 items-center whitespace-nowrap flex justify-center md:justify-start space-x-4">
                    <div>
                      {user?.status == "blocked" ? (
                        <button
                          onClick={() => handleUnblockUser(user?.id)}
                          className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockUser(user?.id)}
                          className="px-2 py-1 bg-yellow-500 hover:bg-yellow-700 rounded-full text-sm transition duration-300"
                        >
                          Block
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user?.id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-full  transition duration-300"
                    >
                      Delete
                    </button>
                    {/* <button onClick={() => handleUpdateUser(user)}>
                      <UpdateUserModal user={selectUser} />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Card Layout */}
        <div className="block md:hidden">
          {userData?.map((user: any, idx: number) => (
            <div
              key={user?.id}
              className="border-b border-gray-700 p-4 mb-4 rounded-lg shadow-lg bg-gray-700"
            >
              <div className="flex justify-between">
                <span className="font-semibold text-purple-500">{idx + 1}</span>
                <div className="space-x-2">
                  {user?.isBlocked ? (
                    <button
                      onClick={() => handleUnblockUser(user?.id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user?.id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-700 rounded-full text-sm transition duration-300"
                    >
                      Block
                    </button>
                  )}
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300">
                    Delete
                  </button>
                  {/* <button onClick={() => handleUpdateUser(user)}>
                    <UpdateUserModal user={selectUser} />
                  </button> */}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-200">
                  <span className="font-semibold">Name:</span> {user?.name}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Role:</span> {user?.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
