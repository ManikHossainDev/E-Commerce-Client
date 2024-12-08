import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useUpdateShopMutation } from "@/src/redux/features/shop/shopApi";

const UpdateShopInfoModel = ({ shopInfo }: { shopInfo: any }) => {
  const [updateShop, { isLoading, error }] = useUpdateShopMutation();
  if (error) {
    toast.error((error as any)?.data?.message);
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateShop(data).unwrap();
    if (res?.data) {
      toast.success(res?.message);
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Update Shop Info"
        buttonText="Update Shop Info"
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="Shop Name"
              name="name"
              defaultValue={shopInfo?.name}
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Shop Title"
              name="title"
              defaultValue={shopInfo?.title}
            ></FXInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Update
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default UpdateShopInfoModel;
