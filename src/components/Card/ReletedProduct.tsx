import React from "react";

import Link from "next/link";

const ReletedProduct = ({ products }: { products: any }) => {

  return (
    <div className="max-w-xs mx-auto bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-y-105 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative">
        <img
          className="object-cover rounded-lg shadow-sm w-full h-40"
          src={
            products?.images ||
            "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
          }
          alt={products?.title || "Product Image"}
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Link
            href={`/product/${products?.id}`}
            className="text-xs px-3 py-1 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-3 py-2">
        {/* Product Title */}
        <h3 className="text-sm font-semibold text-white truncate">
          {products?.name || "Product Name"}
        </h3>

        <div className="flex items-center justify-between mt-1">
          {/* Product Price */}
          <div className="flex items-center">
            <span className="text-teal-400 text-xs font-medium mr-1">
              Price:
            </span>
            <p className="text-sm text-white font-semibold">
              ${products?.price || "N/A"}
            </p>
          </div>

          {/* Divider */}
          <span className="text-gray-600 mx-2">|</span>

          {/* Product Quantity */}
          <div className="flex items-center">
            <span className="text-teal-400 text-xs font-medium mr-1">Qty:</span>
            <p className="text-sm text-white font-semibold">
              {products?.inventoryCount || "N/A"}
            </p>
          </div>
        </div>

        {/* Short Description */}
        <Link
          href={`/product/${products?.id}`}
          className="text-gray-400 text-xs mt-2 block truncate"
        >
          {products?.title?.slice(0, 50) || "No description available."}...
        </Link>
      </div>
    </div>
  );
};

export default ReletedProduct;
