import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { StripeButton } from '@/components/StripeButton';

const Checkout = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    // Simulate a stock deduction and redirect based on the payment method
    if (paymentMethod === "cashOnDelivery") {
      // Deduct stock and redirect to success page
      navigate("/success");
    } else if (paymentMethod === "stripe") {
      // Redirect to Stripe payment page
      // You should integrate with Stripe and handle the payment process here
      navigate("/stripe-payment");
    }
  };

  // Mock order summary data
  const orderSummary = {
    items: [
      { name: "Product 1", quantity: 2, price: 100 },
      { name: "Product 2", quantity: 1, price: 200 },
    ],
    total: 400,
  };

  return (
    <div className="h-screen my-10">
      <div className="max-w-5xl mx-auto bg-white  rounded-lg flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 md:pr-8 shadow-md  p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Checkout</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              ></textarea>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </h3>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handlePaymentMethodChange}
                  className="h-4 w-4 text-primary focus:ring-green-700 border-gray-300"
                />
                <label
                  htmlFor="cashOnDelivery"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={handlePaymentMethodChange}
                  className="h-4 w-4 text-primary focus:ring-green-700 border-gray-300"
                />
                <label
                  htmlFor="stripe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Stripe
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 ">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Order Summary</h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <ul>
              {orderSummary.items.map((item, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${orderSummary.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
