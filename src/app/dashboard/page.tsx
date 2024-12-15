"use client";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
import UpdateShopInfoModel from "@/src/components/modals/UpdateShopInfoModel";
import { useGetFollowerCountQuery } from "@/src/redux/features/Follower/followerApi";
import { useGetSingleshopQuery } from "@/src/redux/features/shop/shopApi";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: myData } = useGetMyDataQuery(undefined);
  const currentUserData = myData?.data;

  const userId = currentUserData?.id;
  const { data: shopData } = useGetSingleshopQuery(userId, { skip: !userId });
  const myShopInfo = shopData?.data;
  const shopId = myShopInfo?.id;

  const { data: getFollowerCount } = useGetFollowerCountQuery(shopId);
  const followerThisShop = getFollowerCount?.data?.follower;


  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto bg-white/60 shadow-xl rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-gray-800 py-6">
          Dashboard
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
            <img
              src={
                currentUserData?.profilePhoto ||
                "https://i.ibb.co.com/JkhYcqX/icon-5359553-1280.webp"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentUserData?.name || "User Name"}
            </h2>
            <p className="text-gray-600 mt-2">
              {currentUserData?.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        {currentUserData && currentUserData?.role === "vendor" && (
          <>
            <h1 className="text-center font-semibold text-xl">Shop Info</h1>
            <div className="grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-4">
              <div className="bg-gray-500 p-4 rounded-lg shadow">
                <h4 className=" font-semibold text-gray-200">Followers</h4>
                <p className=" text-gray-200">{followerThisShop || 0}</p>
              </div>
              <div className="bg-gray-500 p-4 rounded-lg shadow">
                <h4 className=" font-semibold text-gray-200">Shop Name</h4>
                <p className=" text-gray-200">
                  {myShopInfo?.name || "No name"}
                </p>
              </div>
              <div className="bg-gray-500 p-4 rounded-lg shadow">
                <h4 className=" font-semibold text-gray-200">Shop Title</h4>
                <p className=" text-gray-200">
                  {myShopInfo?.title || "No title"}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Actions Section */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-center items-center space-x-4">
          {currentUserData && currentUserData?.role == "vendor" && (
            <UpdateShopInfoModel shopInfo={myShopInfo} />
          )}

          <ChangePasswordModal />
        </div>

        {/* Account Details */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Account Details
          </h3>
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <p className="text-black">
              <strong>Role:</strong> {currentUserData?.role || "No role"}
            </p>
            <p className="text-black">
              <strong>Active:</strong> Yes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
