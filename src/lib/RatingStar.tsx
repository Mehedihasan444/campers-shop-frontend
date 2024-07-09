import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
const RatingStar = ({ Rating_value }) => {
  
  return (
    <Rating
      style={{ maxWidth: 100 }}
      value={Rating_value}
      readOnly
    />
  );
};

export default RatingStar;