import Marquee from "react-fast-marquee";
const Brands = () => {
    const brands = ["https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/panasonic.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/sony-1.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/asus.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/samsung.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/sanyo-1.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/apple-2.png"]
    return (
        <div className="flex  justify-between items-center">
            <Marquee>
                {
                    brands?.map((brand, index) => {
                        return (
                            <div className="ml-20" key={index} >
                                <img src={brand} alt="" className="opacity-50 hover:opacity-100" />
                            </div>
                        );
                    })
                }
            </Marquee>
        </div>
    );
};

export default Brands;