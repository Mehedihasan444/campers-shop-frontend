// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Quotes_Slider = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="py-20">
          <div className="flex flex-col justify-center items-center max-w-5xl">
            <div className="h-16 w-16">
              <img
                src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2022/03/avatar-3.jpg"
                alt="Client 1"
                className="rounded-full"
              />
            </div>
            <p className="px-5 text-justify md:text-center">
              "Campers Shop provided us with the best camping gear we've ever used. The quality is top-notch and the customer service was outstanding. Highly recommend for all your outdoor needs!"
            </p>
            <p className="font-bold mt-2">- Alex Johnson</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="py-20">
          <div className="flex flex-col justify-center items-center max-w-5xl">
            <div className="h-16 w-16">
              <img
                src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2022/03/avatar-1.jpg"
                alt="Client 2"
                className="rounded-full"
              />
            </div>
            <p className="px-5 text-justify md:text-center">
              "I was amazed at the variety of products available at Campers Shop. From tents to portable stoves, everything we needed for our family camping trip was right there. Great experience!"
            </p>
            <p className="font-bold mt-2">- Sarah Williams</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="py-20">
          <div className="flex flex-col justify-center items-center max-w-5xl">
            <div className="h-16 w-16">
              <img
                src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2022/03/avatar-2.jpg"
                alt="Client 3"
                className="rounded-full"
              />
            </div>
            <p className="px-5 text-justify md:text-center">
              "The camping equipment from Campers Shop made our adventure unforgettable. Durable, reliable, and affordable products. I wouldn't shop anywhere else for my outdoor gear."
            </p>
            <p className="font-bold mt-2">- Michael Smith</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Quotes_Slider;
