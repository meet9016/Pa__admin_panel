import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import { toast } from "react-toastify";

interface Issue {
  id: number;
  title: string;
}
export default function Support() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  console.log(selectedIssue, 'selectedIssue');


  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await api.post(endPointApi.supplierSupportTitle);
        if (res.data && res.data.data) {
          setIssues(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    fetchIssues();
  }, []);

  // const handleSubmit = async () => {
  //   try {
  //     // if (!selectedIssue) {
  //     //   return toast.error("hello")
  //     // }
  //     // if (!message) {
  //     //   return toast.error("hello00000")
  //     // }
  //     const formData = new FormData();
  //     formData.append('support_title_id', selectedIssue)
  //     formData.append('message', message)
  //     const res = await api.post(endPointApi.supplierSupportQueryAdd, formData)
  //     if (res.data) {
  //       toast.success(res.data.message)
  //     }
  //   } catch (error) {
  //     console.log("Error Fetch", error)
  //   }
  // }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("support_title_id", selectedIssue);
      formData.append("message", message);

      const res = await api.post(endPointApi.supplierSupportQueryAdd, formData);

      if (res.data?.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error: any) {
      console.log("Error Fetch", error);
      toast.error(error.response?.data?.message);
    }
  };


  return (
    <>
      <PageMeta
        title="Support"
        description="This is the Support page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Support" />

      <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Support */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
              Select Issue
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-[#251c4b] focus:outline-none"
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
            >
              <option value="">-- Select --</option>
              {issues.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.title}
                </option>
              ))}
            </select>
          </div>

          {/* Textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
              Describe Your Problem
            </label>
            <textarea
              rows={3}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-[#251c4b] focus:outline-none"
            >
            </textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#251c4b] text-white py-2 font-semibold hover:bg-[#251c4b] transition">
            Submit
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Our support team is here to help you with technical issues.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="pi pi-phone text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-white/60">
                Support Number
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                +91 99099 29293
              </p>
            </div>
          </div>
        </div>
        {/* <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Our support team is here to help you with billing issues.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="pi pi-phone text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-white/60">
                Support Number
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                +91 99099 29293
              </p>
            </div>
          </div>
        </div> */}
        {/* Email Support */}
        <div className="">
          {/* <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Our support team is here to help you with technical issues.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="pi pi-phone text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-white/60">
                Support Number
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                +91 99099 29293
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
