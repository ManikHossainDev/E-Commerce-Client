"use client";
import { useState } from "react";
import { useGetShopOrderQuery } from "@/src/redux/features/order/orderApi";
import { FaEye } from "react-icons/fa";

const ShopOrderHistory = () => {
  const {
    data: customerOrder,
    isLoading,
    error,
  } = useGetShopOrderQuery(undefined);
  const orderHistory = customerOrder?.data;

  if (isLoading) return <p>Loading order history...</p>;
  // if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <div className="order-history">
      <h1 className="text-2xl font-bold mb-6 text-center">Order History</h1>
      {orderHistory && orderHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-2">Order Date</th>
                <th className="border border-gray-300 px-4 py-2">
                  Payment Status
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Price
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Transaction ID
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order: any, index: number) => (
                <tr
                  key={order.id}
                  className={`${index % 2 === 0 ? "" : ""} hover:bg-gray-800`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.cretedAt).toLocaleDateString()}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${order.totalPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.transactionId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order?.user?.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default ShopOrderHistory;
