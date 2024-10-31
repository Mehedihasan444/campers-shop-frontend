import { Link } from "react-router-dom"; // Assuming you're using React Router
import { Button } from "@/components/ui/button"; // Button component from your UI library

const AdminHomePage = () => {
  return (
    <div className="p-5 lg:w-[80vw] mx-auto">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
      <p className="mb-8">
        Manage your application effectively with the tools below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="mb-3">View and manage user accounts.</p>
          <Link to="/admin/users">
            <Button variant="outline">View Users</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <p className="mb-3">Add, edit, or remove products.</p>
          <Link to="/admin/products">
            <Button variant="outline">Manage Products</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Order Management</h2>
          <p className="mb-3">View and process orders from customers.</p>
          <Link to="/admin/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">View Analytics</h2>
          <p className="mb-3">Check application statistics and performance.</p>
          <Link to="/admin/analytics">
            <Button variant="outline">View Analytics</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="mb-3">Manage application settings.</p>
          <Link to="/admin/settings">
            <Button variant="outline">Settings</Button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Support</h2>
          <p className="mb-3">Access support resources and help.</p>
          <Link to="/admin/support">
            <Button variant="outline">Get Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
