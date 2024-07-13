import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ScrollToTop from "./lib/SrollToTop";

function App() {
  const cart = useSelector((state: RootState) => state.cart.products);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (cart.length > 0) {
        const message =
          "You have items in your cart. Do you really want to leave?";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cart]);
  return (
    <>
        <ScrollToTop />
      <Navbar />
      <div className="min-h-[calc(100vh-525px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
