import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/redux/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useOrderMutation } from "@/redux/api/api";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
// Assume setMessage is defined somewhere in your component

const Checkout = () => {
  const [order] = useOrderMutation();
  const cart = useAppSelector((state: RootState) => state.cart.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [stripePaymentId, setStripePaymentId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [transactionId, setTransactionId] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const getTotal = () => {
    return cart?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://campers-shop-backend-five.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setStripePaymentId(data.stripePaymentId);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(() => toast.error("Failed to create payment intent"));
  }, [cart]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: e.target.type === "number" ? Number(value) : value,
    });
  };

  const handlePaymentMethodChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async (event:FormEvent) => {
    event.preventDefault();

    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (paymentMethod === "cashOnDelivery") {
      const orderData = {
        user: { ...userDetails, paymentMethod: "cashOnDelivery" },
        items: cart?.map((item) =>{
          return {id:item._id, purchasedQuantity:item.quantity}
        }),
        total: Number(getTotal()),
      };
      try {
        await order(orderData);
        dispatch(clearCart())
        navigate("/success");
      } catch (error) {
        toast.error("Error placing order.");
      }
    } else if (paymentMethod === "stripe" && clientSecret) {
      if (!stripe || !elements) {
        return;
      }
      setIsLoading(true);

      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          email: userDetails?.email || "anonymous",
          name: userDetails?.name || "anonymous",
        },
      });

      if (error) {
        setMessage(error.message?? "An error occurred");
      } else {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setMessage(confirmError.message?? "An error occurred");
        } else if (paymentIntent.status === "succeeded") {
          setTransactionId(paymentIntent.id);
          const orderData = {
            user: {
              ...userDetails,
              paymentMethod: "stripe",
            },
            paymentDetails: {
              stripePaymentId: stripePaymentId || "",
              status: "paid",
              amount: Number(getTotal()),
              currency: "usd",
            },
            items: cart?.map((item) =>{
              return {id:item._id, purchasedQuantity:item.quantity}
            }),
            total: Number(getTotal()),
          };
          await order(orderData);
         dispatch(clearCart())
          navigate(`/payment-success/${transactionId}`);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen my-10">
      <form onSubmit={handlePlaceOrder} className="max-w-5xl mx-auto bg-white rounded-lg flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 md:pr-8 shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Checkout</h2>
          <div  >
            <div className="mb-4">
              <Label className="block text-sm font-medium text-gray-700" htmlFor="name">
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
              <Label className="block text-sm font-medium text-gray-700" htmlFor="email">
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
              <Label className="block text-sm font-medium text-gray-700" htmlFor="phone">
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
              <Label className="block text-sm font-medium text-gray-700" htmlFor="address">
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
          
          </div>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Order Summary</h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <ul>
              {cart?.map((item, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${getTotal()}</span>
            </div>
          </div>
          <div className=" mt-5">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
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
                <Label htmlFor="cashOnDelivery" className="ml-2 block text-sm text-gray-700">
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
                <Label htmlFor="stripe" className="ml-2 block text-sm text-gray-700">
                  Stripe
                </Label>
              </div>
            </div>
            {paymentMethod === "stripe" && clientSecret && (
              <div className="my-6 border p-5">
                <CardElement />
                {/* <PaymentElement /> */}
              </div>
            )}
            <Button className="btn px-10 btn-primary mt-5 " type="submit" disabled={!stripe || !clientSecret}>
            {

            isLoading?"Loading...":"Pay "
            }
              
            </Button>
            {transactionId && (
              <p className="text-green-600">Your transaction id: {transactionId}</p>
            )}
            <div className="">
              {message && <div id="payment-message">{message}</div>}
            </div>
        </div>
          </div>
          
      </form>
    </div>
  );
};

export default Checkout;
