import { useState, useEffect } from 'react';

const FeedbackDescription = ({ text }:{ text:string }) => {
  const [maxLength, setMaxLength] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        // Phone view
        setMaxLength(100); // Adjust max length for phone view
      } else if (width <= 1024) {
        // Tablet view
        setMaxLength(100); // Adjust max length for tablet view
      } else {
        // Desktop view
        setMaxLength(0); // No truncation for desktop view
      }
    };

    handleResize(); // Check screen size on initial render
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const truncateText = (text:string, maxLength:number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  const truncatedText = maxLength ? truncateText(text, maxLength) : text;

  return (
    <p className=" lg:w-[498px] text-justify">
      {truncatedText}
    </p>
  );
};

export default FeedbackDescription;
