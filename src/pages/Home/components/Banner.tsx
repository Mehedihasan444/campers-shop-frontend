import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Banner = () => {
    const banners = [
      {
        image: "https://adventureshop.mt/cdn/shop/files/Lismore_450_HI-2023-9-large.jpg?v=1713265453&width=2400",
        title: "MAKE YOUR NEXT CAMPING TRIP STRESS FREE",
        subtitle: "Classic Instant 300",
        description: "Easy to Pop Up & Simple to Take Down",
        buttonText: "SHOP NOW",
        buttonColor: "bg-blue-500"
    },
    {
        image: "https://adventureshop.mt/cdn/shop/files/2024_Classic_Instant_Orange_Lifestyle_High_13.jpg?v=1713452830&width=2400",
        title: "Discover the Wilderness",
        subtitle: "Explore our range of outdoor gear",
        description: "Find everything you need for your next adventure",
        buttonText: "Explore",
        buttonColor: "bg-green-500"
    },
    {
        image: "https://adventureshop.mt/cdn/shop/files/Lismore_450_HI-2023-9-large.jpg?v=1713265453&width=2400",
        title: "Adventure Awaits",
        subtitle: "Gear up for your next journey",
        description: "Premium products for all your outdoor needs",
        buttonText: "Get Started",
        buttonColor: "bg-red-500"
    },
    {
        image: "https://adventureshop.mt/cdn/shop/files/2024_ClassicAir_Orange_High24-large.jpg?v=1719220981&width=2400",
        title: "Stay Warm and Cozy",
        subtitle: "High-quality sleeping bags & tents",
        description: "For all weather conditions",
        buttonText: "Learn More",
        buttonColor: "bg-yellow-500"
    }
    ];

    return (
        <Carousel className="relative w-full max-w-screen mx-auto">
            <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:text-primary text-white p-2 rounded-full cursor-pointer z-50" />
            <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:text-primary p-2 rounded-full cursor-pointer z-50" />
            <CarouselContent>
                {banners.map((banner, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card className="relative h-screen w-screen">
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                <CardContent className="absolute  bottom-0 text-center left-0 right-0 top-0 bg-black bg-opacity-30 text-white p-6 flex flex-col justify-center items-center">
                                    <h3 className="text-xl font-semibold mb-4">{banner.subtitle}</h3>
                                    <h2 className="text-7xl font-semibold mb-2 max-w-5xl mx-auto">{banner.title}</h2>
                                    <p className="text-lg mb-8">{banner.description}</p>
                                    <button className={`${banner.buttonColor} text-white px-4 py-2 rounded`}>
                                        {banner.buttonText}
                                    </button>
                                </CardContent>
                            </Card>
                            </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default Banner;
