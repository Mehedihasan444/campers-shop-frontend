import RatingStar from "@/lib/RatingStar";

const Feedback_Card = ({feedback:data}) => {


  return (
    <div className="p-10 space-y-2 h-80 border shadow rounded-3xl my-10 min-w-0.5 ">
      <h3 className="font-bold text-3xl text-left">{data?.feedback}</h3>
      <div className="flex flex-row items-center gap-3">
        <span className="">
          <RatingStar rating={data?.rating?.rating} />
        </span>
        <span className="font-bold text-amber-500">
          {data?.rating?.rating}
        </span>
      </div>
      <p className="text-left">{data?.feedback_description}</p>
      <div className="flex flex-row justify-between items-center gap-5 pt-2">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-row justify-center items-center w-12 h-12">
            <img
              src={data?.product?.image}
              alt="author image"
              className="rounded-full w-9 h-9 object-cover"
            />
          </div>
          <div className="text-left">
            <span className="text-xl font-bold block">
              {data?.product?.name}
            </span>
            <span className="font-semibold text-sm text-gray-300">
              Purchased: {data?.product?.product_purchased}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback_Card;
