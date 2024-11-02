import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetOrderQuery } from "@/redux/features/order/orderApi";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState<string>(""); // state for the input value
    const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null); // allow string or null
  
    const { data: orderStatus, isLoading, error } = useGetOrderQuery(submittedOrderId, {
      skip: !submittedOrderId, // only fetch if order ID is submitted
    });
  
    const handleTrackOrder = () => {
      setSubmittedOrderId(orderId); // setting string to submittedOrderId now works
    };
  return (
    <div className="flex justify-center ">

    <div className="p-5 ">
      <h1 className="text-2xl font-bold mb-5 text-center">Track Your Order</h1>

      <div className="mb-5 md:flex gap-3 space-y-3 sm:space-y-0">
        <Input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
          className="min-w-96"
        />
        <Button onClick={handleTrackOrder} disabled={!orderId}>
          Track Order
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching order status.</p>
      ) : orderStatus ? (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Order Status</h2>
          <p><strong>Order ID:</strong> {orderStatus.id}</p>
          <p><strong>Status:</strong> {orderStatus.status}</p>
          <p><strong>Estimated Delivery:</strong> {orderStatus.estimatedDelivery}</p>
        </div>
      ) : (
        submittedOrderId && <p>No tracking information found for Order ID: {submittedOrderId}</p>
      )}
    </div>
    </div>
  );
};

export default TrackOrder;
