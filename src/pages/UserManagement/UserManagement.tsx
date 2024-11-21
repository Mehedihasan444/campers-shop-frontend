import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TUser } from "@/interface/TUser";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import UserDeleteConfirmationModal from "./UserDeleteConfirmationModal";
import PaginationComponent from "@/lib/PaginationComponent";

const UserManagement = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const {
    data = {},
    isLoading,
    error,
  } = useGetAllUsersQuery({ role: selectedRole, email: searchEmail,page,limit });
  const { users, totalCount } = data.data || {};
  const [updateUser] = useUpdateUserMutation();

  const handleStatusChange = async (UserId: string, newStatus: string) => {
    try {
      const res = await updateUser({ UserId, status: newStatus });
      if (res?.data?.success) {
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating the status");
    }
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex flex-wrap justify-between items-center gap-5 mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mb-5 border-l-4  border-primary pl-2">User Management</h1>
        </div>
        <div className="">
          <Input
            type="search"
            placeholder="Search by email..."
            className="min-w-80"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <Select
          defaultValue={selectedRole}
          onValueChange={(value) => setSelectedRole(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={"Select Role"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value=" ">All</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="SELLER">SELLER</SelectItem>
              <SelectItem value="BUYER">BUYER</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading users</p>
      ) : (
        <Table className="bg-neutral-50">
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: TUser) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.status}
                    onValueChange={(value) =>
                      handleStatusChange(user?._id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={user.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <UserDeleteConfirmationModal id={user._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Users: {totalCount}</TableCell>
              <TableCell colSpan={4}>
                <PaginationComponent totalCount={totalCount} page={page} limit={limit} onPageChange={handlePageChange}/>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default UserManagement;
