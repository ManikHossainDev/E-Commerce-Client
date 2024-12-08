import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXInput from "../form/FXInput";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateCategoryMutation } from "@/src/redux/features/Category/catogoryApi";
const UpdateCategoryModel = ({ category }: { category: any }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const findlData = { data, id: category.id };
    const res = await updateCategory(findlData).unwrap();
    if (res.success) {
      toast.success("Category Updated Successfully");
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
        title="Update Category"
        buttonText="📝"
        buttonClassName="hover:bg-green-500 transition-all"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="Key"
              name="key"
              type="text"
              defaultValue={category?.key}
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Name"
              name="label"
              defaultValue={category?.label}
              required
            ></FXInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default UpdateCategoryModel;
