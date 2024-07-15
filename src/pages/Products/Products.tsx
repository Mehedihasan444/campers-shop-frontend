import ProductsPageSideBer from "@/components/ProductsPageSideBer";
import { ChangeEvent, useEffect, useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { useGetProductsQuery } from "@/redux/api/api";
import Product_Card_ListView from "@/components/cards/Product_Card_ListView";
import { TProduct } from "@/interface/TProduct";
import Product_Card from "@/components/cards/Product_Card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { TQueries } from "@/interface/TQueries";
import Loading from "@/lib/Loading";


const Products = () => {
  const [viewType, setViewType] = useState("grid");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const category = searchParams.get("category");
  const [queries, setQueries] = useState<TQueries>({ page: 1, limit: 10 });
  const { data = {}, isLoading } = useGetProductsQuery(searchTerm?{ page: 1, limit: 10,searchTerm: searchTerm}:category?{ page: 1, limit: 10,category: category}:queries);
  const { totalCount: count, products } = data.data || {};
  const [currentPage, setCurrentPage] = useState(queries.page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(queries.limit || 10);
  const [numberOfPages, setNumberOfPages] = useState(1);
 
  useEffect(() => {
    if (count > 0) {
      const numOfPages = Math.ceil(count / itemsPerPage);
      setNumberOfPages(numOfPages);
    }
  }, [count, itemsPerPage, data, queries]);

  const handleViewChange = (value: string) => {
    setViewType(value);
  };

  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(1);
    setQueries({ ...queries, limit: val, page: 1 });
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

  const handlePageClick = (page:number) => {
    setCurrentPage(page + 1);
    setQueries({ ...queries, page: page + 1 });
  };

  return (
    <div className="flex relative">
      <div className="sm:w-1/4 p-4 bg-gray-100 hidden md:flex-col md:flex m-5 rounded-md">
        <ProductsPageSideBer queries={queries} setQueries={setQueries} />
      </div>
      <div className="w-full md:w-3/4 p-4 mx-5 md:mx-0 relative">
        <div className="flex justify-between items-center md:gap-10">
          <div className="hidden lg:flex justify-between items-center gap-5 mb-4 flex-1">
            <h2 className="text-sm ">
              Products Found: {products?.length || 0}
            </h2>
          </div>
          <div className="flex justify-between items-center gap-5 flex-1">
            <div className="sm:flex justify-between items-center gap-5 mb-4">
              <h3 className="text-sm font-semibold mb-2">Sort By:</h3>
              <div>
                <select
                  value={queries?.sort}
                  onChange={(e) =>
                    setQueries({ ...queries, sort: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="" disabled selected>
                    Price
                  </option>
                  <option value="desc">High To Low</option>
                  <option value="asc">Low To High</option>
                  {/* <option value="rating">Rating</option> */}
                </select>
              </div>
            </div>
            <div className="sm:flex justify-between items-center gap-5 mb-4">
              <h3 className="text-sm font-semibold mb-2">View:</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewChange("grid")}
                  className={`p-2 rounded-md ${
                    viewType === "grid"
                      ? "bg-green-900 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <IoGrid />
                </button>
                <button
                  onClick={() => handleViewChange("list")}
                  className={`p-2 rounded-md ${
                    viewType === "list"
                      ? "bg-green-900 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <FaThList />
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div
          className={`mt-2 grid min-h-[50vh] ${
            viewType === "grid"
              ? "grid-cols-1  md:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1"
          } gap-3 mb-8`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full absolute top-0 right-0 bottom-0 left-0">
              {/* <h1 className="text-4xl font-semibold"> Loading...</h1> */}
              <div className="">

              <Loading loading={isLoading}/>
              </div>
            </div>
          ) : viewType === "grid" ? (
            !products?.length ? (
              <h1 className="">Product not found</h1>
            ) : (
              products?.map((product:TProduct) => (
                <Product_Card product={product} key={product._id} />
              ))
            )
          ) : !products?.length ? (
            <h1 className="">Product not found</h1>
          ) : (
            products?.map((product: TProduct) => (
              <Product_Card_ListView product={product} key={product._id} />
            ))
          )}
        </div>
        <div className="flex justify-center sm:justify-end items-center absolute bottom-5 right-5">
          <div className=" text-center">
            <Button
              className=" mr-3 text-green-300"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              «
            </Button>
            {pages?.map((page) => (
              <Button
                className={`mr-2  ${
                  currentPage === page + 1 ? "btn-disabled" : "text-green-500"
                }`}
                key={page}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </Button>
            ))}
            <Button
              className=" text-green-300"
              onClick={handleNextPage}
              disabled={currentPage === numberOfPages}
            >
              »
            </Button>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="rounded-md ml-2  px-3 py-2 border focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
