import Banner from "./components/Banner";
import BestSelling from "./components/BestSelling";
import Brands from "./components/Brands";
import Categories from "./components/Categories";
import Customers_Feedback from "./components/Customers_Feedback/Customers_Feedback";
import FAQ from "./components/FAQ";
import Featured from "./components/Featured";
import Newsletter from "./components/Newsletter";

const Home = () => {
  return (
    <div>
      <Banner />
      <BestSelling />
      <Categories />
      <Featured />
      <FAQ />
      <Customers_Feedback />
      <Brands />
      <Newsletter />
    </div>
  );
};

export default Home;
