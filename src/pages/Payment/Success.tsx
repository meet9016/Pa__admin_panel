import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Green circle with check */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-green-600 mb-2">
        Payment Successful
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your payment! 🎉 <br />
        Your transaction has been completed successfully.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/profile")}
        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Go Back Dashboard
      </button>
    </div>
  );
};

export default Success;
