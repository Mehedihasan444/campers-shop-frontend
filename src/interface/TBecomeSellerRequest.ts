export interface BecomeSellerRequest {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }