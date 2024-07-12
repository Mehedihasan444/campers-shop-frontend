import Quotes_Slider from "@/components/Quotes_Slider/Quotes_Slider";
import Team_Member_Card from "@/components/cards/Team_Member_Card";
import Count_Up from "@/lib/Count_Up";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/team_members.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="">
      <div
        className="bg-fixed rounded-md"
        style={{
          backgroundImage: `url("https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2024/01/about-1.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className=" bg-[#000000bd] rounded-md">
          <div className="text-center max-w-4xl mx-auto space-y-3 text-white p-20">
            <p className="">START FROM SINCE 2000</p>
            <h1 className="text-6xl font-bold">
              We Help Everyone Enjoy Amazing Products
            </h1>
            <div className="flex justify-center gap-20 items-center pt-5">
              <div className="">
                <h1 className="text-6xl font-extrabold">
                  <Count_Up value={9000} />
                </h1>
                <p className="">Happy Clients</p>
              </div>
              <div className="">
                <h1 className="text-6xl font-extrabold">
                  <Count_Up value={70} />
                </h1>
                <p className="">Great Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 text-center md:grid-cols-3 justify-center items-center gap-10 my-10">
        <div className="space-y-3 border p-4 mb-5">
          <h1 className="text-3xl font-semibold">Who We Are</h1>
          <p className="">
            We are passionate about the outdoors and committed to providing high-quality camping products to enthusiasts around the world. Our team of experts curates the best gear to ensure you have a memorable and enjoyable experience in nature.
          </p>
        </div>
        <div className="space-y-3 border p-4 mb-5">
          <h1 className="text-3xl font-semibold">Our History</h1>
          <p className="">
            Founded in 2000, we started as a small local shop catering to outdoor adventurers. Over the years, we have grown into a trusted global brand known for our dedication to quality, customer service, and a deep love for nature.
          </p>
        </div>
        <div className="space-y-3 border p-4 mb-5">
          <h1 className="text-3xl font-semibold">Our Mission</h1>
          <p className="">
            Our mission is to inspire and equip people to explore the great outdoors. We believe in fostering a connection with nature and are dedicated to providing products that help our customers enjoy their adventures safely and comfortably.
          </p>
        </div>
      </div>

      <div className="my-20 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center md:text-left">
          Our Team
        </h1>
        <div className="flex justify-center md:justify-start items-center my-2 ">
          <hr className="w-[50px] border-2 border-[#00BFA5]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 my-10">
          {data?.map((item, idx) => {
            return <Team_Member_Card key={idx} member={item} />;
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-10 max-w-7xl mx-auto">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <p className="uppercase font-thin">Our Performance</p>
          <h1 className="font-extrabold text-4xl md:text-6xl">
            We Believe In Quality Products
          </h1>
          <p className="text-black px-5 md:px-0">
            Our commitment to quality ensures that every product we offer is reliable and built to last. We source our products from the best manufacturers and continuously innovate to meet the evolving needs of our customers.
          </p>
        </div>
        <div className="flex-1 mx-5 ">
          <img
            src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2024/01/about-2.jpg"
            alt=""
            className="rounded-md"
          />
        </div>
      </div>

      <div className="my-20 max-w-7xl mx-auto bg-slate-400 p-5">
        <Quotes_Slider />
      </div>

      <div className="max-w-7xl mx-auto my-20 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center ">
          <div className="">
        <h2 className="text-4xl font-bold mb-5  md:text-left">Contact Information</h2>
            <p className="text-lg"><strong>Phone:</strong> (123) 456-7890</p>
            <p className="text-lg"><strong>Email:</strong> info@campersshop.com</p>
            <p className="text-lg"><strong>Address:</strong> 123 Camping Lane, Adventure City, CA 12345</p>
          </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509688!2d144.95373631590433!3d-37.816279742021734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577a2b2b92f1e0b!2s123+Camping+Lane%2C+Adventure+City%2C+CA+12345!5e0!3m2!1sen!2sus!4v1620204388547!5m2!1sen!2sus"
              width="600"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-20 p-5">
        <h2 className="text-4xl font-bold mb-5 text-center md:text-left">Follow Us</h2>
        <div className="flex justify-center md:justify-start space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="h-8 w-8 text-primary hover:text-green-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="h-8 w-8 text-primary hover:text-green-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-8 w-8 text-primary hover:text-green-600" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="h-8 w-8 text-primary hover:text-green-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
