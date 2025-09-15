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
  whatsapp: string;
  gst: string;
  facebook: string;
  instagram_link: string;
  youtube_link: string;
  linkdin_link: string;
  website_link: string;
}

export default function UserInfoCard() {
  // const { isOpen, closeModal } = useModal();

  const [editData, setFormData] = useState<FormData>({
    full_name: "",
    number: "",
    company_name: "",
    address: "",
    whatsapp: "",
    gst: "",
    facebook: "",
    instagram_link: "",
    youtube_link: "",
    linkdin_link: "",
    website_link: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});






  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedImage(file);
  //     setPreviewUrl(URL.createObjectURL(file));
  //   }
  // };

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
            gst: res.data.data.gst_number || "",
            whatsapp: res.data.data.whatsapp_number || "",
            address: res.data.data.address || "",
            facebook: res.data.data.facebook_link || "", // Default to empty string if not available
            instagram_link: res.data.data.instagram_link || "",
            youtube_link: res.data.data.youtube_link || "",
            linkdin_link: res.data.data.linkdin_link || "",
            website_link: res.data.data.website_link || "",
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
    let newErrors: Record<string, string> = {};

    if (!editData.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
    }
    if (!editData.number.trim()) {
      newErrors.number = "Number is required";
    } else if (editData.number.length !== 10) {
      newErrors.number = "Number must be 10 digits";
    }
    if (!editData.company_name.trim()) {
      newErrors.company_name = "Company Name is required";
    }
    if (!editData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp Number is required";
    } else if (editData.whatsapp.length !== 10) {
      newErrors.whatsapp = "WhatsApp Number must be 10 digits";
    }
    if (!editData.gst.trim()) {
      newErrors.gst = "GST is required";
    }
    if (!editData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    // agar errors hai to API call mat karna
    if (Object.keys(newErrors).length > 0) return;


    try {
      const formData = new FormData();
      formData.append("full_name", editData?.full_name);
      formData.append("number", editData?.number);
      formData.append("company_name", editData?.company_name);
      formData.append("gst_number", editData?.gst);

      formData.append("address", editData?.address);
      formData.append("address", editData?.address);
      formData.append("whatsapp_number", editData?.whatsapp);
      formData.append("facebook_link", editData?.facebook);
      formData.append("instagram_link", editData?.instagram_link);
      formData.append("youtube_link", editData?.youtube_link);
      formData.append("linkdin_link", editData?.linkdin_link);
      formData.append("website_link", editData?.website_link);
      formData.append("user_image", "male");


      if (selectedImage) {
        formData.append("business_logo", selectedImage);
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
  // const [, setSocialLinks] = useState({
  //   facebook: "",
  //   x: "https://x.com/PimjoHQ",
  //   linkedin: "https://www.linkedin.com/company/pimjo",
  //   instagram: "https://instagram.com/PimjoHQ",

  // const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setSocialLinks((prev) => ({ ...prev, [name]: value }));
  // };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <div className="p-2  mb-5 bg-white dark:bg-gray-900">
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* Left: Image with Edit Icon */}
          <div className="relative w-100 h-100 group">
            {/* Avatar Image */}
            <label htmlFor="avatar-upload" className="cursor-pointer block w-full h-full">
              <div className="w-100 h-80 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 relative">
                <img
                  src={previewUrl || "/images/user/owner.png"} // Use preview or fallback
                  alt="user"
                  className="w-full h-full object-cover"
                />

                {/* Camera Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <i className="pi pi-camera text-white text-4xl transform group-hover:scale-110 transition-transform"></i>
                </div>

                {/* Edit Icon Top-Right */}
                <button
                  type="button"
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    const input = document.getElementById("avatar-upload");
                    if (input) {
                      input.click();
                    }
                  }}

                >
                  <i className="pi pi-pencil text-xl text-gray-700"></i>
                </button>
              </div>
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              id="avatar-upload"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>




          {/* Right: Details */}
          <div className="flex flex-col flex-1 justify-between gap-6">
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
                {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                )}
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
                {errors.number && (
                  <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                )}
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
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company_name">WhatsApp Number</Label>
                <Input
                  type="text"
                  name="whatsapp"
                  placeholder="Whatsapp Number"
                  value={editData?.whatsapp}
                  onChange={handleChange}
                />
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                )}
              </div>
              <div>
                <Label htmlFor="gst">GST</Label>
                <Input
                  type="text"
                  name="gst"
                  placeholder="gst"
                  value={editData?.gst}
                  onChange={handleChange}
                />
                {errors.gst && (
                  <p className="text-red-500 text-sm mt-1">{errors.gst}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={editData?.address}
                onChange={handleChange}
                className="w-full"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                Social Links
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    type="text"
                    name="facebook"
                    placeholder="Facebook URL"
                    value={editData?.facebook}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    type="text"
                    name="instagram_link"
                    placeholder="Instagram URL"
                    value={editData?.instagram_link}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    type="text"
                    name="youtube_link"
                    placeholder="YouTube URL"
                    value={editData?.youtube_link}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    type="text"
                    name="linkdin_link"
                    placeholder="LinkedIn URL"
                    value={editData?.linkdin_link}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    type="text"
                    name="website_link"
                    placeholder="Website URL"
                    value={editData?.website_link}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-[#241B4B] hover:bg-[#3a2d6e] text-white shadow-md px-6 py-2 rounded-lg transition"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
