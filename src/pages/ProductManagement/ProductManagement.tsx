import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
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
import {  useGetProductsQuery } from "@/redux/api/api";

import ConfirmationModal from "@/lib/ConfirmationModal";

const ProductManagement = () => {
  const [queries, setQueries] = useState({ page: 1, limit: 10 });
  const { data = {}, isLoading } = useGetProductsQuery(queries);
  const { totalCount: total, products } = data.data || {};

  const [currentPage, setCurrentPage] = useState(queries.page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(queries.limit || 10);
  const [numberOfPages, setNumberOfPages] = useState(1);


  useEffect(() => {
    if (total > 0) {
      setNumberOfPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage, data, queries]);

  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1);
    setQueries({ ...queries, limit: newLimit, page: 1 });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setQueries({ ...queries, page: newPage });
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setQueries({ ...queries, page: newPage });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page + 1);
    setQueries({ ...queries, page: page + 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="mb-4 flex justify-end ">
        <ProductForm initialData={null} />
      </div>
      <div>
        <Table>
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
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <h1 className="text-xl font-bold">Loading...</h1>
                </TableCell>
              </TableRow>
            ) : (
              products?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <img
                      src={product.image}
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
                  <TableCell className="text-right space-x-2">
                    <ProductForm initialData={product} />
                    <ConfirmationModal
                      message="Are you sure you want to delete this product?"
                      id={product._id}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-right">
                <div className="flex items-center justify-end space-x-3">
                  <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    «
                  </Button>
                  {[...Array(numberOfPages).keys()].map((page) => (
                    <Button
                      className={`mr-2 ${
                        currentPage === page + 1
                          ? "btn-disabled"
                          : "text-green-500"
                      }`}
                      key={page}
                      onClick={() => handlePageClick(page)}
                    >
                      {page + 1}
                    </Button>
                  ))}
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === numberOfPages}
                  >
                    »
                  </Button>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="rounded-md px-3 py-2 border focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ProductManagement;
