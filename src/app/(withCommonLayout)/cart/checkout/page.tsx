"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useGetSingleCartQuery } from "@/src/redux/features/cart/cartApi";
import { useCreateOrderMutation } from "@/src/redux/features/order/orderApi";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CheckoutPage = () => {
  const [couponCode, setCouponCode] = useState();
  const [getDiscountProce, setDiscountProce] = useState<number | null>(null);
  const { data: singleCartData } = useGetSingleCartQuery(undefined);
  const cartData = singleCartData?.data;
  const { user } = useAppSelector(selectCurrentUser);
  const [orderCompleate, { isLoading }] = useCreateOrderMutation();

  const totalSum = cartData?.totalSum;
  const cartItems = cartData?.data?.cartItem || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.couponCode = couponCode;
    const res = await orderCompleate(data).unwrap();
    localStorage.removeItem("discountPrice");
    localStorage.removeItem("discountCoupon");
    if (res.success) {
      window.location.href = res.data.payment_url;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDiscountPrice = localStorage.getItem("discountPrice");
      const couponCode = JSON.parse(
        localStorage.getItem("discountCoupon") as any,
      );
      setCouponCode(couponCode);
      setDiscountProce(
        storedDiscountPrice ? JSON.parse(storedDiscountPrice) : null,
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Checkout Page
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
        <div className="bg-white text-black rounded-lg shadow-md md:w-[70%] p-8">
          <FXForm onSubmit={onSubmit}>
            <div className="space-y-4">
              {/* Coupon Input */}
              <div className="md:flex gap-2 space-y-3 md:space-y-0">
                <FXInput
                  name="name"
                  label="Name"
                  type="text"
                  size="sm"
                  defaultValue={user?.name}
                  required
                />
                <FXInput
                  name="email"
                  label="Email"
                  type="email"
                  size="sm"
                  defaultValue={user?.email}
                  required
                  isDisabled
                />
              </div>
              <div className="md:flex gap-2 space-y-3 md:space-y-0">
                <FXInput
                  name="contactNumber"
                  label="Contact Number"
                  type="text"
                  size="sm"
                  defaultValue={(user as any)?.contactNumber}
                  required
                />
                <FXInput
                  name="address"
                  label="Address"
                  type="text"
                  size="sm"
                  defaultValue={(user as any)?.address}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-white font-semibold py-2 hover:from-teal-500 hover:to-purple-600 transition"
                size="lg"
                type="submit"
              >
                {isLoading ? <Spinner /> : "Buy Now"}
              </Button>
            </div>
          </FXForm>
        </div>

        {/* Buy Info */}
        <div className="md:w-[30%] h-70 bg-white mt-10 md:mt-0 p-6 rounded-lg shadow-md text-black space-y-6">
          {/* Total Price */}
          <h1 className="text-lg font-semibold">
            Discount Price:{" "}
            <span className="text-green-600 font-bold">
              ${getDiscountProce || totalSum || 0}
            </span>
          </h1>

          {/* Checkout Button */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
