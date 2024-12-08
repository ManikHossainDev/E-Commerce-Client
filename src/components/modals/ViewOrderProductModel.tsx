import FXModal from "./FXModal";

const ViewOrderProductModel = ({ order }: { order: any }) => {
  return (
    <div>
      <FXModal
        title="Product Details"
        buttonText="👁️‍🗨️"
        buttonClassName="px-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-all"
      >
        <div>asdf</div>
      </FXModal>
    </div>
  );
};

export default ViewOrderProductModel;
