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
import { useGetReviewsQuery } from "@/redux/api/api";
// import Feedback_Card from "../Cards/Feedback_Card";

const Customers_Feedback = () => {
const {data={},isLoading}=useGetReviewsQuery({})
const {Reviews,totalCount}=data.data||{}
const feedbacks=[  {
  _id: 1,
  rating: {
    rating: 4.8,
    total_rating: 112,
  },
  feedback: "Excellent Product!",
  feedback_description:
    "The tent is amazing! It withstood heavy rain and wind without any issues. The setup was easy, and it's very spacious. Highly recommended for all camping enthusiasts!",
  product: {
    image: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg",
    name: "John Doe",
    product_purchased: "4-Person Camping Tent",
  },
},
{
  _id: 2,
  rating: {
    rating: 4.6,
    total_rating: 89,
  },
  feedback: "Very Comfortable",
  feedback_description:
    "The sleeping bag is very comfortable and kept me warm throughout the night. It's lightweight and easy to pack.",
  product: {
    image: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg",
    name: "Jane Smith",
    product_purchased: "Down Sleeping Bag",
  },
},
{
  _id: 3,
  rating: {
    rating: 4.9,
    total_rating: 145,
  },
  feedback: "Sturdy and Reliable",
  feedback_description:
    "This camping stove is very sturdy and reliable. It boils water quickly and is very easy to use.",
  product: {
    image: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg",
    name: "Alice Johnson",
    product_purchased: "Portable Camping Stove",
  },
},
{
  _id: 4,
  rating: {
    rating: 4.7,
    total_rating: 102,
  },
  feedback: "Great for Hiking",
  feedback_description:
    "These hiking boots are fantastic. They provide great support and traction on rough terrain. Highly recommend for hikers.",
  product: {
    image: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg",
    name: "Michael Brown",
    product_purchased: "Waterproof Hiking Boots",
  },
},
{
  _id: 5,
  rating: {
    rating: 4.5,
    total_rating: 76,
  },
  feedback: "Very Bright",
  feedback_description:
    "The lantern is very bright and lasts a long time on a single charge. It's perfect for camping trips.",
  product: {
    image: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg",
    name: "Emily Davis",
    product_purchased: "LED Camping Lantern",
  },
},]

  return (
    <div className="relative my-10 py-10 max-w-7xl mx-auto px-5 sm:px-0">
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
        {
          feedbacks?.map((feedback)=> <SwiperSlide key={feedback._id}>
          <div className="px-5" >
            <Feedback_Card feedback={feedback}/>
          </div>
        </SwiperSlide>)
        }
       
 
      </Swiper>
    </div>
  );
};

export default Customers_Feedback;
