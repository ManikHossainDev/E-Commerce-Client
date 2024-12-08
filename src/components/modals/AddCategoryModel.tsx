import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXInput from "../form/FXInput";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "@/src/redux/features/Category/catogoryApi";
const AddCategoryModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [addCategory, { isLoading }] = useCreateCategoryMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await addCategory(data).unwrap();
    if (res.success) {
      toast.success("Category Added Successfully");
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
        title="Add Category"
        buttonText="Add Category"
        buttonClassName="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput label="Key" name="key" type="text" required></FXInput>
          </div>
          <div className="py-1">
            <FXInput label="Name" name="label" required></FXInput>
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

export default AddCategoryModel;
