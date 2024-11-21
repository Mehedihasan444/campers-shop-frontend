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
import { useDeleteUserMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";

const UserDeleteConfirmationModal = ({ id }: { id: string }) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteUser(id);
      if (res.data.success) {
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("An error occurred while deleting user");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <Button onClick={handleDelete} variant={"destructive"}>
            Yes
          </Button>
          <DialogClose asChild>
            <Button variant={"outline"}>No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteConfirmationModal;
