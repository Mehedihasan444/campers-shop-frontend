import SuccessAnimation from "@/lib/SuccessAnimation";
import { Link } from "react-router-dom";


const Success = () => {
    return (
        <div className="h-screen flex justify-center flex-col items-center ">
            <SuccessAnimation/>
            <h1 className="text-5xl font-bold text-green-500">Success</h1>
            <Link to="/" className="">

<span className="underline text-blue-500">Back to Home</span>
</Link>
        </div>
    );
};

export default Success;