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
import endPointApi from "../pages/utils/endPointApi";
import api from "../pages/utils/axiosInstance";
const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState();

  // read token from query string if present
  const params = new URLSearchParams(location.search);
  const tokenFromUrl = params.get("token");

  // get whatever is currently stored
  const storedToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (tokenFromUrl) {
      // if token in URL, save it
      localStorage.setItem("auth_token", tokenFromUrl);
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [tokenFromUrl, location.pathname]);

  const auth_token = tokenFromUrl || storedToken;

  useEffect(() => {
    if (auth_token) {
      setShowModal(true);
    }
  }, [auth_token]);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await api.post(`${endPointApi.subscriptiosCheckStatus}`);
        if (res.data.status === 200) {
          setShowModal(!res.data.data.subscriptions_status);
          setRedirectUrl(res.data.data.pay_url);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, [location.pathname]);

  if (!auth_token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Outlet />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/10 backdrop-blur-sm">
          <div
            className="bg-white p-0 rounded-lg shadow-lg w-full max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="https://pa.2-min.in/upload/web_logo/mainBanner.jpg"
              className="w-full h-auto rounded-lg cursor-pointer"
              onClick={async () => {
                try {
                  if (redirectUrl) {
                    window.location.href = redirectUrl;
                  }
                } catch (error) {
                  console.error("Payment error:", error);
                } finally {
                  setShowModal(true); // close modal again
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
