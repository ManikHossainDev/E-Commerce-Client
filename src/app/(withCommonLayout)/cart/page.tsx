"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import {
  useAddAndUpdateCartMutation,
  useDeleteCartItemMutation,
  useGetSingleCartQuery,
  useReduceCartQtyMutation,
} from "@/src/redux/features/cart/cartApi";
import { useGetSingleCouponMutation } from "@/src/redux/features/coupon/couponApi";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const CartPage = () => {
  const [getDiscountProce, setDiscountProce] = useState<number | null>(null);
  const { data: singleCartData } = useGetSingleCartQuery(undefined);
  const cartData = singleCartData?.data;
  const [increaseQuantity] = useAddAndUpdateCartMutation();
  const [decreseQuantity] = useReduceCartQtyMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const [singleCoupon, { error }] = useGetSingleCouponMutation();

  if (error) {
    toast.error("Invalid Coupon Code");
  }

  const totalSum = cartData?.totalSum;
  const cartItems = cartData?.data?.cartItem || [];
  const VendorId = cartData?.data?.vendorId;

  const handleIncreateQuantity = async (
    productId: string,
    vendorId: string
  ) => {
    const data = { productId, vendorId, quantity: 1 };
    await increaseQuantity(data).unwrap();
  };

  const handleDecreaseQuantity = async (productId: string) => {
    const data = { productId, quantity: 1 };
    await decreseQuantity(data).unwrap();
  };

  const handleDeleteCartItem = async (productId: string) => {
    await deleteCartItem(productId).unwrap();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const couponData = { couponId: data?.Coupon, vendorId: VendorId };
    const res = await singleCoupon(couponData).unwrap();
    if (res.data) {
      const discountPercent = res?.data?.discount;
      const previousPrice = totalSum;
      const discountPrice =
        previousPrice - (previousPrice * discountPercent) / 100;
      localStorage.setItem("discountPrice", JSON.stringify(discountPrice));
      localStorage.setItem(
        "discountCoupon",
        JSON.stringify(res?.data?.couponCode)
      );
    }
    const storedDiscountPrice = localStorage.getItem("discountPrice");
    setDiscountProce(
      storedDiscountPrice ? JSON.parse(storedDiscountPrice) : null
    );
  };

  const handleNotProductWarning = () => {
    toast.error("No product added");
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedDiscountPrice = localStorage.getItem("discountPrice");
  //     setDiscountProce(
  //       storedDiscountPrice ? JSON.parse(storedDiscountPrice) : null
  //     );
  //   }
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Cart
      </h1>

      {/* Total Price Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Total Price:{" "}
          <span className="text-green-600 font-bold">${totalSum || 0}</span>
        </h2>
      </div>

      {/* Cart List */}
      <div className="md:flex gap-10">
        {/* cart info  */}
        <div className="bg-white rounded-lg shadow-md md:w-[70%]">
          <ul>
            {cartItems.map((item: any) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-5 border-b last:border-none"
              >
                <div className="flex items-center">
                  {/* Product Image */}
                  <img
                    src={
                      item.product?.images ||
                      "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
                    }
                    alt={item.product?.name}
                    className="h-16 w-16 object-contain mr-4"
                  />

                  {/* Product Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product?.category}
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      ${item.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product.id)}
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleIncreateQuantity(
                        item.product.id,
                        item.product.userId
                      )
                    }
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
                    title="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDeleteCartItem(item.id)}
                    className="bg-red-400  px-2 py-[6px] text-xl rounded hover:bg-gray-300"
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Buy Info */}
        <div className="md:w-[30%] h-70 bg-white mt-10 md:mt-0 p-6 rounded-lg shadow-md text-black space-y-6">
          {/* Total Price */}
          <h1 className="text-lg font-semibold">
            Discount Price:{" "}
            <span className="text-xl font-bold">
              <span className="text-green-600">
                ${getDiscountProce || totalSum}
              </span>
            </span>
          </h1>

          {/* Coupon Form */}
          <div>
            <FXForm onSubmit={onSubmit}>
              <div className="space-y-4">
                {/* Coupon Input */}
                <FXInput
                  name="Coupon"
                  label="Coupon Code"
                  type="text"
                  size="sm"
                  required
                />

                {/* Submit Button */}
                <Button
                  className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-white font-semibold py-2 hover:from-teal-500 hover:to-purple-600 transition"
                  size="lg"
                  type="submit"
                  isDisabled={cartItems.length === 0}
                >
                  Apply Coupon
                </Button>
              </div>
            </FXForm>
          </div>

          {/* Checkout Button */}
          <div>
            {cartItems.length === 0 ? (
              <button
                onClick={handleNotProductWarning}
                className="block w-full text-center bg-teal-500 text-white font-semibold py-2 rounded-md hover:bg-teal-600 transition"
              >
                Proceed to Checkout
              </button>
            ) : (
              <a
                href="/cart/checkout"
                className="block w-full text-center bg-teal-500 text-white font-semibold py-2 rounded-md hover:bg-teal-600 transition"
              >
                Proceed to Checkout
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="text-center text-gray-600 mt-10">
          <p>Your cart is empty. Start shopping now!</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
