const ProductsPageSideBer = ({ category, setCategory, brand, setBrand }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
      {/* Category filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Category</h3>
        {/* Sample categories, you can fetch this from your API */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            Categories
          </option>
          <option value="Smart Phone">Smart Phone</option>
                <option value="Tablets">Tablets</option>
                <option value="Laptops">Laptops</option>
                <option value="HeadPhones">HeadPhones</option>
                <option value="Smart TV">Smart TV</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {/* Price range filter */}
      {/* <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Price Range</h3>

          <input type="range" min={0} max={100} value={30} className="range range-xs" /> 
          <div className="">
            <span className="label-text font-semibold">
              Price range
            </span>
          </div>
     
        </div> */}

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Brand</h3>
        {/* Sample categories, you can fetch this from your API */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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
    </>
  );
};

export default ProductsPageSideBer;
