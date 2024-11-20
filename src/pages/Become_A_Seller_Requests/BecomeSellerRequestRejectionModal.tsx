import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BecomeSellerRequestRejectionModalProps {
  requestId: string;
  onReject: (id: string, reason: string) => void;
}

const BecomeSellerRequestRejectionModal: React.FC<
  BecomeSellerRequestRejectionModalProps
> = ({ requestId, onReject }) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReject = () => {
    onReject(requestId, rejectionReason);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Reject</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Seller Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this seller request.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <Label htmlFor="reason" className="text-right">
            Reason
          </Label>
          <Textarea
            id="reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="col-span-3 mt-2"
            placeholder="Enter the reason for rejection"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setRejectionReason("")}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeSellerRequestRejectionModal;
