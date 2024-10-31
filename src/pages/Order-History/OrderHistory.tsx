/* eslint-disable @typescript-eslint/no-explicit-any */


import { Button } from "@/components/ui/button";
import { useGetOrdersQuery } from "@/redux/api/api";
import { FaEye } from "react-icons/fa";

const OrderHistory = () => {
  const { data = [], isLoading } = useGetOrdersQuery({limit:10}); // fetch order history
  const orders = data.orders || []; // adjust based on actual API response structure

  return (
    <div className="p-5 lg:w-[80vw] mx-auto">
      <h1 className="text-2xl font-bold mb-5">Order History</h1>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order:any) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-3 border">{order.status}</td>
                <td className="p-3 border">${order.total.toFixed(2)}</td>
                <td className="p-3 border">
                  <Button variant="outline" size="sm">
                    <FaEye className="inline-block mr-2" /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
