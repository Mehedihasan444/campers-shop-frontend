// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Feedback_Card from "@/components/cards/Feedback_Card";
// import Feedback_Card from "../Cards/Feedback_Card";

const Customers_Feedback = () => {
  return (
    <div className="relative my-20 py-10 max-w-7xl mx-auto px-5 sm:px-0">
      <div className="absolute z-50 top-0 w-full">
        <h1 className=" text-2xl sm:text-3xl font-bold">Feedback From Customers</h1>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        className="mySwiper "
      >
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-5">
            <Feedback_Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mx-10">
            <Feedback_Card />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Customers_Feedback;
