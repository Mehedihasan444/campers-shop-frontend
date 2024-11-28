import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import { useDeleteStoreMutation } from "@/redux/features/store/storeApi";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface ConfirmationModalProps {
  id: string;
  message: string;
  item: string;
}

const ConfirmationModal = ({ message, id, item }: ConfirmationModalProps) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteStore] = useDeleteStoreMutation();

  const handleDelete = async () => {
    try {
      if (item === "Product") {
        const res = await deleteProduct(id);
        if (res.data.success) {
          toast.success(`${item} deleted successfully.`);
        }
      } else if (item === "Category") {
        const res = await deleteCategory(id);
        if (res.data.success) {
          toast.success(`${item} deleted successfully.`);
        }
      }
      else if (item === "Store") {
        const res = await deleteStore(id);
        if (res.data.success) {
          toast.success(`${item} deleted successfully.`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleDelete} variant={"destructive"}>Yes</Button>
          <DialogClose asChild>
            <Button variant={"outline"}>No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
