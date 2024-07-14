import { LuPackage } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import RatingStar from "@/lib/RatingStar";
import { useAddWishlistProductMutation } from "@/redux/api/api";
import { useAppDispatch } from "@/redux/hook";
import { addProduct } from "@/redux/features/cartSlice";
import { Button } from "../ui/button";
import { TProduct } from "@/interface/TProduct";
import { toast } from "sonner";

const Product_Card = ({ product }: { product: TProduct }) => {
  const [addWishlistProduct] = useAddWishlistProductMutation();
  const dispatch = useAppDispatch();
  const addWishlist = async (id: string) => {
    const res = await addWishlistProduct(id);
    if (res.data.success) {
      toast.success(`${res.data.data.message}`);
    } else {
      toast.error(`Something went wrong`);
    }
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden "
      style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}
    >
      <div className="relative group ">
        <div className="w-full h-40  flex justify-center items-center   bg-cover bg-center ">
          <img
            className="w-44 h-44 object-contain transform transition-transform duration-300 ease-in-out hover:scale-105"
            src={product?.image}
            alt=""
          />
        </div>

        <div className="absolute top-2 right-2 space-y-3">
          <div
            onClick={() => addWishlist(product._id)}
            className="cursor-pointer hover:text-primary hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-xl"
          >
            <IoMdHeartEmpty />
          </div>
          <button
            onClick={() => dispatch(addProduct(product))}
            disabled={product?.quantity == 0}
            className="cursor-pointer hover:text-primary hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-xl"
          >
            <IoCartOutline />
          </button>
        </div>
      </div>
      <Link to={`/product-detail/${product._id}`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {product?.name.length > 20
              ? `${product?.name.substring(0, 20)}...`
              : product?.name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex gap-3">
              <RatingStar Rating_value={product?.rating} />
              <span className="font-semibold text-sm">{0} reviews</span>
            </div>
          </div>
          <div className="mb-2">
            {/* {product?.discount_price ? (
              <>
                <span className="text-gray-300 line-through">
                  ${product?.price}
                </span>
                <span className="ml-2 text-green-700">
                  ${product?.discount_price}
                </span>
              </>
            ) : ( */}
            <span className="ml-2 text-green-700">${product?.price}</span>
            {/* )} */}
          </div>
          <div className="flex justify-between items-center">
            <p
              className={`flex items-center gap-2 text-sm ${
                product?.quantity != 0 ? "text-green-500" : "text-red-500"
              } `}
            >
              <LuPackage />
              <span className="">
                {product?.quantity == 0 ? "Out Of Stock" : "In Stock"}
              </span>
              {product?.quantity !== 0 ? <>({product?.quantity})</> : ""}
            </p>
            <Button variant={"link"} className="">
              Details...
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product_Card;
