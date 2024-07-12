
import RatingStar from "@/lib/RatingStar";

const Feedback_Card = () => {
  // static data for testing
  const data = {
    _id: 1,
    rating: {
      rating: 4.5,
      total_rating: 44,
    },
    feedback: "Perfect!",
    feedback_description:
      "Provides educational consulting services for customers- clients who want to study in Canada with the application process.",
    author: {
      img: "https://assets.mycast.io/actor_images/actor-tyson-beckford-135047_large.jpg?1602700938",
      name: "Ashley Coleman",
      course_category: "Development",
    },
  };

  return (
    <div className="p-10   space-y-2 h-80 border shadow rounded-3xl my-20">
        <h3 className="font-bold text-3xl text-left">{data?.feedback}</h3>
        <div className="flex flex-row items-center  gap-3">
          <span className="">
            <RatingStar />
          </span>
          <span className="font-bold text-amber-500">
            {data?.rating?.rating}
          </span>
        </div>
   
        <p className=" text-left ">{data?.feedback_description}</p>
      
      <div className="flex flex-row justify-between items-center gap-5 pt-2">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-row justify-center items-center  w-12 h-12">
            <img
              src={data?.author?.img}
              alt="author image "
              className="rounded-full w-9 h-9 object-cover"
            />
          </div>
          <div className="text-left">
            <span className="text-xl font-bold block">
              {data?.author?.name}
            </span>
            <span className="font-semibold text-sm text-gray-300">
              {data?.author?.course_category} Student
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback_Card;
