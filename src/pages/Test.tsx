import axios from "axios";
import React, { useState } from "react";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Test = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const images = Array.from((e.target as HTMLFormElement).image.files);
    const uploadedImageUrls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
        // Ensure image is of type File
    if (image instanceof File) {
        formData.append("image", image);
      }

      try {
        const res = await axios.post(imageHostingApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          uploadedImageUrls.push(res.data.data.display_url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImageUrls(uploadedImageUrls);
    console.log("Uploaded image URLs:", uploadedImageUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple name="image" />
      <button type="submit">Submit</button>
      {imageUrls.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <ul>
            {imageUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default Test;
