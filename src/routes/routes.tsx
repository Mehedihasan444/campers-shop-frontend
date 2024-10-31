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
import ProtectedRoute from "./ProtectedRoute";

// stripe secret key
const stripePromise = loadStripe(
  "pk_test_51OQvquHy1aWBtTZzWht1KaJsz5xOeBC0wSIxY9UUmdKdVucXHKeu7MUGpCaB6keZpDuJGW8SvK7W4qlb8hP8SouL00LMjTvLaF"
);

const buyerRoutes = [
  {
    path: "/dashboard/buyer",
    element: <DashboardHomePage />,
  },
  {
    path: `/dashboard/buyer/all-products`,
    element: <ProductManagement />,
  },
  {
    path: `/dashboard/buyer/orders-history`,
    element: <OrderHistory />,
  },
  {
    path: `/dashboard/buyer/track-order`,
    element: <TrackOrder />,
  },
  {
    path: `/dashboard/buyer/wishlist`,
    element: <WishlistPage />,
  },
];

const adminRoutes = [
  {
    path: "/dashboard/admin",
    element: <DashboardHomePage />,
  }]
const sellerRoutes = [
  {
    path: "/dashboard/seller",
    element: <DashboardHomePage />,
  }]


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
    path: `/dashboard/buyer`,
    element: <ProtectedRoute allowedRoles={["BUYER"]}>
      <Dashboard  />
    </ProtectedRoute> ,
    errorElement:<h1>Error</h1>,
    children:buyerRoutes,
  },
  {
    path: `/dashboard/admin`,
    element: <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard  />
    </ProtectedRoute> ,
     errorElement:<h1>Error</h1>,
    children: adminRoutes,
  },
  {
    path: `/dashboard/seller`,
    element: <ProtectedRoute allowedRoles={["SELLER"]}>
      <Dashboard  />
    </ProtectedRoute> ,
     errorElement:<h1>Error</h1>,
    children: sellerRoutes,
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
