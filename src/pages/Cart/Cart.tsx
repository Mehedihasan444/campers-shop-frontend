import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Tent", price: 99.99, quantity: 1 },
    { id: 2, name: "Sleeping Bag", price: 49.99, quantity: 1 },
    { id: 3, name: "Camping Stove", price: 29.99, quantity: 1 },
  ]);

  const updateQuantity = (id: number, adjustment:number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + adjustment) }
        : item
    ));
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <FaShoppingCart size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen w-[40vw] flex flex-col">
        <div className="flex flex-col flex-grow">
          <DrawerHeader className="flex justify-between items-start">
            <div>
              <DrawerTitle>Shopping Cart</DrawerTitle>
              <DrawerDescription>Review your selected items.</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button className="bg-transparent text-black -mt-5 hover:text-white text-xl"><FaX /></Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 pb-0 flex-grow overflow-auto">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b">
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
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <FaCircleMinus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <FaCirclePlus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right">
              <h4 className="text-lg font-bold">Total: ${getTotal()}</h4>
            </div>
          </div>
        </div>
        <DrawerFooter className="p-4">
          <Link to="/checkout">
          <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
