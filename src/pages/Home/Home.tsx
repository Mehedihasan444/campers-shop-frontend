import Banner from "./components/Banner";
import BestSelling from "./components/BestSelling";
import Categories from "./components/Categories";
import FAQ from "./components/FAQ";
import Featured from "./components/Featured";

const Home = () => {
    return (
        <div>
            <Banner/>
            <BestSelling/>
            <Categories/>
            <Featured/>
            <FAQ/>
        </div>
    );
};

export default Home;