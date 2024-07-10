import PriceSlider from "./PriceSlider";

interface TQueries {
  searchTerm: string;
  limit: number;
  page: number;
  sortBy: string;
  filter: string;
}

interface TProps {
  queries: TQueries;
  setQueries: React.Dispatch<React.SetStateAction<TQueries>>;
}

const ProductsPageSideBer = ({ queries, setQueries }: TProps) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
      {/* Category filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Category</h3>
        {/* Sample categories, you can fetch this from your API */}
        <select
          value={queries.filter}
          onChange={(e) => setQueries({ ...queries, filter: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            Categories
          </option>
          <option value="Camping-Gear">Camping Gear</option>
          <option value="Tablets">Tablets</option>
          <option value="Laptops">Laptops</option>
          <option value="HeadPhones">HeadPhones</option>
          <option value="Smart TV">Smart TV</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Brand</h3>
        {/* Sample brands, you can fetch this from your API */}
        <select
          value={queries.filter}
          onChange={(e) => setQueries({ ...queries, filter: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            Brand
          </option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Dell">Dell</option>
          <option value="Asus">Asus</option>
          <option value="MSI">MSI</option>
          <option value="HP">HP</option>
          <option value="Lenovo">Lenovo</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Price range filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <PriceSlider />
      </div>
    </>
  );
};

export default ProductsPageSideBer;
