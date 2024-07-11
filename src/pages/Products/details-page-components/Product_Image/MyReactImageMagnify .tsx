import ReactImageMagnify from "react-image-magnify";

const MyReactImageMagnify = ({ item }) => {
  const image=item
  console.log(image)

  return (
<div className="z-50" >

     <ReactImageMagnify
      {...{
        smallImage: {
          alt: "Wristwatch by Ted Baker London",
          isFluidWidth: true,
          src: image,
        },
        largeImage: {
          src: image,
          width: 1200,
          height: 1800
        },
        enlargedImageContainerStyle: {
          zIndex: "1500"
        },
 
        // enlargedImageContainerDimensions: {
        //   width: "100%",
        //   height: "100%",
        // },
        enlargedImagePosition: "over",
       
      }}
    />
</div>
      

  );
};

export default MyReactImageMagnify;