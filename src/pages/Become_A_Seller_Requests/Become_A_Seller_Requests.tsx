import { Button } from "@/components/ui/button";
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
import { BecomeSellerRequest } from "@/interface/TBecomeSellerRequest";
import {
  useGetAllBecomeASellerQuery,
  useUpdateBecomeASellerMutation,
} from "@/redux/features/becomeASeller/becomeASellerApi";
import BecomeSellerRequestRejectionModal from "./BecomeSellerRequestRejectionModal";
import { toast } from "sonner";

const Become_A_Seller_Requests = () => {
  const { data = [], isLoading, error } = useGetAllBecomeASellerQuery("");
  const { data: requests } = data || {};
  const [updateBecomeASeller] = useUpdateBecomeASellerMutation();


  const handleApprove =async (BecomeASellerId: string) => {
    // Handle Approve request
    try {
        const res = await updateBecomeASeller({
          BecomeASellerId,
          status : "APPROVED",
        });
        console.log(res)
        if (res?.data?.success) {
          toast.success("Request approved successfully");
        } else {
          toast.error("Failed to approved request");
        }
      } catch (error) {
        toast.error("An error occurred while approving the request");
      }
  };
  const handleReject = async (
    BecomeASellerId: string,
    rejectionReason: string
  ) => {
    try {
      const res = await updateBecomeASeller({
        BecomeASellerId,
        rejectionReason,status : "REJECTED",
      });
      if (res?.data?.success) {
        toast.success("Request rejected successfully");
      } else {
        toast.error("Failed to reject request");
      }
    } catch (error) {
      toast.error("An error occurred while rejecting the request");
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Become a Seller Requests</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading requests</p>
      ) : (
        <Table>
          <TableCaption>A list of all seller requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request: BecomeSellerRequest) => (
              <TableRow key={request._id}>
                <TableCell className="font-medium">{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleApprove(request._id)}
                    disabled={request.status === "REJECTED"|| request.status ==="APPROVED"}
                  >
                    Approve
                  </Button>

                  <Button variant="destructive" disabled={request.status === "REJECTED"|| request.status ==="APPROVED"}>
                    <BecomeSellerRequestRejectionModal
                      requestId={request._id}
                      onReject={handleReject}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Requests: {requests.length}</TableCell>
          </TableRow>
        </Table>
      )}
    </div>
  );
};

export default Become_A_Seller_Requests;
