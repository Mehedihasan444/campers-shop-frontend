import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import pinterast from "../../assets/social.png";
import {  useNavigate, useParams } from "react-router-dom";
import { addProduct } from "@/redux/features/cart/cartSlice";
import Product_Image from "./details-page-components/Product_Image/Product_Image";
import Product_Details_Tabs from "./details-page-components/Product_Details_Tabs";
import { useAppDispatch } from "@/redux/hook";
import Product_Card from "@/components/cards/Product_Card";
import { Button } from "@/components/ui/button";
import { LuPackage } from "react-icons/lu";
import { TProduct } from "@/interface/TProduct";
import Loading from "@/lib/Loading";
import {
  useGetProductQuery,
  useGetProductsQuery,
} from "@/redux/features/product/productApi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Store } from "lucide-react";

const ProductsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = {}, isLoading } = useGetProductQuery(id);
  const { data: productDetails } = data;
  const { data: allProducts = {} } = useGetProductsQuery({
    page: 1,
    limit: 5,
    category: productDetails?.category,
  });
  const { products } = allProducts.data || {};

  const images =
    productDetails?.image?.map((image: string) => ({
      original: image,
      thumbnail: image,
    })) || [];

  // !fake data
  const store = {
    name: "John's Store",
    rating: 89,
    totalSales: 120,
    profileImage: "https://via.placeholder.com/150",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };
  return (
    <section className="mt-10 relative">
      {isLoading ? (
        <div className="flex justify-center items-center w-full absolute top-0 right-0 bottom-0 left-0">
          <div className="">
            <Loading loading={isLoading} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 max-w-7xl mx-auto mb-10">
          <div className="w-full h-full">
            <Product_Image items={images} />
          </div>
          <div className="space-y-5">
            <p className="text-green-500">
              #Category : {productDetails?.category}
            </p>
            <h1 className="text-5xl font-bold">{productDetails?.name}</h1>
            <h1 className="text-2xl text-green-600 font-bold">
              $ {productDetails?.price}
            </h1>
            <p
              className={`flex items-center gap-2 ${
                productDetails?.quantity != 0
                  ? "text-green-500"
                  : "text-red-500"
              } `}
            >
              <LuPackage />
              <span className="">
                {productDetails?.quantity == 0 ? "Out Of Stock" : "In Stock"}
              </span>
            </p>
            <p>{productDetails?.description}</p>
            <hr />
            <div className="flex gap-5">
              <div className="flex justify-center items-center gap-5 p-2 rounded-lg border-2">
                <FaMinus
                  className="cursor-pointer"
                  //   onClick={handleDecrease}
                />
                <p>{0}</p>
                <FaPlus
                  className="cursor-pointer"
                  //    onClick={handleIncrease}
                />
              </div>
              <div className="flex gap-5">
                <button
                  onClick={() => dispatch(addProduct(productDetails))}
                  disabled={productDetails?.quantity == 0}
                  className={`bg-[#000000] text-white font-bold py-2 px-4  hover:text-black hover:bg-white transition duration-300  border border-black`}
                >
                  Add to cart
                </button>
                <button className="border text-primary hover:text-white  border-primary font-bold py-2 px-4  hover:bg-primary transition duration-300">
                  Add to Wishlist
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold">Share:</h1>
              <div className="flex float-left gap-3">
                <img
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={facebook}
                  alt="facebook"
                />
                <img
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={instagram}
                  alt="instagram"
                />
                <img
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={pinterast}
                  alt="pinterast"
                />
                <img
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={twitter}
                  alt="twitter"
                />
                <img
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={linkedin}
                  alt="linkedin"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto   ">
        <hr />
      </div>
      <div className="max-w-7xl mx-auto ">
        <div>
          <Product_Details_Tabs id={productDetails?._id} />
        </div>

        {/* New Sold By Section */}
        <div className="bg-gray-50 flex items-center gap-4 mt-5 p-4 shadow-sm  border rounded-md">
          <div className="flex-1">
            <div className="flex justify-between gap-5 items-center">
              <div className="flex gap-2">
                <div className="flex items-center justify-center">
                  <Store size={50} className="text-primary" />
                </div>
                <div className="pb-2">
                  <p className="text-sm text-gray-500">Sold by</p>
                  <h2 className="text-2xl font-bold">{store?.name}</h2>
                </div>
              </div>
              <div className="">
                <button
                  onClick={() =>
                    navigate(`/store/${productDetails?.seller?.id}`)
                  }
                  className="uppercase hover:underline px-4 py-2 font-semibold text-green-800 rounded hover:text-green-700"
                >
                  Go To Store
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center ">
              <div className="border flex justify-center items-center flex-col">
                <h4 className="text-sm">Ship on Time</h4>
                <span className="font-semibold text-2xl text-center">
                  {store?.rating}%
                </span>
              </div>
              <div className="border flex justify-center items-center flex-col">
                <h4 className="text-sm">Positive Seller Ratings</h4>
                <span className="font-semibold text-2xl text-center">
                  {store?.rating}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-2xl">Related Products </h1>
            {/* <Link to="/products"> */}
              <Button
                className=""
                onClick={() =>
                  navigate(`/products?category=${productDetails?.category}`)
                }
              >
                See More
              </Button>
            {/* </Link> */}
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {products?.slice(0, 5)?.map((product: TProduct) => (
              <Product_Card product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
