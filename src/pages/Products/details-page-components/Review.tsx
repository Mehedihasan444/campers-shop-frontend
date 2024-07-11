import RatingStar from "@/lib/RatingStar";

const Review = ({ review={} }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-3 items-center">
          <img src={review?.image} alt="" className="w-7 rounded-full h-7" />
          <div className="">
            <h3 className="text-lg font-semibold">{review?.name}</h3>
            <p className="text-xs text-gray-500">{review?.reviewDate}</p>
          </div>
        </div>
        <div className="flex items-center">
          <RatingStar Rating_value={review?.rating} />
        </div>
      </div>
      <p className="text-gray-700">{review?.review}</p>
    </div>
  );
};

export default Review;
