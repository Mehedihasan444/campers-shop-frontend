import { LuPackage } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import RatingStar from "@/lib/RatingStar";
import { useAppDispatch } from "@/redux/hook";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { TProduct } from "@/interface/TProduct";
import { useAddWishlistProductMutation } from "@/redux/features/wishlist/wishlistApi";

const Product_Card_ListView = ({ product }:{product:TProduct}) => {
  const [addWishlistProduct] = useAddWishlistProductMutation();
  const dispatch = useAppDispatch();

  return (
    <div
      className="flex justify-between  bg-white rounded-lg "
      style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}
    >
      <div className="md:relative group flex-1">
        <div className="w-full md:h-[280px] flex justify-center items-center    bg-cover bg-center transition-transform duration-300 transform group-hover:scale-105">
          <img className=" md:h-[280px]" src={product?.image[0]} alt="" />
        </div>
        <div className="md:absolute top-2 right-2 space-y-3">
          <div
            onClick={() => addWishlistProduct(product._id)}
            className="cursor-pointer hover:text-red-500 hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-2xl"
          >
            <IoMdHeartEmpty />
          </div>
          <div
            onClick={() => dispatch(addProduct(product))}
            className="cursor-pointer hover:text-red-500 hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-2xl"
          >
            <IoCartOutline />
          </div>
        </div>
      </div>
      <Link to={`/product-detail/${product?._id}`} className="flex-1">
        <div className="p-4 flex-1">
          <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex gap-3">
              <RatingStar Rating_value={product?.rating} />
              <span className="font-semibold text-sm">
                {0} reviews
              </span>
            </div>
          </div>
          <div className="mb-2">
            {/* {product?.discount_price ? (
              <>
                <span className="text-gray-300 line-through">
                  ${product?.price}
                </span>
                <span className=" text-green-700">
                  ${product?.discount_price}
                </span>
              </>
            ) : ( */}
              <span className=" text-green-700">${product?.price}</span>
            {/* )} */}
          </div>
          <p
            className={`flex items-center gap-2 ${
              product?.quantity != 0 ? "text-green-500" : "text-red-500"
            } `}
          >
            <LuPackage />
            <span className="">
              {product?.quantity == 0 ? "Out Of Stock" : "In Stock"}
            </span>
          </p>
          <p className="py-2 opacity-80 text-justify">
            {product?.description.slice(0, 150)}...
          </p>
          {/* <button className="bg-[#EF233C] w-full uppercase text-white font-semibold py-2 px-4 rounded-md ">
          <span>Add to Cart</span>
        </button> */}
        </div>
      </Link>
    </div>
  );
};

export default Product_Card_ListView;
