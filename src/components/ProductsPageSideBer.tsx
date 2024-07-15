import { TProduct } from "@/interface/TProduct";
import PriceSlider from "./PriceSlider";
import { useEffect, useState } from "react";
import { TQueries } from "@/interface/TQueries";
import { Button } from "./ui/button";


const ProductsPageSideBer = ({ queries, setQueries }:{queries:TQueries,setQueries:React.Dispatch<React.SetStateAction<TQueries>>}) => {
  const [items, setItems] = useState<Array< TProduct>>([]);
  const [priceRange, setPriceRange] = useState<number[]>([50]);

  const handlePriceChange = (value:number[]) => {
    setPriceRange(value);
  };

  useEffect(() => {
    fetch("https://campers-shop-backend-five.vercel.app/api/v1/products")
      .then((response) => response.json())
      .then((data) => setItems(data?.data?.products));
  }, []);

  // Get unique categories and brands
  const categories = Array.from(new Set(items?.map((product) => product?.category)));
  const brands = Array.from(new Set(items?.map((product) => product?.brand)));

  return (
    <>
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
    <Button variant={"default"} className="bg-green-900 hover:bg-green-700" onClick={()=>setQueries({})}>Reset</Button>
    </div>
      {/* Category filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Category</h3>
        <select
          value={queries.category || ""}
          onChange={(e) => setQueries({ ...queries, category: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brand filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Brand</h3>
        <select
          value={queries.brand || ""}
          onChange={(e) => setQueries({ ...queries, brand: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All Brands</option>
          {brands?.map((brand) => (
            <option value={brand} key={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div>
      <div className="mb-4">
          
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <div className="flex justify-between items-center gap-2">
        <PriceSlider value={priceRange} onChange={handlePriceChange} />
        <Button variant={"default"}  className="bg-green-900 hover:bg-green-700" onClick={()=>setQueries({...queries,minPrice:1, maxPrice:priceRange[0]})}>set</Button>
        </div>
      </div>
      <div>
        <p>Selected price range: $1 - ${priceRange.join(" - ")}</p>
      </div>
    </div>
    </>
  );
};

export default ProductsPageSideBer;
