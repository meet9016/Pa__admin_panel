import { useEffect } from "react";
import { useNavigate } from "react-router";

const Fail = () => {
  const navigate = useNavigate()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Red circle with cross */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
        <svg
          className="w-10 h-10 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>

      {/* Subtext */}
      <p className="text-gray-600 mb-6 text-center">
        Oops! Something went wrong while processing your payment.
        <br />
        Please try again later or use a different payment method.
      </p>

      {/* Button */}
      <button
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        onClick={() => navigate('/')}
      >
        Go Back Dashboard
      </button>
    </div>
  );
};

export default Fail;
