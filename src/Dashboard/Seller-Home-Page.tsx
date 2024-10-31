
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { Button } from "@/components/ui/button"; // Button component from your UI library

const SellerHomePage = () => {
  return (
    <div className="p-5 lg:w-[80vw] mx-auto">
      <h1 className="text-3xl font-bold mb-5">Seller Dashboard</h1>
      <p className="mb-8">
        Manage your products and sales effectively with the tools below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <p className="mb-3">Add, edit, or remove your products.</p>
          <Link to="/seller/products">
            <Button variant="outline">Manage Products</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">View Orders</h2>
          <p className="mb-3">Check and process your incoming orders.</p>
          <Link to="/seller/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Sales Analytics</h2>
          <p className="mb-3">Monitor your sales performance.</p>
          <Link to="/seller/analytics">
            <Button variant="outline">View Analytics</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Customer Inquiries</h2>
          <p className="mb-3">Manage inquiries and messages from customers.</p>
          <Link to="/seller/inquiries">
            <Button variant="outline">View Inquiries</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          <p className="mb-3">Update your account details and preferences.</p>
          <Link to="/seller/settings">
            <Button variant="outline">Settings</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Support</h2>
          <p className="mb-3">Access resources and help.</p>
          <Link to="/seller/support">
            <Button variant="outline">Get Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;
