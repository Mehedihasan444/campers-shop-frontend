import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmationModal from "@/lib/ConfirmationModal";
import PaginationComponent from "@/lib/PaginationComponent";
import { Input } from "@/components/ui/input";
import StoreForm from "./StoreForm";
import { TStore } from "@/interface/TStore";
import { useGetAllStoreQuery } from "@/redux/features/store/storeApi";
import { MapPin } from "lucide-react";

const StoreManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectedSortBy, setSelectedSortBy] = useState<string>();
  const [page, setPage] = useState(1);
  const limit = 4;
  const {
    data = {},
    isLoading,
    error,
  } = useGetAllStoreQuery({ page, limit, searchTerm, sortBy: selectedSortBy });
  const { totalCount, stores } = data.data || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  console.log(stores);
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex flex-wrap justify-between items-center gap-5 mb-4">
        <h1 className="text-2xl font-bold mb-4 border-l-4  border-primary pl-2">
          Store Management
        </h1>
        <div className="">
          <Input
            type="search"
            placeholder="Search ..."
            className="min-w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          defaultValue={selectedSortBy}
          onValueChange={(value) => setSelectedSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={"Sort By"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="-createdAt">Latest</SelectItem>
              <SelectItem value="createdAt">Oldest</SelectItem>
              <SelectItem value="price">Low to High</SelectItem>
              <SelectItem value="-price">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <StoreForm initialData={null} />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading users</p>
        ) : (
          <Table className="bg-neutral-50">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
              <TableRow className="">
                <TableHead className=" text-primary font-bold">Name</TableHead>
                <TableHead className="text-center text-primary font-bold">
                  Owner Info
                </TableHead>
                <TableHead className="text-center text-primary font-bold">
                  Total Sales
                </TableHead>
                <TableHead className="text-center text-primary font-bold">
                  Rating
                </TableHead>
                <TableHead className="text-center text-primary font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores?.map((store: TStore) => (
                <TableRow key={store._id}>
                  <TableCell className="text-center">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <span className="">{store.name}</span>
                      <span className="flex gap-1 items-center">
                        <MapPin /> {store.location.toUpperCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col">
                      <span className="">Name: {store.owner.name}</span>
                      <span className="">Email:{store.owner.email}</span>
                      <span className="">
                        Phone: {store.owner.mobileNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {store.totalSales}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col">
                      <span className="">
                        {" "}
                        positive rating: {store.positiveRating}%
                      </span>
                      <span className="">Ship on time: {store.shipOnTime}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <StoreForm initialData={store} />
                    <ConfirmationModal
                      message="Are you sure you want to delete this store?"
                      id={store._id}
                      item="Store"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="">
                  Total Stores: {totalCount}
                </TableCell>
                <TableCell colSpan={3} className="">
                  <PaginationComponent
                    totalCount={totalCount}
                    page={page}
                    limit={limit}
                    onPageChange={handlePageChange}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  );
};

export default StoreManagement;
