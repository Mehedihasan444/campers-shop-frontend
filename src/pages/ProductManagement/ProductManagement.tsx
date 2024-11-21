import { useState } from "react";
import ProductForm from "./ProductForm";
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
import { TProduct } from "@/interface/TProduct";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import PaginationComponent from "@/lib/PaginationComponent";
import { Input } from "@/components/ui/input";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectedSortBy, setSelectedSortBy] = useState<string>();
  const [page, setPage] = useState(1);
  const limit = 4;
  const {
    data = {},
    isLoading,
    error,
  } = useGetProductsQuery({ page, limit, searchTerm, sortBy: selectedSortBy });
  const { totalCount, products } = data.data || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex flex-wrap justify-between items-center gap-5 mb-4">
        <h1 className="text-2xl font-bold mb-4 border-l-4  border-primary pl-2">
          Product Management
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
        <ProductForm initialData={null} />
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
                <TableHead className="w-[100px] text-primary font-bold">
                  Image
                </TableHead>
                <TableHead className="text-primary font-bold">Name</TableHead>
                <TableHead className="text-primary font-bold">Price</TableHead>
                <TableHead className="text-right text-primary font-bold">
                  Category
                </TableHead>
                <TableHead className="text-right text-primary font-bold">
                  Quantity
                </TableHead>
                <TableHead className="text-right text-primary font-bold">
                  CreatedAt
                </TableHead>
                <TableHead className="text-right text-primary font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product: TProduct) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-right">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <ProductForm initialData={product} />
                    <ConfirmationModal
                      message="Are you sure you want to delete this product?"
                      id={product._id}
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

export default ProductManagement;
