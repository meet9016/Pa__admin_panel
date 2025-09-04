// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import Button from "../ui/button/Button";
// import { saveToken } from "../../pages/utils/tokenManager";
// import endPointApi from "../../pages/utils/endPointApi";
// import api from "../../pages/utils/axiosInstance";
// import { toast } from "react-toastify";

// type FormData = {
//   mobile: string;
//   // otp: string;
// };

// export default function SignInForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<FormData>({
//     mobile: "",
//     otp: "",
//   });

//   const [isChecked, setIsChecked] = useState(false);
//   const [error, setError] = useState<{ mobile?: string; otp?: string }>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setError((prev) => ({
//       ...prev,
//       [name]: "",
//     }))
//   };

//   const signIn = async () => {
//     let newErrors: { mobile?: string; otp?: string } = {};

//     // Validation
//     if (!formData.mobile) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobile)) {
//       newErrors.mobile = "Please enter a valid 10-digit mobile number";
//     }

//     // if (!formData.otp) {
//     //   newErrors.otp = "OTP is required";
//     // }

//     if (Object.keys(newErrors).length > 0) {
//       setError(newErrors);
//       return;
//     }

//     setError({});
//     try {
//       // Use auth service to login
//       const formdata = new FormData();

//       formdata.append("number", formData.mobile || "");
//       // formdata.append("otp", formData.otp);
//       const res = await api.post(`${endPointApi.loginUser}`, formdata);
//       console.log("res", res.data.data.user);

//       if (res.data.status == 200) {
//         saveToken(res.data.data.token);
//         navigate("/");
//         localStorage.setItem(
//           "userData",
//           JSON.stringify({
//             full_name: res.data.data.user.full_name,
//             email: res.data.data.user.email,
//           })
//         );

//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err: any) {
//       setError(err.message || "Invalid email or password. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="flex flex-col flex-1">
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-brand-950 text-title-sm dark:text-white/90 sm:text-title-md">
//               Sign In
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Enter your email and password to sign in!
//             </p>
//           </div>
//           <div>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault(); // 👈 stop refresh
//                 signIn();
//               }}
//             >
//               <div className="space-y-6">
//                 <div>
//                   <Label>
//                     Mobile <span className="text-error-500">*</span>{" "}
//                   </Label>
//                   <Input
//                     name="mobile"
//                     placeholder="**********"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                   />
//                   {error.mobile && <p className="text-red-500 text-sm">{error.mobile}</p>}
//                 </div>
//                 {/* <div>
//                   <Label>
//                     Otp <span className="text-error-500">*</span>{" "}
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       name="otp"
//                       placeholder="Enter your otp"
//                       value={formData.otp}
//                       onChange={handleChange}
//                     />
//                     {error.otp && <p className="text-red-500 text-sm">{error.otp}</p>}
//                   </div>
//                 </div> */}
//                 {/* <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Checkbox checked={isChecked} onChange={setIsChecked} />
//                     <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
//                       Keep me logged in
//                     </span>
//                   </div>
//                   <Link
//                     to=""
//                     className="text-sm text-brand-950 hover:text-brand-600 dark:text-brand-400"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div> */}
//                 <div>
//                   <Button className="w-full bg-brand-950" size="sm">
//                     Send Otp
//                   </Button>
//                 </div>
//               </div>
//             </form>

//             {/* <div className="mt-5">
//               <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
//                 Don&apos;t have an account? {""}
//                 <Link
//                   to="/"
//                   className="text-brand-950 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


















import { useState } from "react";
import { useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { saveToken } from "../../pages/utils/tokenManager";
import endPointApi from "../../pages/utils/endPointApi";
import api from "../../pages/utils/axiosInstance";
import { toast } from "react-toastify";
import OtpInput from 'react-otp-input';


type FormData = {
  mobile: string;
  otp: string;
};

interface ErrorState {
  mobile?: string;
  otp?: string;
}

export default function SignInForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    mobile: "",
    otp: "",
  });

  // const [error, setError] = useState<{ mobile?: string; otp?: string }>({});
  const [error, setError] = useState<ErrorState>({});

  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }))
  };

  const signIn = async () => {
    let newErrors: { mobile?: string } = {};

    // Validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    try {
      // Use auth service to login
      const formdata = new FormData();

      formdata.append("number", formData.mobile || "");
      const res = await api.post(`${endPointApi.loginUser}`, formdata);

      if (res.data.status == 200) {
        // saveToken(res.data.data.token);
        // navigate("/");
        // localStorage.setItem(
        //   "userData",
        //   JSON.stringify({
        //     full_name: res.data.data.user.full_name,
        //     email: res.data.data.user.email,
        //   })
        // );
        toast.success(res.data.message);
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    const newErrors: ErrorState = {};

    if (!formData.otp) {
      newErrors.otp = "OTP is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("number", formData.mobile);
      formdata.append("otp", formData.otp);

      const res = await api.post(`${endPointApi.loginUser}`, formdata);
      if (res.data.status === 200) {
        saveToken(res.data.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            full_name: res.data.data.user.full_name,
            email: res.data.data.user.number,
          })
        );
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message)
      }
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>

      <div className="flex flex-col flex-1">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-brand-950 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your Mobile number and Otp to sign in!
              </p>
            </div>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // 👈 stop refresh
                  otpSent ? verifyOtp() : signIn();
                }}
              >
                <div className="space-y-6">
                  <div>
                    <Label>
                      Mobile <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                      name="mobile"
                      placeholder="**********"
                      value={formData.mobile}
                      onChange={handleChange}
                    // disabled={otpSent}
                    />
                    {error.mobile && <p className="text-red-500 text-sm">{error.mobile}</p>}
                  </div>
                  {
                    otpSent && (
                      <div>
                        <Label>
                          Otp <span className="text-error-500">*</span>{" "}
                        </Label>
                        {/* <Input
                        name="otp"
                        placeholder="Enter your otp"
                        value={formData.otp}
                        onChange={handleChange}
                      /> */}

                        <OtpInput
                          value={formData.otp}
                          onChange={(otp) => setFormData(prev => ({ ...prev, otp }))}
                          numInputs={6}
                          renderSeparator={<span className="text-white">-</span>}
                          shouldAutoFocus
                          renderInput={(props) => (
                            <input
                              {...props}
                              style={{ width: "35px", height: "40px" }}
                              className="border  border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#251C4B] transition"
                            />
                          )}
                        />

                        {error.otp && <p className="text-red-500 text-sm">{error.otp}</p>}
                      </div>
                    )
                  }

                  {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to=""
                    className="text-sm text-brand-950 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}
                  <div>
                    <Button className="w-full bg-brand-950" size="sm">
                      {isLoading
                        ? "Please wait..."
                        : otpSent
                          ? "Login"
                          : "Send OTP"
                      }
                    </Button>
                  </div>
                </div>
              </form>

              {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/"
                  className="text-brand-950 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}


















