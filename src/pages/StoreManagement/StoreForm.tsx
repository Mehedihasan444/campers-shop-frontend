import { TStore } from "@/interface/TStore";

const StoreForm = ({ initialData }: { initialData: TStore | null }) => {
  return <div>{initialData?.name}</div>;
};

export default StoreForm;
