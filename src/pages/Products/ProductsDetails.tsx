import { FaPlus, FaMinus } from "react-icons/fa6";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import pinterast from "../../assets/social.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addProduct } from "@/redux/features/cartSlice";
import { useGetProductQuery, useGetProductsQuery } from "@/redux/api/api";
import Product_Image from "./details-page-components/Product_Image/Product_Image";
import Product_Details_Tabs from "./details-page-components/Product_Details_Tabs";
import { useAppDispatch } from "@/redux/hook";
import Product_Card from "@/components/cards/Product_Card";
import { Button } from "@/components/ui/button";
import { LuPackage } from "react-icons/lu";

const ProductsDetails = () => {
  const { id } = useParams();
  const { data = {}, isLoading } = useGetProductQuery(id);
  const { data: allProducts = {} } = useGetProductsQuery({});
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { data: productDetails } = data;
  const {totalCount, products } = allProducts.data|| {};
  return (
    <section className="mt-10">
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 max-w-7xl mx-auto mb-10">
          <div>
            <Product_Image
              images={[
                {
                  original: productDetails?.image,
                  thumbnail: productDetails?.image,
                },
              ]}
            />
          </div>
          <div className="space-y-5">
            <p className="text-green-500">#Category : {productDetails?.category}</p>
            <h1 className="text-5xl font-bold">{productDetails?.name}</h1>
            <h1 className="text-2xl text-green-600 font-bold">
              $ {productDetails?.price}
            </h1>
            <p
            className={`flex items-center gap-2 ${
              productDetails?.stock != 0 ? "text-green-500" : "text-red-500"
            } `}
          >
            <LuPackage />
            <span className="">
              {productDetails?.stock == 0 ? "Out Of Stock" : "In Stock"}
            </span>
          </p>
            <p>{productDetails?.description}</p>
            <hr />
            <div className="flex gap-5">
              {/* <div className="flex justify-center items-center gap-5 p-2 rounded-lg border-2">
                <FaMinus
                  className="cursor-pointer"
                  //   onClick={handleDecrease}
                />
                <p>{0}</p>
                <FaPlus
                  className="cursor-pointer"
                  //    onClick={handleIncrease}
                />
              </div> */}
              <div className="flex gap-5">
                <button
                  onClick={() => dispatch(addProduct(productDetails))}
                  className="bg-[#000000] text-white font-bold py-2 px-4 rounded-md"
                >
                  Add to cart
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
     
        <div className="my-10 space-y-4">
            <div className="flex justify-between items-center">
                
          <h1 className="font-semibold text-2xl">Related Products </h1>
          <Link to="/products">
          <Button className="">See More</Button>
          </Link>
            </div>
            <hr />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {products?.slice(0, 5)?.map((product) => (
              <Product_Card product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
