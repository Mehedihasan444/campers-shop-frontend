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
import { useDeleteProductMutation } from "@/redux/api/api";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface ConfirmationModalProps {
  id: string;
  message: string;
}

const ConfirmationModal = ({ message, id }: ConfirmationModalProps) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    const res = await deleteProduct(id);
    if (res.data.success) {
      toast.success("Product deleted successfully.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  ><Trash/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <Button onClick={handleDelete}>
            Yes
          </Button>
          <DialogClose asChild>
            <Button>No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
