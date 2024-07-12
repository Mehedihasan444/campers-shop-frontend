import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useOrderMutation } from "@/redux/api/api";
import { toast } from "sonner";

const Checkout = () => {
  const [order] = useOrderMutation();
  const cart = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
const [stripePaymentId,setStripePaymentId]=useState('')
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: cart }),
    })
      .then((res) => res.json())
      .then((data) =>{ setClientSecret(data.clientSecret);setStripePaymentId(data.stripePaymentId)})
      .catch((error) => toast.error("Failed to create payment intent"));

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe,cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: e.target.type === "number" ? Number(value) : value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const getTotal = () => {
    return cart
      ?.reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (paymentMethod === "cashOnDelivery") {
      const orderData = {
        user: {
          ...userDetails,
          paymentMethod: "cashOnDelivery",
        },
        items: cart?.map((item) => item._id),
        total: Number(getTotal()),
      };
      await order(orderData); // Ensure you handle promise correctly
      navigate("/payment-success");
    } else if (paymentMethod === "stripe"&& clientSecret) {
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setIsLoading(true);

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      setMessage(submitError);
      return;
    }


      const { error} = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:5173/payment-success",
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error) {
        toast.error(error.message || "An unexpected error occurred.");
      }else {
        toast.success("Payment successful! Your order has been placed.");
        const orderData = {
          user: {
            ...userDetails,
            paymentMethod: "cashOnDelivery",
          },
          paymentDetails: {
            stripePaymentId: stripePaymentId,
            status: "paid",
            amount: Number(getTotal()),
            currency: "usd",
          },
          items: cart?.map((item) => item._id),
          total: Number(getTotal()),
        };
        await order(orderData);
        navigate("/payment-success");
        setIsLoading(false);
      }

    }
  };

  return (
    <div className="h-screen my-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 md:pr-8 shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Checkout</h2>
          <form id="payment-form" onSubmit={handlePlaceOrder}>
            <div className="mb-4">
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Delivery Address
              </Label>
              <Textarea
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              ></Textarea>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </h3>
              <div className="flex items-center mb-2">
                <Input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handlePaymentMethodChange}
                  className="h-4 w-4 text-primary focus:ring-green-700 border-gray-300"
                />
                <Label
                  htmlFor="cashOnDelivery"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Cash on Delivery
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={handlePaymentMethodChange}
                  className="h-4 w-4 text-primary focus:ring-green-700 border-gray-300"
                />
                <Label
                  htmlFor="stripe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Stripe
                </Label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? (
                    <div className="spin-in" id="spinner">Loading</div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </Button>
            </div>
            {message && <div id="payment-message">{message}</div>}
          </form>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Order Summary
          </h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <ul>
              {cart?.map((item, index) => (
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
              <span>${getTotal()}</span>
            </div>
          </div>
          {paymentMethod === "stripe" && clientSecret && (
            <PaymentElement className="my-10" id="payment-element" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
