import Marquee from "react-fast-marquee";
const Brands = () => {
    const brands = ["https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/panasonic.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/sony-1.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/asus.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/samsung.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/sanyo-1.png", "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/apple-2.png"]
    return (
        <div className="flex  justify-between items-center my-16">
            <Marquee>
                {
                    brands?.map((brand, index) => {
                        return (
                            <div className="flex justify-center items-center gap-5" key={index} >
                                <div className="mx-16">

                                <img src={brand} alt="" className="opacity-50 hover:opacity-100" />
                                </div>
                            </div>
                        );
                    })
                }
            </Marquee>
        </div>
    );
};

export default Brands;