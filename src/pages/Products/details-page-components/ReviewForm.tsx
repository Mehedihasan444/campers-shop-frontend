import { useContext, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewForm = ({ id = "" }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      name: name,
      rating: rating,
      review: comment,
      reviewDate: new Date(),
      email: user?.email,
      image: user?.photoURL,
      productId: id,
    };
    // const res = await axiosPublic.post("/reviews", newReview);
    // if (res.data.insertedId) {
    //   toast.success("Review added successfully");
    //   // Reset form fields after submission
    //   setName("");
    //   setRating("");
    //   setComment("");
    // } else {
    //   toast.error("Something went wrong");
    // }
  };

  return (
    <div className="space-y-2">
      <h1 className="font-semibold text-xl ">Leave a comment:</h1>
      <hr />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block font-semibold mb-1">
            Rating:
          </label>
          {/* <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        /> */}
          <Rating
            style={{ maxWidth: 100 }}
            //   value={Rating_value}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block font-semibold mb-1">
            Your Review:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
