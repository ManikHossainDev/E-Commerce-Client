"use client";
import AddProductModel from "@/src/components/modals/AddProductModel";
import DublicateProductModal from "@/src/components/modals/DublicateProductModel";
import UpdateProductModal from "@/src/components/modals/UpdateProductModel";
import {
  useGetMyProductQuery,
  useSoftDeleteProductMutation,
} from "@/src/redux/features/products/productApi";
import Link from "next/link";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Products = () => {
  const [dublicateProductId, setDublicateProductId] = useState("");
  const { data: getMyProducts } = useGetMyProductQuery(undefined);
  const myPruducts = getMyProducts?.data;
  const [deleteProduct] = useSoftDeleteProductMutation();

  const findSingleProduct = myPruducts?.find(
    (product: any) => product?.id === dublicateProductId,
  );

  const handleDelete = (id: string) => {
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
        const res = await deleteProduct(id).unwrap();
        if (res) {
          toast.success(res?.message);
        }
      }
    });
  };

  const handleDublicateId = (id: string) => {
    setDublicateProductId(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-10 px-4">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <button>
          <AddProductModel />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pt-10">
        { myPruducts && myPruducts?.map((product: any) => (
          <div
            key={product?.id}
            className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <Link href={`/product/${product?.id}`} className="block">
              <img
                className="h-48 w-full object-cover rounded-t-lg"
                src={
                  product?.images ||
                  "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
                }
                alt={product?.name || "Product Image"}
              />
            </Link>

            <div className="px-4 py-1">
              {/* Product Title */}
              <Link href={`/product/${product?.id}`} className="block">
                <h2 className="text-lg font-bold text-teal-400 hover:text-teal-300 transition-colors duration-200">
                  {product?.name || "Unnamed Product"}
                </h2>
              </Link>

              {/* Product Rating */}
              <div className="flex items-center text-yellow-400">
                <span className="text-lg">&#9733;</span>
                <p className="ml-1 text-sm text-gray-300">
                  {product?.rating || "No Rating"}
                </p>
              </div>

              {/* Product Price and Quantity */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Price:</span> $
                  {product?.price || "N/A"}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Qty:</span>{" "}
                  {product?.inventoryCount || "N/A"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-2 gap-2">
                <button
                  onClick={() => handleDublicateId(product?.id)}
                  className=""
                >
                  <DublicateProductModal product={findSingleProduct} />
                </button>
                <button onClick={() => handleDublicateId(product?.id)}>
                  <UpdateProductModal product={findSingleProduct} />
                </button>
                <button
                  onClick={() => handleDelete(product?.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 transition-all"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
