import { TProduct } from "./TProduct";

interface Owner {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TStore {
  _id: string;
  name: string;
  positiveRating: number;
  shipOnTime: number;
  totalSales: number;
  description: string;
  products: TProduct[];
  owner: Owner;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
