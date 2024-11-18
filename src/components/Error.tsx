import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-5">Page Not Found</h2>
        <p className="text-gray-600 mt-5">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex justify-center gap-5">
          <Button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            Go Back
          </Button>
          <Button onClick={() => navigate('/')} className="bg-green-500 text-white hover:bg-green-600">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;