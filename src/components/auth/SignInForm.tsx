import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { saveToken } from "../../pages/utils/tokenManager";
import endPointApi from "../../pages/utils/endPointApi";
import api from "../../pages/utils/axiosInstance";

type FormData = {
  mobile: string;
  otp: string;
};

export default function SignInForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    mobile: "",
    otp: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signIn = async () => {

    try {
      // Use auth service to login
      const formdata = new FormData();

      formdata.append("number", formData.mobile || "");
      formdata.append("otp", formData.otp);
      const res = await api.post(`${endPointApi.loginUser}`, formdata);
      
      if(res.data.status == 200){
        saveToken(res.data.data.token)
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // 👈 stop refresh
                signIn();
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
                  />
                </div>
                <div>
                  <Label>
                    Otp <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      name="otp"
                      placeholder="Enter your otp"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" onClick={() => signIn()}>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
