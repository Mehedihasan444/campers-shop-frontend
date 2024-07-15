
import Reviews from "./Reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Product_Details_Tabs = ({ id }:{id:string}) => {
  return (
    <Tabs defaultValue="description" className="mt-16 ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
     
  <div>
    <h2 className="text-3xl font-bold mb-2 mt-10">Product Description </h2>
    <p>Welcome to our Camper Shop, where we provide top-quality products designed to enhance your outdoor adventures. Whether you're a weekend warrior or a seasoned traveler, our wide range of camping gear ensures you have everything you need for a comfortable and memorable experience in nature.</p>
    
    <h3 className="text-lg font-bold mt-4">Features</h3>
    <ul>
      <li><strong>Durability:</strong> Built to withstand the rigors of outdoor use, our products are made from high-quality materials that offer longevity and reliability.</li>
      <li><strong>Comfort:</strong> Designed with your comfort in mind, our gear includes features such as ergonomic designs, cushioned supports, and breathable fabrics.</li>
      <li><strong>Convenience:</strong> Easy to set up and pack away, our products are perfect for quick getaways and spontaneous adventures. Lightweight and compact, they’re designed for easy transport.</li>
      <li><strong>Versatility:</strong> Whether you’re camping in the mountains, by the beach, or in the forest, our products adapt to various environments, providing functionality and comfort wherever you are.</li>
      <li><strong>Safety:</strong> Prioritizing your safety, our gear includes features like reinforced structures, stable bases, and weather-resistant materials to ensure you’re protected in any condition.</li>
    </ul>

    <h3 className="text-lg font-bold mt-4">Why Choose Us</h3>
    <p>At our Camper Shop, we understand the importance of reliable gear when exploring the great outdoors. Our products are carefully selected and tested to meet the highest standards of quality and performance. We are committed to providing excellent customer service, helping you find the perfect gear for your needs.</p>
    
    <p>Explore our range of camping products today and gear up for your next adventure with confidence!</p>
  </div>


      </TabsContent>
      <TabsContent value="reviews">
        <Reviews id={id} />
      </TabsContent>
    </Tabs>
  );
};

export default Product_Details_Tabs;
