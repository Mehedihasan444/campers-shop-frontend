import { Link, useParams } from "react-router-dom";


const PaymentSuccess = () => {
    const {transactionId}=useParams()
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl font-bold">Payment complete: {transactionId}</h1>
            <Link to="/" className="">

            <span className="underline text-blue-500">Back to Home</span>
            </Link>
        </div>
    );
};

export default PaymentSuccess;