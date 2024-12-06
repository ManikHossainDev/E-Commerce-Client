"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FXForm from "@/src/components/form/FXForm";
import { useAddShopMutation } from "@/src/redux/features/shop/shopApi";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";

const CreateShop = () => {
  const router = useRouter();

  const [createShop, { isLoading, error }] = useAddShopMutation();

  useEffect(() => {
    if ((error as any)?.status == 500) {
      toast.error("Shop already created");
    }
  }, [error]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await createShop(data).unwrap();
    if (res?.data) {
      toast.success(`${res?.message}`);
      router.push("/dashboard?key=dashboard");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Create Your Shop
        </h3>
        <p className="text-center text-default-800 mb-6">
          Create your account to get started.
        </p>

        <FXForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <FXInput name="name" label="Name" size="sm" required />
            <FXInput
              name="title"
              label="Title"
              type="text"
              size="sm"
              required
            />
            <FXInput name="logo" label="Logo" type="text" size="sm" />

            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </FXForm>
      </div>
    </div>
  );
};

export default CreateShop;
