import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

const Product_Image = ({ items  }:{items:ReactImageGalleryItem[]}) => {
  return (
    <div className="custom-image-gallery flex justify-end items-center">
      <ImageGallery items={items} thumbnailPosition="left" />
    </div>
  );
};

export default Product_Image;