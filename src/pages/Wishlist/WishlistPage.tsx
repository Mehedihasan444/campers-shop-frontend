import { Button } from "@/components/ui/button";
import { useDeleteWishlistProductMutation, useGetWishlistProductsQuery } from "@/redux/api/api";
import { FaHeart, FaTrash } from "react-icons/fa";

const WishlistPage = () => {
  const { data = {}, isLoading } = useGetWishlistProductsQuery({});
  const { data: products } = data;
  const [deleteWishlistProduct] = useDeleteWishlistProductMutation();

  return (
    <div className="p-5 lg:w-[80vw] mx-auto h-screen flex flex-col">
      <header className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Shopping Wishlist</h1>
          <p className="text-sm text-muted-foreground">Review your selected items.</p>
        </div>
        <FaHeart size={24} className="text-red-500" />
      </header>

      <div className="p-4 flex-grow overflow-auto">
        {isLoading ? (
          <div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        ) : (
          products?.map((item: { _id: string; product: { name: string; price: number; image: string; }}) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex-1 flex gap-3 items-start">
                <img
                  className="h-12 w-12 object-cover rounded-sm"
                  src={item?.product?.image}
                  alt={item?.product?.name}
                />
                <div>
                  <h4 className="font-bold">{item?.product?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item?.product?.price}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => deleteWishlistProduct(item._id)}
              >
                <FaTrash className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
