import { useState } from "react";
// import CategoryForm from "./CategoryForm";
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
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import CategoryForm from "./CategoryForm";
import { TCategory } from "@/interface/TCategory";

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectedSortBy, setSelectedSortBy] = useState<string>();
  const [page, setPage] = useState(1);
  const limit = 4;
  const {
    data = {},
    isLoading,
    error,
  } = useGetAllCategoryQuery({
    page,
    limit,
    searchTerm,
    sortBy: selectedSortBy,
  });
  const { totalCount, categories } = data.data || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex flex-wrap justify-between items-center gap-5 mb-4">
        <h1 className="text-2xl font-bold mb-4 border-l-4  border-primary pl-2">
          Category Management
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
            </SelectGroup>
          </SelectContent>
        </Select>
        <CategoryForm initialData={null} />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading users</p>
        ) : (
          <Table className="bg-neutral-50">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader >
              <TableRow className="">
                <TableHead className="w-[100px] text-primary text-center font-bold">
                  Image
                </TableHead>
                <TableHead className=" text-primary text-center font-bold">
                  Name
                </TableHead>
                <TableHead className=" text-primary text-center font-bold">
                  No. of Products
                </TableHead>
                <TableHead className=" text-primary text-center font-bold">
                  CreatedAt
                </TableHead>
                <TableHead className=" text-primary text-center font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category: TCategory) => (
                <TableRow key={category._id} className="text-center">
                  <TableCell className="font-medium">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover"
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-center">
                    {category.productCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <CategoryForm initialData={category} />
                    <ConfirmationModal
                      message="Are you sure you want to delete this category?"
                      id={category._id || ""}
                      item="Category"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="">
                  Total Products: {totalCount}
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

export default CategoryManagement;
