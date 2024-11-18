import React from "react";
import { FaStar, FaBox } from "react-icons/fa";
import { Store as Shop } from "lucide-react";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Product_Card from "@/components/cards/Product_Card";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/interface/TProduct";

const seller = {
  name: "John Doe",
  rating: 4.5,
  totalSales: 120,
  profileImage: "https://via.placeholder.com/150",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

const store = {
  name: "John's Store",
  rating: 89,
  totalSales: 120,
  profileImage: "https://via.placeholder.com/150",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};
const categories = [
  {
    id: 1,
    name: "Camping Gear",
    imageUrl:
      "https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg",
  },
  {
    id: 2,
    name: "Outdoor Clothing",
    imageUrl:
      "https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg",
  },
  {
    id: 3,
    name: "Footwear",
    imageUrl:
      "https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg",
  },
  {
    id: 4,
    name: "Accessories",
    imageUrl:
      "https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg",
  },
];
const Store = () => {
  const { data = {} } = useGetProductsQuery({ page: 1, limit: 10 });
  const { products } = data.data || {};
  console.log(products);
  const [activeTab, setActiveTab] = React.useState("store");
  // Simulate best-selling and new arrival products
  const bestSellingProducts = products?.slice(0, 4);
  const promotionalProducts = products?.slice(5, 9);
  const newArrivals = products?.slice(9, 13);

  return (
    <div className="bg-primary/20 min-h-screen">
      <div className="max-w-7xl mx-auto p-5 ">
        <div className="relative bg-primary h-48 rounded-lg mb-10">
          <div className=" flex flex-col items-start justify-center h-full ">
            <div className="flex gap-5 ml-10 bg-white p-5 rounded-md">
              <div className="flex items-center justify-center">
                <Shop size={50} className="text-primary" />
              </div>
              <div className="">
                <h1 className="text-3xl font-bold">{store.name}</h1>
                {/* <p className="text-lg">{store.description}</p> */}
                <p className=" font-semibold  opacity-70 ">
                  {store.rating}% Positive seller rating
                </p>
                <p className=" font-semibold opacity-70 ">
                  Total sales {store.totalSales}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white  rounded-lg p-5">
          <Tabs defaultValue="store" className="">
            <TabsList className="grid w-full grid-cols-6 bg-white text-primary  font-semibold mb-2 pb-2">
              <TabsTrigger
                value="store"
                onClick={() => setActiveTab("store")}
                className={`${
                  activeTab == "store"
                    ? "border-b-4 border-b-primary rounded-none text-lg"
                    : ""
                }`}
              >
                Store
              </TabsTrigger>
              <TabsTrigger
                value="products"
                onClick={() => setActiveTab("products")}
                className={`${
                  activeTab == "products"
                    ? "border-b-4 border-b-primary rounded-none text-lg"
                    : ""
                }`}
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab == "profile"
                    ? "border-b-4 border-b-primary rounded-none text-lg"
                    : ""
                }`}
              >
                Profile
              </TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="store">
              <div className="flex gap-4 py-5">
                <div className="flex-1 grid grid-cols-2  gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white shadow rounded p-5 text-center"
                    >
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-32 object-cover mb-3"
                      />
                      <h3 className="text-lg font-bold">{category.name}</h3>
                      {/* Optional: Link to category products */}
                      {/* <button
                    onClick={() => navigate(`/category/${category.id}`)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Products
                  </button> */}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div
                    className="relative bg-cover bg-center h-full rounded-lg mb-10"
                    style={{
                      backgroundImage:
                        "url('https://i.ytimg.com/vi/YcFPqPaLtkU/maxresdefault.jpg')",
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                      <h2 className="text-3xl font-bold">Special Promotion!</h2>
                      <p className="text-lg">Up to 50% off on selected items</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* New Arrivals */}
              <h2 className="text-2xl font-bold mb-5">New Arrivals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {newArrivals?.map((product:TProduct) => (
                  <Product_Card key={product._id} product={product} />
                ))}
              </div>
              {/* Best Selling Products */}
              <h2 className="text-2xl font-bold mb-5">Best Selling Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {bestSellingProducts?.map((product:TProduct) => (
                  <Product_Card key={product._id} product={product} />
                ))}
              </div>
              {/* Featured Products */}
              <h2 className="text-2xl font-bold mb-5">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {promotionalProducts?.map((product:TProduct) => (
                  <Product_Card key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="products">
              <h2 className="text-2xl font-bold mb-5">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products?.map((product:TProduct) => (
                  <Product_Card key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="profile">
              <div className="bg-white  rounded-lg p-5 ">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                  <img
                    src={seller.profileImage}
                    alt={seller.name}
                    className="w-32 h-32 rounded-full"
                  />
                  <div className="flex-1 space-y-3">
                    <h1 className="text-3xl font-bold">{seller.name}</h1>
                    <p className="text-gray-600">{seller.description}</p>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span>{seller.rating} (120 reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBox className="text-gray-500" />
                      <span>{seller.totalSales} Sales</span>
                    </div>
                    <Button className="mt-3">Contact Seller</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Store;
