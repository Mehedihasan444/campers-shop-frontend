import { FormEvent, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useAddReviewMutation } from "@/redux/api/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReviewForm = ({ id }:{id:string}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [addReview] = useAddReviewMutation();
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    if (!name ||!email ||!comment || rating === 0) {
      toast.message("Please fill all fields");
      return;
    }
    const newReview = {
      productId: id,
      email,
      user_name: name,
      rating: {
        rating: rating,
        total_rating: 10,
      },
      feedback:
        rating <= 3
          ? "Below average product"
          : rating > 3 && rating < 4
          ? "Average product"
          : rating >= 4 && rating <= 4.5
          ? "Good product"
          : rating > 4.5
          ? "Awesome product"
          : "Awesome product",
      feedback_description: comment,
      product: {
        name: name,
        image:
          "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg",
        product_purchased: 743,
      },
    };

    const res = await addReview(newReview);
    if (res.data.success) {
      toast.success("Review added successfully");
      setName("");
      setRating(0);
      setComment("");
      setEmail("");
    }else{
      toast.error("Failed to added review");
    }

  };

  return (
    <div className="space-y-2">
      <h1 className="font-semibold text-xl ">Leave a comment:</h1>
      <hr />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <Label htmlFor="name" className="block font-semibold mb-1">
            Your Name:
          </Label>
          <Input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name..."
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email" className="block font-semibold mb-1">
            Your Email:
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="rating" className="block font-semibold mb-1">
            Rating:
          </Label>
          <Rating
            style={{ maxWidth: 100 }}
            //   value={Rating_value}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="comment" className="block font-semibold mb-1">
            Your Review:
          </Label>
          <Textarea
            id="comment"
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
            required
          ></Textarea>
        </div>
        <Button
          type="submit"
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
