import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import {  useEffect, useState } from "react";
import RatingStar from "@/lib/RatingStar";

const Reviews = ({ id }) => {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   byId(id).then((res) => {
  //     setProducts(res[1]);
  //   });
  // }, [byId, id]);

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
        {products?.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
      <ReviewForm id={id} />
    </div>
  );
};

export default Reviews;
