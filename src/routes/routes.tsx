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
import Test from "@/pages/Test";
import { Login } from "@/pages/Authentication/Login";
import { Register } from "@/pages/Authentication/Register";
import Dashboard from "@/Dashboard/Dashboard";
import WishlistPage from "@/pages/Wishlist/WishlistPage";
import OrderHistory from "@/pages/Order-History/OrderHistory";
import TrackOrder from "@/pages/Track-Order/TrackOrder";
import DashboardHomePage from "@/Dashboard/Dashboard-Home-Page";
const stripePromise = loadStripe(
  "pk_test_51OQvquHy1aWBtTZzWht1KaJsz5xOeBC0wSIxY9UUmdKdVucXHKeu7MUGpCaB6keZpDuJGW8SvK7W4qlb8hP8SouL00LMjTvLaF"
);

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
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    ),
  },
  {
    path: `/dashboard/${"USER"}`,
    element: <Dashboard role={"USER"} />
    ,
    children: [
      {
        path: `/dashboard/${"USER"}`,
        element: <DashboardHomePage />,
      },
      {
        path: `/dashboard/${"USER"}/all-products`,
        element: <ProductManagement />,
      },
      {
        path: `/dashboard/${"USER"}/orders-history`,
        element: <OrderHistory />,
      },
      {
        path: `/dashboard/${"USER"}/track-order`,
        element: <TrackOrder />,
      },
      {
        path: `/dashboard/${"USER"}/wishlist`,
        element: <WishlistPage />,
      },
    ],
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/test",
    element: <Test></Test>,
  },
]);

export default routes;
