import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FXModal from "./FXModal";
import { useAddProductMutation } from "@/src/redux/features/products/productApi";
import { useEffect, useState } from "react";
import FXSelect from "../form/FXSelect";
import { useGetAllCategoryQuery } from "@/src/redux/features/Category/catogoryApi";

// const categoryOptions = [
//   { key: "electronics", label: "Electronics" },
//   { key: "fashion", label: "Fashion" },
//   { key: "home_appliances", label: "Home Appliances" },
//   { key: "beauty", label: "Beauty and Personal Care" },
//   { key: "sports", label: "Sports and Fitness" },
//   { key: "books", label: "Books and Stationery" },
//   { key: "toys", label: "Toys and Games" },
//   { key: "automotive", label: "Automotive Accessories" },
//   { key: "groceries", label: "Groceries" },
//   { key: "furniture", label: "Furniture" },
//   { key: "health", label: "Health and Wellness" },
//   { key: "pet_supplies", label: "Pet Supplies" },
//   { key: "tools", label: "Tools and Hardware" },
//   { key: "baby_products", label: "Baby Products" },
//   { key: "outdoor", label: "Outdoor and Gardening" },
//   { key: "gaming", label: "Gaming" },
//   { key: "footwear", label: "Footwear" },
//   { key: "stationery", label: "Stationery" },
//   { key: "kitchen", label: "Kitchen and Dining" },
//   { key: "travel", label: "Travel Accessories" },
// ];

const AddProductModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const { data: getAllCategory } = useGetAllCategoryQuery(undefined);
  const categoryOptions = getAllCategory?.data;


  if (error) {
    toast.error((error as any)?.data?.message);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.role == "") {
      toast.error("Please select category");
      return;
    }
    if (!data.category) {
      toast.error("Please select a category");
      return;
    }
    const price = Number(data.price);
    const inventoryCount = Number(data.inventoryCount);
    data.price = price;
    data.inventoryCount = inventoryCount;
    const res = await addProduct(data).unwrap();
    if (res?.data) {
      toast.success(res?.message);
    }
  };

  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Add Product"
        buttonText="Add Product"
        buttonClassName="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-all"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput label="Name" name="name" required></FXInput>
          </div>
          <div className="py-1">
            <FXInput label="Title" name="title" required></FXInput>
          </div>
          <div className="py-1">
            <FXSelect
              label="Category"
              name="category"
              options={categoryOptions}
              required
            ></FXSelect>
          </div>
          <div className="py-1"></div>
          <div className="py-1">
            <FXInput
              label="Price"
              name="price"
              type="number"
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Quantity"
              name="inventoryCount"
              type="number"
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput label="Images" name="images"></FXInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Add Product
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default AddProductModel;
