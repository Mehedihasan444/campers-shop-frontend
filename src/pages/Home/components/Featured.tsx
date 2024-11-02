import Product_Card from "@/components/cards/Product_Card";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/interface/TProduct";
import Loading from "@/lib/Loading";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Link } from "react-router-dom";

const Featured = () => {
  const { data = {}, isLoading } = useGetProductsQuery({ page: 1, limit: 10 });
  const { products } = data.data || {};

  // Function to shuffle an array
  const shuffleArray = (array: TProduct[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the products array and slice the first 5 elements
  const randomProducts = products
    ? shuffleArray([...products]).slice(0, 5)
    : [];

  return (
    <section className="bg-white py-5 sm:py-20 max-w-7xl mx-auto px-5 lg:px-0 relative">
      <div className=" mt-4 flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Featured Products
        </h2>
        <Link
          to="/products"
          className="text-white font-bold sm:py-2 px-4 rounded"
        >
          <Button className="bg-primary hover:bg-black">View More</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 py-5 ">
        {isLoading ? (
          <div className="flex justify-center items-end w-full absolute top-3 right-0 bottom-0 left-0 ">
            {/* <h1 className="text-4xl font-semibold"> Loading...</h1> */}
            <div className="">
              <Loading loading={isLoading} />
            </div>
          </div>
        ) : (
          randomProducts?.map((product: TProduct) => (
            <Product_Card key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default Featured;
