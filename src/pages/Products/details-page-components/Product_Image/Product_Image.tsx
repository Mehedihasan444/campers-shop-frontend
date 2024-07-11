import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

const Product_Image = ({ images = [] }) => {
  return (
    <div className="custom-image-gallery">
      <ImageGallery items={images} />
    </div>
  );
};

export default Product_Image;