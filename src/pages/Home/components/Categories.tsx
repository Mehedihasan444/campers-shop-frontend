import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const categories = [
  {
    id: 1,
    name: "Backpacks",
    image:
      "https://adventureshop.mt/cdn/shop/files/LA_INDO_NEW6_TREK_e5e585b0-aaa2-4f9f-8744-0847cb7e597e.jpg?v=1718197658&width=600",
    icon: "fa-backpack",
  },
  {
    id: 2,
    name: "Footwear",
    image:
      "https://adventureshop.mt/cdn/shop/files/SS23-Rossignol-Online-Shop-banner-SHOES.png?v=1682516045&width=600",
    icon: "fa-shoe",
  },
  {
    id: 3,
    name: "Camping",
    image:
      "https://adventureshop.mt/cdn/shop/files/2024_ClassicAir_Orange_High33-large.jpg?v=1713452170&width=600",
    icon: "fa-campground",
  },
  {
    id: 4,
    name: "Ski & Snowsports",
    image:
      "https://adventureshop.mt/cdn/shop/files/1_BasileEtOscar_VillardDeLans_Rossignol_HD_LouisGarnier-15-3500x5247-8f7acbc3-f500-4068-8381-fdd7c9b5b195.png?v=1698678464&width=600",
    icon: "fa-skiing",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto max-w-7xl ">
  <h2 className="text-3xl font-bold mb-4">Categories</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
    {categories?.map((category) => (
      <div key={category.id} className="p-4 rounded-md ">
        <div className="bg-white shadow-md rounded-md relative cursor-pointer group">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover rounded-md transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute top-0 flex justify-center items-center rounded-md bottom-0 right-0 left-0 bg-black bg-opacity-30 w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-3xl mb-5 font-bold text-white text-center">
                {category.name}
              </h3>
              <Button className="bg-primary text-white hover:bg-green-700 font-semibold" onClick={()=>navigate(`/products?category=${category.name}`)}>
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Categories;
