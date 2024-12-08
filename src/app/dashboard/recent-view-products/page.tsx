"use client";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useRecentViewProductsQuery } from "@/src/redux/features/products/productApi";
import { useAppSelector } from "@/src/redux/hooks";

const RecentViewProducts = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const { data: recentViewProducts } = useRecentViewProductsQuery(
    (user as any)?.id,
  );
  const recentViewProductsData = recentViewProducts?.data;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center pt-10 px-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Recently Viewed Products
        </h1>

        {recentViewProductsData && recentViewProductsData.length == 0 && (
          <p className="text-gray-600 text-center">
            No recently viewed products found.
          </p>
        )}
        {/* Desktop and Tablet: Futuristic Table */}
        <div className="overflow-x-auto shadow-2xl bg-gray-800 rounded-lg p-6 hidden md:block">
          <table className="min-w-full table-auto text-sm">
            {/* Head */}
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {recentViewProductsData?.map((product: any, idx: number) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={
                        product?.images ||
                        "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price}
                  </td>
                  <td className="py-4 flex space-x-4 justify-center">
                    <a
                      href={`/product/${product.id}`}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-700 rounded-full text-sm transition duration-300"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="block md:hidden">
          {recentViewProductsData?.map((product: any, idx: number) => (
            <div
              key={product.id}
              className="border-b border-gray-700 p-4 mb-4 rounded-lg shadow-lg bg-gray-700"
            >
              <div className="flex justify-between">
                <span className="font-semibold text-purple-500">{idx + 1}</span>
                <a
                  href={`/product/${product.id}`}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-700 rounded-full text-sm transition duration-300"
                >
                  View
                </a>
              </div>
              <div className="mt-2">
                <p className="text-gray-200">
                  <span className="font-semibold">Name:</span> {product.name}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Title:</span> {product.title}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Price:</span> ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentViewProducts;
