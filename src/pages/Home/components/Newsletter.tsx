

const Newsletter = () => {
  return (
    <div className="bg-gray-100 py-12 my-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Join our newsletter for £10 off
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Get our emails for info on new items, sales and much more. Register
          now to get the latest updates on promotions & coupons. Don’t worry,
          we don't spam!
        </p>
        <div className="max-w-xs mx-auto">
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white border border-gray-300 rounded-l py-2 px-4 w-full"
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded-r">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-2">
            By subscribing you agree to our{' '}
            <a href="#" className="text-red-500">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-red-500">
              Privacy & Cookies Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
