import { useEffect, useState } from "react";

const About = () => {
    const [data, setData] = useState([]);

  
    useEffect(() => {
    //   axios.get("/team_members.json").then((data) => {
    //     setData(data.data);
    //   });
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
          {/* <h1 className="">about</h1> */}
          <div className=" bg-[#000000bd]  rounded-md">
            <div className="text-center max-w-4xl mx-auto space-y-3 text-white p-20">
              <p className="">START FROM SINCE 2000</p>
              <h1 className="text-6xl font-bold">
                We Help Everyone Enjoy Amazing Products
              </h1>
              <div className="flex justify-center gap-20 items-center pt-5">
                <div className="">
                  <h1 className="text-6xl font-extrabold">
                    {/* <Count_Up value={9} /> */}
                  </h1>
                  <p className="">Happy Clients</p>
                </div>
                <div className="">
                  <h1 className="text-6xl font-extrabold">
                    {/* <Count_Up value={7} /> */}
                  </h1>
                  <p className="">Great Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============ */}
  
        <div className="grid grid-cols-1 text-center md:grid-cols-3 mx-5 justify-center items-center gap-10 my-10">
          <div className="space-y-3 border p-4 mb-5">
            <h1 className="text-3xl font-semibold  "> Who We Are</h1>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pretium mollis ex, vel interdum augue faucibus sit amet. Proin
              tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu
              finibus nunc ullamcorper et.
            </p>
          </div>
          <div className="space-y-3 border p-4 mb-5">
            <h1 className="text-3xl font-semibold">Our History</h1>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pretium mollis ex, vel interdum augue faucibus sit amet. Proin
              tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu
              finibus nunc ullamcorper et.
            </p>
          </div>
          <div className="space-y-3 border p-4 mb-5">
            <h1 className="text-3xl font-semibold">Our Mission</h1>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pretium mollis ex, vel interdum augue faucibus sit amet. Proin
              tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu
              finibus nunc ullamcorper et.
            </p>
          </div>
        </div>
        {/* ================= */}
  
        <div className="my-20">
          <h1 className="text-4xl font-bold mb-2 text-center md:text-left">
            Our Team
          </h1>
          <div className="flex justify-center md:justify-start items-center my-2 ">
            <hr className="w-[50px] border-2 border-[#00BFA5]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 my-10">
            {data?.map((item, idx) => {
              return "" //   <Team_Member_Card key={idx} member={item} />;
            })}
          </div>
        </div>
  
        {/* ================ */}
  
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-10">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <p className="uppercase font-thin">our performance</p>
            <h1 className="font-extrabold text-4xl md:text-6xl ">
              We Believe In Quality Products
            </h1>
            <p className="text-black px-5 md:px-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pretium mollis ex, vel interdum augue faucibus sit amet. Proin
              tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu
              finibus nunc ullamcorper et.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <img
              src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2024/01/about-2.jpg"
              alt=""
              className="rounded-md"
            />
          </div>
        </div>
  
        {/* ================= */}
        <div className="my-20 bg-slate-400 p-5">
          {/* <Quotes_Slider /> */}
        </div>
      </div>
    );
  };

export default About;