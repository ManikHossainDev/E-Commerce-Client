"use client";
import SingleProductCard from "@/src/components/Card/SingleProductCard";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useGetSingleProductQuery } from "@/src/redux/features/products/productApi";
import { useAppSelector } from "@/src/redux/hooks";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const userId = (user as any)?.id;
  const { productId } = useParams();
  const data = { productId, userId };
  const { data: singleData } = useGetSingleProductQuery(data);
  const singleProduct = singleData?.data;

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center">
      <SingleProductCard products={singleProduct} />
    </div>
  );
};

export default SingleProductPage;
