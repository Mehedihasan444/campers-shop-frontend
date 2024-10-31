import { Link } from "react-router-dom"; // Assuming you're using React Router
import { Button } from "@/components/ui/button"; // Button component from your UI library

const BuyerHomePage = () => {
  return (
    <div className="p-5 lg:w-[80vw] mx-auto">
      <h1 className="text-3xl font-bold mb-5">Welcome to Your Dashboard</h1>
      <p className="mb-8">
        Here you can manage your orders, track deliveries, and explore your wishlist.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">View Orders</h2>
          <p className="mb-3">Check your past and current orders.</p>
          <Link to="/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Track Order</h2>
          <p className="mb-3">Get the latest updates on your order delivery.</p>
          <Link to="/track-order">
            <Button variant="outline">Track Order</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Wishlist</h2>
          <p className="mb-3">Review your saved items.</p>
          <Link to="/wishlist">
            <Button variant="outline">View Wishlist</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerHomePage;
