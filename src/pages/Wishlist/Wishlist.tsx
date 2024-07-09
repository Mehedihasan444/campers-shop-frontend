import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Wishlist = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState([
    { _id: 1, name: "Tent", price: 99.99, quantity: 1 },
    { _id: 2, name: "Sleeping Bag", price: 49.99, quantity: 1 },
    { _id: 3, name: "Camping Stove", price: 29.99, quantity: 1 },
  ]);

// items remove from wishlist
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleRemove=(id:string) => {

}
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
        <FaHeart size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen w-[40vw] flex flex-col">
        <div className="flex flex-col flex-grow">
          <DrawerHeader className="flex justify-between items-start">
            <div>
              <DrawerTitle>Shopping Wishlist</DrawerTitle>
              <DrawerDescription>Review your selected items.</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button className="bg-transparent text-black -mt-5 hover:text-white text-xl"><FaX /></Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 pb-0 flex-grow overflow-auto">
            {items.map(item => (
              <div key={item._id} className="flex items-center justify-between py-2 border-b">
                <div className="flex-1 flex gap-3 justify-start items-start">
                    <div className="">
                        <img
                          className="h-12 w-12 object-cover rounded-sm"
                          src={`https://via.placeholder.com/150/${item.id}`}
                          alt={item.name}
                        />
  
                    </div>
                    <div className="">
                                <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                    </div>
          
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => handleRemove('item._id')}
                  >
                    <FaX className="h-4 w-4" />
             
                  </Button>
             
                  
                </div>
              </div>
            ))}
          
          </div>
        </div>
 
      </DrawerContent>
    </Drawer>
  );
};

export default Wishlist;
