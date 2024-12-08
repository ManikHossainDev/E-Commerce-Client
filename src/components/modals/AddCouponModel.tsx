import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXInput from "../form/FXInput";
import { useCreateCouponMutation } from "@/src/redux/features/coupon/couponApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const AddCouponModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [addCoupon, { isLoading, isError }] = useCreateCouponMutation();
  useEffect(() => {
    if (isError) {
      toast.error("This coupon is not available. Try another one.");
    }
  }, [isError]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const discount = Number(data.discount);
    data.discount = discount;
    const res = await addCoupon(data).unwrap();
    if (res.success) {
      toast.success("Coupon Added Successfully");
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
        title="Add Coupon"
        buttonText="Add Coupon"
        buttonClassName="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="Descount Percentage"
              name="discount"
              type="number"
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput label="Coupon Code" name="couponCode" required></FXInput>
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

export default AddCouponModel;
