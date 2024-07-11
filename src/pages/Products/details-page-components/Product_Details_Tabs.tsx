
import Reviews from "./Reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Product_Details_Tabs = ({ id }) => {
  return (
    <Tabs defaultValue="description" className="mt-16 ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <h2>Description</h2>
      </TabsContent>
      <TabsContent value="reviews">
        <Reviews id={id} />
      </TabsContent>
    </Tabs>
  );
};

export default Product_Details_Tabs;
