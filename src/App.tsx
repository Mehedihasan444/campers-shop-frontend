import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-525px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
