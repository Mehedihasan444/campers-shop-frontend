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
import Store from "@/pages/Store/Store";
import Become_A_Seller from "@/pages/Become_A_Seller/Become_A_Seller";
import Error from "@/components/Error";
import Become_A_Seller_Requests from "@/pages/Become_A_Seller_Requests/Become_A_Seller_Requests";
import UserManagement from "@/pages/UserManagement/UserManagement";
import CategoryManagement from "@/pages/CategoryManagement/CategoryManagement";
import StoreManagement from "@/pages/StoreManagement/StoreManagement";

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
  },
  {
    path: `/dashboard/admin/all-products`,
    element: <ProductManagement />,
  },
  {
    path: `/dashboard/admin/become-a-seller-requests`,
    element: <Become_A_Seller_Requests />,
  },
  {
    path: `/dashboard/admin/all-users`,
    element: <UserManagement  />,
  },
  {
    path: `/dashboard/admin/all-categories`,
    element: <CategoryManagement  />,
  },
  {
    path: `/dashboard/admin/all-stores`,
    element: <StoreManagement  />,
  },
];
const sellerRoutes = [
  {
    path: "/dashboard/seller",
    element: <DashboardHomePage />,
  },
  {
    path: `/dashboard/seller/all-products`,
    element: <ProductManagement />,
  },
];

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
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
      {
        path: "store/:id",
        element: <Store />,
      },
    ],
  },
  {
    path: "/become-a-seller",
    element: (
      <ProtectedRoute allowedRoles={["BUYER"]}>
        <Become_A_Seller />
      </ProtectedRoute>
    ),
  },
  {
    path: `/dashboard/buyer`,
    element: (
      <ProtectedRoute allowedRoles={["BUYER"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: buyerRoutes,
  },
  {
    path: `/dashboard/admin`,
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: adminRoutes,
  },
  {
    path: `/dashboard/seller`,
    element: (
      <ProtectedRoute allowedRoles={["SELLER"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: sellerRoutes,
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute allowedRoles={["BUYER"]}>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </ProtectedRoute>
    ),
  },

  {
    path: "/payment-success",
    element: (
      <ProtectedRoute allowedRoles={["BUYER"]}>
        <PaymentSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/success",
    element: (
      <ProtectedRoute allowedRoles={["BUYER"]}>
        <Success />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment-failed",
    element: (
      <ProtectedRoute allowedRoles={["BUYER"]}>
        <PaymentFailed />
      </ProtectedRoute>
    ),
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
