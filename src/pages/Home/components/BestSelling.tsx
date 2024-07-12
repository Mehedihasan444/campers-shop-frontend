import Product_Card from "@/components/cards/Product_Card";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/api/api";
import { Link } from "react-router-dom";

const BestSelling = () => {
  const { data = {}, isLoading } = useGetProductsQuery({});
  const { data: products } = data;

  return (
    <section className="bg-white py-5 sm:py-20 max-w-7xl mx-auto px-5 sm:px-0">
              <div className=" mt-4 flex justify-between items-center ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        Best Selling Products
      </h2>
        <Link
          to="/products"
          className=" text-white font-bold sm:py-2 px-4 rounded"
        >
            <Button className="bg-primary hover:bg-black">View More</Button>
          
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 py-5">
        {
        isLoading ? (
          <div>
            <h1 className="text-3xl font-bold ">Loading...</h1>
          </div>
        ) : (
          products?.slice(0,5).map((product) => (
            <Product_Card key={product._id} product={product}/>
          )) ) }

</div>

    </section>
  );
};

export default BestSelling;