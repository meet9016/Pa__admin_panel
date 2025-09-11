import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useEffect, useState } from "react";
import endPointApi from "../../pages/utils/endPointApi";
import api from "../../pages/utils/axiosInstance";
import { toast } from "react-toastify";

interface FormData {
  full_name: string;
  number: string;
  company_name: string;
  address: string;
}

export default function UserInfoCard() {
  // const { isOpen, closeModal } = useModal();

  const [editData, setFormData] = useState<FormData>({
    full_name: "",
    number: "",
    company_name: "",
    address: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  console.log("selectedImage", selectedImage);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.profile}`);
        console.log("res.data.data", res.data.data);

        if (res.data && res.data.data) {
          setFormData({
            full_name: res.data.data.full_name || "",
            number: res.data.data.number || "",
            company_name: res.data.data.company_name || "",
            address: res.data.data.address || "",
          });
          setPreviewUrl(res.data.data.business_logo);
        }
      } catch (error) {
        console.log("API Error", error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", editData?.full_name);
      formData.append("number", editData?.number);
      formData.append("company_name", editData?.company_name);
      formData.append("address", editData?.address);
      formData.append("gender", "male");
      formData.append("user_image", "male");

      if (selectedImage) {
        formData.append("business_logo", selectedImage); // Match your API's expected field
      }
      const res = await api.post(
        `${endPointApi.supplierEditProfile}`,
        formData
      );
      console.log("res.data.data", res);

      if (res.data.status == 200) {
        toast.success("Profile update successfully!");
      }
    } catch (error) {
      console.log("API Error", error);
    }
  };
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://www.facebook.com/PimjoHQ",
    x: "https://x.com/PimjoHQ",
    linkedin: "https://www.linkedin.com/company/pimjo",
    instagram: "https://instagram.com/PimjoHQ",
  });

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="p-5 rounded-2xl dark:border-gray-800 lg:p-6 mb-5">
        <div className="w-full overflow-hidden flex flex-col md:flex-row">
          {/* Left: Image with Edit Icon */}
          <div className="relative w-full md:w-1/3">
            <img
              src={previewUrl || "/images/user/owner.png"}
              alt="User"
              className="w-full h-56 md:h-full object-cover rounded-2xl"
            />
            {/* Edit Icon Overlay */}
            <button
              // onClick={handleImageChange}
              className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition"
            >
              <i className="pi pi-pencil text-base"></i>
            </button>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col flex-1 justify-center p-2 md:p-6 gap-6">
            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={editData?.full_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="number">Number</Label>
                <Input
                  type="text"
                  name="number"
                  placeholder="Number"
                  value={editData?.number}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  value={editData?.company_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={editData?.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Footer: Save Button */}
            <div className="flex items-center gap-3 mt-6 lg:justify-end">
               <button
              className="bg-[#241B4B] hover:bg-[#3a2d6e] text-white shadow-md px-4 py-2 rounded-lg transition"
              onClick={handleSave}
            >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      value="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" value="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      value="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input type="text" value="https://instagram.com/PimjoHQ" />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input type="text" value="Musharof" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input type="text" value="Chowdhury" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input type="text" value="randomuser@pimjo.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" value="+09 363 398 46" />
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input type="text" value="Team Manager" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal> */}
      </div>
      <div className="p-5 rounded-2xl dark:border-gray-800 lg:p-6">
        {/* Header */}
        <div className="mb-8">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update your details to keep your profile up-to-date.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col">
          <div className="custom-scrollbar overflow-y-auto pr-2">
            {/* Social Links */}
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Social Links
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    type="text"
                    name="facebook"
                    value={socialLinks.facebook}
                    onChange={handleSocialChange}
                    placeholder="Enter Facebook URL"
                  />
                </div>
                <div>
                  <Label htmlFor="x">X.com</Label>
                  <Input
                    type="text"
                    name="x"
                    value={socialLinks.x}
                    onChange={handleSocialChange}
                    placeholder="Enter X.com URL"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    type="text"
                    name="linkedin"
                    value={socialLinks.linkedin}
                    onChange={handleSocialChange}
                    placeholder="Enter LinkedIn URL"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    type="text"
                    name="instagram"
                    value={socialLinks.instagram}
                    onChange={handleSocialChange}
                    placeholder="Enter Instagram URL"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-6 lg:justify-end">
            <button
              className="bg-[#241B4B] hover:bg-[#3a2d6e] text-white shadow-md px-4 py-2 rounded-lg transition"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
