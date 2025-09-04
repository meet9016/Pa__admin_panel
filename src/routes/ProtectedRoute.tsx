import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import endPointApi from "../pages/utils/endPointApi";
import api from "../pages/utils/axiosInstance";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  // Modal should be controlled ONLY by subscription status
  const [showModal, setShowModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);
  const [checking, setChecking] = useState(true); // prevent any flash while checking

  // read token from query string if present
  const params = new URLSearchParams(location.search);
  const tokenFromUrl = params.get("token");

  // get whatever is currently stored
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  useEffect(() => {
    if (tokenFromUrl) {
      // if token in URL, save it
      localStorage.setItem("auth_token", tokenFromUrl);
      // remove token from URL
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [tokenFromUrl, location.pathname]);

  const auth_token = tokenFromUrl || storedToken;

  // ✅ Only check subscription to decide modal visibility
  useEffect(() => {
    const checkSubscription = async () => {
      // no token → no need to check
      if (!auth_token) {
        setChecking(false);
        return;
      }
      try {
        const res = await api.post(`${endPointApi.subscriptiosCheckStatus}`);
        if (res?.data?.status === 200) {
          const isActive = !!res.data.data?.subscriptions_status; // true means active
          const payUrl = res.data.data?.pay_url as string | undefined;

          setRedirectUrl(payUrl);
          setShowModal(!isActive); // show modal only if NOT active
        } else {
          // on unexpected response, don't show the modal
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        setShowModal(false);
      } finally {
        setChecking(false);
      }
    };

    checkSubscription();
    // re-check when path or token changes
  }, [location.pathname, auth_token]);

  if (!auth_token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Outlet />
      {/* render modal only after check completes */}
      {!checking && showModal && (
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
                  setShowModal(false);
                }
              }}
              alt="Upgrade / Payment"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
