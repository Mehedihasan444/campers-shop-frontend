import App from "@/App";
import About from "@/pages/About/About";
import Checkout from "@/pages/Checkout/Checkout";
import Home from "@/pages/Home/Home";
import PaymentFailed from "@/pages/PaymentFailed/PaymentFailed";
import PaymentSuccess from "@/pages/PaymentSuccess/PaymentSuccess";
import ProductManagement from "@/pages/ProductManagement/ProductManagement";
import Products from "@/pages/Products/Products";
import ProductsDetails from "@/pages/Products/ProductsDetails";
import { createBrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Success from "@/pages/Success/Success";
const stripePromise = loadStripe(
  "pk_test_51OQvquHy1aWBtTZzWht1KaJsz5xOeBC0wSIxY9UUmdKdVucXHKeu7MUGpCaB6keZpDuJGW8SvK7W4qlb8hP8SouL00LMjTvLaF"
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product-detail/:id",
        element: <ProductsDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/checkout",
    element: (
      <Elements stripe={stripePromise} options={options}>
        <Checkout />
      </Elements>
    ),
  },
  {
    path: "/product-management",
    element: <ProductManagement />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/payment-failed",
    element: <PaymentFailed />,
  },
]);

export default routes;
