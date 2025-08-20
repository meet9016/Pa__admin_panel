import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useEffect, useState } from "react";
import api from "./utils/axiosInstance";
import endPointApi from "./utils/endPointApi";




export interface Product {
  prefix: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  full_name: string,
  number: number,
  gender: string,
  address: string
  company_name: string
}

export default function UserProfiles() {
  const [data, setData] = useState<Product[]>([]);


  useEffect(() => {
    const formData = new FormData();
    formData.append('product_id', 'dVdSZWZEOW1XVWd6cEJzcXZsbTB4UT09')
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.profile}`, formData);
        if (res.data && res.data.data) {
          setData(res.data.data as Product[]);
        }
      } catch (error) {
        console.log("API Error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={data} />
          <UserInfoCard user={data} />
          <UserAddressCard user={data}/>
        </div>
      </div>
    </>
  );
}
