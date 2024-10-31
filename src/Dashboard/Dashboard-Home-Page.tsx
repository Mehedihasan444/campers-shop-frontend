import AdminHomePage from "./Admin-Home-Page";
import BuyerHomePage from "./Buyer-Home-Page";
import SellerHomePage from "./Seller-Home-Page";

const DashboardHomePage = () => {
  let user = "BUYER";
  // let user = "SELLER";
  // let user = "ADMIN";

  return (
    <div>
      {(user === "BUYER" && <BuyerHomePage />) ||
        (user === "SELLER" && <SellerHomePage />) ||
        (user === "ADMIN" && <AdminHomePage />) || <h1>Invalid User</h1>}
    </div>
  );
};

export default DashboardHomePage;
