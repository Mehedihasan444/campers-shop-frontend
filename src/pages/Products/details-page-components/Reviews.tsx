import { TFeedback } from "@/interface/TFeedback";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import RatingStar from "@/lib/RatingStar";
import { useGetReviewsQuery } from "@/redux/features/review/reviewApi";

const Reviews = ({ id }: { id: string }) => {
  const { data={}, error, isLoading } = useGetReviewsQuery(id);
const Reviews=data.data||[];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading reviews.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Product Reviews</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Average Rating:{" "}
          <span>
            {" "}
            <RatingStar Rating_value={3.5} />
          </span>{" "}
        </h2>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Reviews </h2>
        {Reviews?.map((review:TFeedback) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
      <ReviewForm id={id} />
    </div>
  );
};

export default Reviews;
