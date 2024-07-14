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
import {
  useDeleteWishlistProductMutation,
  useGetWishlistProductsQuery,
} from "@/redux/api/api";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
// import { toast } from "sonner";

const Wishlist = () => {
  const { data = {}, isLoading } = useGetWishlistProductsQuery({});
  const { data: products } = data;
  const [deleteWishlistProduct] = useDeleteWishlistProductMutation();

  // if(data.success){
  //   toast.success("Product added successfully in the wishlist");
  // }
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <FaHeart size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen lg:w-[40vw] flex flex-col">
        <div className="flex flex-col flex-grow">
          <DrawerHeader className="flex justify-between items-start">
            <div>
              <DrawerTitle>Shopping Wishlist</DrawerTitle>
              <DrawerDescription>Review your selected items.</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button className="bg-transparent text-black -mt-5 hover:text-white text-xl">
                <FaX />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 pb-0 flex-grow overflow-auto">
            {isLoading?<div><h1 className="text-3xl font-bold ">Loading...</h1>
            </div>:products?.map((item :{ _id: string; product: { name: string; price: number; image: string; }}) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex-1 flex gap-3 justify-start items-start">
                  <div className="">
                    <img
                      className="h-12 w-12 object-cover rounded-sm"
                      src={item?.product?.image}
                      alt={item?.product?.name}
                    />
                  </div>
                  <div className="">
                    <h4 className="font-bold">{item?.product?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item?.product?.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => deleteWishlistProduct(item._id)}
                  >
                    <FaTrash className="h-4 w-4" />
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
