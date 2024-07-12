import App from "@/App";
import About from "@/pages/About/About";
import Checkout from "@/pages/Checkout/Checkout";
import Home from "@/pages/Home/Home";
import ProductManagement from "@/pages/ProductManagement/ProductManagement";
import Products from "@/pages/Products/Products";
import ProductsDetails from "@/pages/Products/ProductsDetails";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "products",
            element: <Products/>
        },
        {
            path: "product-detail/:id",
            element: <ProductsDetails/>
        },
        {
            path: "about",
            element: <About/>
        },
    ]
  },   {
    path: "/checkout",
    element: <Checkout/>
},
{
  path: "/product-management",
  element: <ProductManagement/>
}
])

export default routes;