import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import "./styles.css";

const Product_Image = ({ items  }:{items:ReactImageGalleryItem[]}) => {
  return (
  
    <>
      <ImageGallery items={items} />
    </>
 
  );
};

export default Product_Image;