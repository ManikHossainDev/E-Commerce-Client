/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdSpaceDashboard,
  MdSubscriptions,
} from "react-icons/md";
// eslint-disable-next-line import/order
import { IoFastFood } from "react-icons/io5";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import React from "react";

// Loading component (you can customize this as needed)
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <span>Loading...</span>
  </div>
);

const Sidebar = () => {
  const searchParams = useSearchParams();
  const queryValue = searchParams?.get("key");

  const user = useAppSelector(selectCurrentUser);
  // const currentUser: any = user?.user;
  let currenttUser;
  if (user?.token) {
    // currenttUser = verifyToken(user?.token);
  }
  const currenttUserRole = (user as any)?.user?.role;

  return (
    <div className="min-h-screen fixed h-full flex bg-gray-500">
      {/* Dashboard Sidebar */}
      <div className="md:w-64 w-20 bg-gradient-to-b from-purple-900 to-blue-500 pt-6 shadow-2xl relative">
        <ul className="menu flex flex-col items-center md:items-start p-4">
          {/* Logo */}
          <Link href="/dashboard?key=dashboard">
            <div className="flex justify-center mb-8 hover:scale-105 transition-all duration-300">
              <img
                className="md:w-2/6 w-12 rounded-full border border-purple-300 shadow-lg"
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo%2Conline-store-logo%2Ccart-logo-design-template-9b5e4319f7f69b92d7421a048ce90dcb_screen.jpg?ts=1662916038"
                alt="Logo"
              />
            </div> 
          </Link>

          <hr className="border-purple-500 w-full mb-4 opacity-40" />

          {/* Dashboard */}
          <li className="w-full mb-2">
            <Link href="/dashboard?key=dashboard">
              <div
                className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                  queryValue === "dashboard"
                    ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                    : ""
                }`}
              >
                <span className="material-icons md:hidden">
                  <MdSpaceDashboard />
                </span>
                <span className="hidden md:inline-block ml-2">Dashboard</span>
              </div>
            </Link>
          </li>

          {/* recent view Products */}
          <li className="w-full mb-2">
            <Link href="/dashboard/recent-view-products?key=recent-view-products">
              <div
                className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                  queryValue === "recent-view-products"
                    ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                    : ""
                }`}
              >
                <span className="material-icons md:hidden">
                  <IoFastFood />
                </span>
                <span className="hidden md:inline-block ml-2">Recent view</span>
              </div>
            </Link>
          </li>

          {/* Order history */}
          <li className="w-full mb-2">
            <Link href="/dashboard/order-history?key=order-history">
              <div
                className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                  queryValue === "order-history"
                    ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                    : ""
                }`}
              >
                <span className="material-icons md:hidden">
                  <IoFastFood />
                </span>
                <span className="hidden md:inline-block ml-2">My Order</span>
              </div>
            </Link>
          </li>

          {currenttUserRole == "vendor" && (
            <>
              {/* Products */}
              <li className="w-full mb-2">
                <Link href="/dashboard/products?key=products">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "products"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <IoFastFood />
                    </span>
                    <span className="hidden md:inline-block ml-2">
                      Products
                    </span>
                  </div>
                </Link>
              </li>

              {/* cupon */}
              <li className="w-full mb-2">
                <Link href="/dashboard/coupon?key=coupon">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "coupon"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <IoFastFood />
                    </span>
                    <span className="hidden md:inline-block ml-2">Coupon</span>
                  </div>
                </Link>
              </li>

              {/* shop Order history */}
              <li className="w-full mb-2">
                <Link href="/dashboard/shop-order-history?key=shop-order-history">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "shop-order-history"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <IoFastFood />
                    </span>
                    <span className="hidden md:inline-block ml-2">
                      Shop Order History
                    </span>
                  </div>
                </Link>
              </li>
            </>
          )}

          {currenttUserRole == "admin" && (
            <>
              {/* all users */}
              <li className="w-full mb-2">
                <Link href="/dashboard/all-users?key=all-users">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "all-users"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <MdSubscriptions />
                    </span>
                    <span className="hidden md:inline-block ml-2">
                      All User
                    </span>
                  </div>
                </Link>
              </li>

              {/* all shop */}
              <li className="w-full mb-2">
                <Link href="/dashboard/shops?key=shops">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "shops"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <MdSubscriptions />
                    </span>
                    <span className="hidden md:inline-block ml-2">
                      All Shop
                    </span>
                  </div>
                </Link>
              </li>

              {/* category */}
              <li className="w-full mb-2">
                <Link href="/dashboard/category?key=category">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "category"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <MdSubscriptions />
                    </span>
                    <span className="hidden md:inline-block ml-2">
                      Manage Category
                    </span>
                  </div>
                </Link>
              </li>
            </>
          )}

          <hr className="border-purple-500 w-full mb-4 opacity-40" />

          {/* Home */}
          <li className="w-full mb-2">
            <Link href="/">
              <div className="block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl">
                <span className="material-icons md:hidden">
                  <FaHome />
                </span>
                <span className="hidden md:inline-block ml-2">Home</span>
              </div>
            </Link>
          </li>
        </ul>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-300 to-blue-300 opacity-75 blur-lg"></div>
      </div>
    </div>
  );
};

// Wrap Sidebar with Suspense
const SidebarWithSuspense = () => (
  <Suspense fallback={<Loading />}>
    <Sidebar />
  </Suspense>
);

export default SidebarWithSuspense;
