import { useEffect, useRef, useState } from "react";
import { LuPackage } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import RatingStar from "@/lib/RatingStar";
// import { toast } from "react-toastify";



const Product_Card = ({ product }:Record<string,unknown>) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalIdRef = useRef(null);
const navigate =useNavigate()
  useEffect(() => {
    // return () => {
    //   clearInterval(intervalIdRef.current); // Clean up interval on component unmount
    // };
  }, []);

  const handleMouseEnter = () => {
    // clearInterval(intervalIdRef.current); // Clear any existing interval
    // intervalIdRef.current = setInterval(() => {
    //   setCurrentImageIndex(
    //     (prevIndex) => (prevIndex + 1) % product?.images.length
    //   );
    // }, 1000); // Change image every second (1000 milliseconds)
  };

  const handleMouseLeave = () => {
    // clearInterval(intervalIdRef.current);
    // setCurrentImageIndex(0); // Reset to the first image when mouse leaves
  };

  const handleWishlist = async () => {
    // if (user) {
    //    const res = await axiosPublic.post(`/wishlist`, {
    //   ...product,
    //   email: user?.email,
    // });
    // if (res.data.insertedId) {
    //   console.log(res.data);
    //   toast.success(`${product?.name} has been added to the wishlist.`);
    //   DataFetch();
    // } else if (res.data.message) {
    //   toast.error(`${product?.name} ${res.data.message} in the wishlist`);
    // }
    // }else{
    //   navigate('/system-access/signIn')
    // }
   
  };
  const handleCart = async () => {

// if (user) {
//    const res = await axiosPublic.post(`/cart`, {
//       ...product,
//       email: user?.email,
//     });
//     if (res.data.insertedId) {
//       console.log(res.data);
//       toast.success(`${product?.name} has been added to the cart.`);
//       DataFetch();
//     } else if (res.data.message) {
//       toast.error(`${product?.name} ${res.data.message} in the cart`);
//     }
// }
// else{
//   navigate('/system-access/signIn')
// }

   
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105"
      style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}
    >
      <div className="relative group ">
        <div
          className="w-full h-40  flex justify-center items-center   bg-cover bg-center transition-transform duration-300 transform group-hover:scale-105"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="w-44 h-44 object-contain"
            src={product?.images[currentImageIndex]}
            alt=""
          />
        </div>
        {/* <div className="absolute top-2 right-2 hover:text-red-500 hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
          <IoMdHeartEmpty />
        </div> */}
        <div className="absolute top-2 right-2 space-y-3">
          <div
            onClick={() => handleWishlist()}
            className="cursor-pointer hover:text-red-500 hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-xl"
          >
            <IoMdHeartEmpty />
          </div>
          <div
            onClick={() => handleCart()}
            className="cursor-pointer hover:text-red-500 hover:shadow-md  bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-xl"
          >
            <IoCartOutline />
          </div>
        </div>
      </div>
      <Link to={`/product-detail/${product._id}`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex gap-3">
              <RatingStar Rating_value={product?.rating} />
              <span className="font-semibold text-sm">
                {product?.reviews} reviews
              </span>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-gray-300 line-through">
              ${product?.price}
            </span>
            <span className="ml-2 text-red-500">
              ${product?.discount_price}
            </span>
          </div>
          <p
            className={`flex items-center gap-2 ${
              product?.stock != 0 ? "text-green-500" : "text-red-500"
            } `}
          >
            <LuPackage />
            <span className="">
              {product?.stock == 0 ? "Out Of Stock" : "In Stock"}
            </span>
          </p>
          {/* <button className="bg-[#EF233C] w-full uppercase text-white font-semibold py-2 px-4 rounded-md ">
          <span>Add to Cart</span>
        </button> */}
        </div>
      </Link>
    </div>
  );
};

export default Product_Card;
