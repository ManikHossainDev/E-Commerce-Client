"use client";
import { useState } from "react";
import { useGetCustomerOrderQuery } from "@/src/redux/features/order/orderApi";
import { FaEye } from "react-icons/fa";

const OrderHistory = () => {
  const {
    data: customerOrder,
    isLoading,
    error,
  } = useGetCustomerOrderQuery(undefined);
  const orderHistory = customerOrder?.data;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Open the modal and set the selected order
  const handleOpenModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

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
                <th className="border border-gray-300 px-4 py-2">Products</th>
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
                    <div
                      onClick={() => handleOpenModal(order)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" || e.key === " "
                          ? handleOpenModal(order)
                          : null
                      }
                      className="flex justify-center text-xl text-green-500 items-center hover:text-green-300 cursor-pointer"
                      aria-label="View Order Details"
                    >
                      <FaEye />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}

      {/* Modal for showing order product details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className=" bg-slate-700 p-6 rounded shadow-lg w-3/4 max-w-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
            </p>
            <p>
              <strong>Total Price:</strong> ${selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Transaction ID:</strong> {selectedOrder.transactionId}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.cretedAt).toLocaleDateString()}
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Products:</h3>
            <ul className="space-y-2">
              {selectedOrder?.productInfo?.cartItem?.map(
                (item: any, index: number) => (
                  <li key={index} className="border-b py-2">
                    <p>
                      <strong>Product Name:</strong> {item.productName}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ${item.price}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
