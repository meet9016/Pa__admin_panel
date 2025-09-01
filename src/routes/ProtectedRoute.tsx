// import { useEffect } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoute: React.FC = () => {
//   const location = useLocation();

//   // read token from query string if present
//   const params = new URLSearchParams(location.search);
//   const tokenFromUrl = params.get("token");

//   // get whatever is currently stored
//   const storedToken = localStorage.getItem("auth_token");

//   useEffect(() => {
//     if (tokenFromUrl) {
//       // if token in URL, save it
//       localStorage.setItem("auth_token", tokenFromUrl);

//       // optional: remove token from URL after saving
//       window.history.replaceState({}, document.title, location.pathname);
//     }
//   }, [tokenFromUrl, location.pathname]);

//   const auth_token = tokenFromUrl || storedToken;

//   if (!auth_token) {
//     return <Navigate to="/signin" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



















import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  // read token from query string if present
  const params = new URLSearchParams(location.search);
  const tokenFromUrl = params.get("token");

  // get whatever is currently stored
  const storedToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (tokenFromUrl) {
      // if token in URL, save it
      localStorage.setItem("auth_token", tokenFromUrl);

      // optional: remove token from URL after saving
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [tokenFromUrl, location.pathname]);

  const auth_token = tokenFromUrl || storedToken;

  useEffect(() => {
    if (auth_token) {
      // jab bhi login ho jaye, popup open kar do
      setShowModal(true);
    }
  }, [auth_token]);


  if (!auth_token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Outlet />;
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/10 backdrop-blur-sm">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()} // background pe click se band na ho
          >
            <h2 className="text-xl font-bold mb-4 text-center">Payment Required</h2>
            <p className="mb-6 text-center">Please proceed with the payment to continue.</p>

            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowModal(false)} // sirf button pe hi close hoga
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

    </>
  )
};

export default ProtectedRoute;
