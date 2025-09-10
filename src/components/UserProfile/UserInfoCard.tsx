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
  const { isOpen, closeModal } = useModal();


  const [editData, setFormData] = useState<FormData>({
    full_name: "",
    number: "",
    company_name: "",
    address: "",
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
console.log("selectedImage",selectedImage);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            full_name: res.data.data.full_name || '',
            number: res.data.data.number || '',
            company_name: res.data.data.company_name || '',
            address: res.data.data.address || '',
          });
          setPreviewUrl(res.data.data.business_logo)
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
        formData.append('business_logo', selectedImage); // Match your API's expected field
      }
      const res = await api.post(`${endPointApi.supplierEditProfile}`, formData);
      console.log("res.data.data", res);

      if (res.data.status == 200) {
        toast.success("Profile update successfully!")
      }
    } catch (error) {
      console.log("API Error", error);
    }
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex items-center justify-between p-1 rounded-2xl">
        {/* Left: Avatar + Name */}
        <div className="relative w-16 h-16">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="w-16 h-16 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
              <img
                src={previewUrl || "/images/user/owner.png"} // Use preview or fallback
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>


        {/* Right: Edit Button */}
        <button
          // onClick={openModal} // Uncomment this if needed
          className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          onClick={handleSave}
        >
          {/* <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg> */}
          Save
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mt-5">
        <div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              {/* <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? `${user.full_name}` : "Loading.."}
              </p> */}
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={editData?.full_name}
                onChange={handleChange}
              // hint={errors.full_name}
              // error={!!errors.full_name}
              />
            </div>

            <div>
              {/* <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? `${user.number}` : "Loading.."}
              </p> */}
              <Label htmlFor="full_name">Number</Label>
              <Input
                type="text"
                name="number"
                placeholder="number"
                value={editData?.number}
                onChange={handleChange}
              // hint={errors.full_name}
              // error={!!errors.full_name}
              />
            </div>
            <div>
              {/* <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Business
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? `${user.company_name}` : "Loading.."}
              </p> */}
              <Label htmlFor="full_name">Company Nme</Label>
              <Input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={editData?.company_name}
                onChange={handleChange}
              // hint={errors.full_name}
              // error={!!errors.full_name}
              />
            </div>
            <div>
              {/* <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? `${user.address}` : "-"}
              </p> */}
              <Label htmlFor="full_name">Address</Label>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={editData?.address}
                onChange={handleChange}
              // hint={errors.full_name}
              // error={!!errors.full_name}
              />
            </div>

          </div>
        </div>

        {/* <button
          // onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button> */}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
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
      </Modal>
    </div>
  );
}
