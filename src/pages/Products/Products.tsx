import ProductsPageSideBer from "@/components/ProductsPageSideBer";
import { useEffect, useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { useGetProductsQuery } from "@/redux/api/api";
import Product_Card_ListView from "@/components/cards/Product_Card_ListView";
import { TProduct } from "@/interface/TProduct";
import Product_Card from "@/components/cards/Product_Card";

const Products = () => {
  const [viewType, setViewType] = useState("grid");
  const [queries, setQueries] = useState({
    limit: 10,
    page: 1,
  });

  const { data = { data: [], count: 0 }, isLoading } = useGetProductsQuery(queries);
  const { data: products, count } = data;

  const [currentPage, setCurrentPage] = useState(queries.page);
  const [itemsPerPage, setItemsPerPage] = useState(queries.limit);
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

  const handleItemsPerPage = (e) => {
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

  const handlePageClick = (page) => {
    setCurrentPage(page + 1);
    setQueries({ ...queries, page: page + 1 });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 p-4 bg-gray-100 hidden md:flex-col md:flex">
        <ProductsPageSideBer queries={queries} setQueries={setQueries} />
      </div>
      <div className="md:w-3/4 p-4 mx-5 md:mx-0">
        <div className="flex justify-between items-center md:gap-10">
          <div className="flex justify-between items-center gap-5 mb-4 flex-1">
            <h2 className="text-lg font-semibold">
              Products Found: {count}
            </h2>
          </div>
          <div className="flex justify-between items-center gap-5 flex-1">
            <div className="flex justify-between items-center gap-5 mb-4">
              <h3 className="text-sm font-semibold mb-2">Sort By:</h3>
              <div>
                <select
                  value={queries.sortBy}
                  onChange={(e) => setQueries({ ...queries, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="" disabled selected>
                    Price
                  </option>
                  <option value="desc">High To Low</option>
                  <option value="asc">Low To High</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 mb-4">
              <h3 className="text-sm font-semibold mb-2">View:</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewChange("grid")}
                  className={`p-2 rounded-md ${viewType === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  <IoGrid />
                </button>
                <button
                  onClick={() => handleViewChange("list")}
                  className={`p-2 rounded-md ${viewType === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  <FaThList />
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={`mt-2 grid ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-3 mb-8`}>
          {isLoading ? (
            <div className="flex justify-center items-center w-[85vw]">
              <h1 className="text-4xl font-semibold"> Loading...</h1>
            </div>
          ) : viewType === "grid" ? (
            !products?.length ? <h1 className="">Product not found</h1> :
            products.map((product) => <Product_Card product={product} key={product._id} />)
          ) : (
            !products?.length ? <h1 className="">Product not found</h1> :
            products.map((product: TProduct) => <Product_Card_ListView product={product} key={product._id} />)
          )}
        </div>
        <div className="flex justify-center sm:justify-end items-center pr-5">
          <div className="py-10 text-center">
            <button
              className="btn btn-accent mr-3 text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              «
            </button>
            {pages.map((page) => (
              <button
                className={`mr-2 btn btn-accent ${currentPage === page + 1 ? "btn-disabled" : "text-white"}`}
                key={page}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="btn btn-accent text-white"
              onClick={handleNextPage}
              disabled={currentPage === numberOfPages}
            >
              »
            </button>
            <select
              value={queries.limit}
              onChange={handleItemsPerPage}
              className="rounded-md ml-2 select input-bordered"
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
