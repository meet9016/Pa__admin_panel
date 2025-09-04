import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import MostViewInquiry from "../../components/ecommerce/MostViewInquiry";

export default function Home() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [yearlyInquiry, setYearlyInquiry] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.home}`, {});
        if (res.data && res.data.data) {
          setDashboardData(res.data.data);
          setYearlyInquiry(res.data.data.yearly_inquiry || []);
          localStorage.setItem(
            "userData",
            JSON.stringify(res.data.data.user_data)
          );
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
        title="Dashboard"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {dashboardData && (
            <EcommerceMetrics
              totalProducts={dashboardData.total_products}
              totalOrders={dashboardData.total_order}
            />
          )}

          <MonthlySalesChart yearlyInquiry={yearlyInquiry} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MostViewInquiry
            productInquiry={dashboardData?.most_product_inquiry || []}
          />
        </div>

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        <div className="col-span-12 xl:col-span-5">
          {/* <DemographicCard /> */}
          <RecentOrders viewProduct={dashboardData?.most_view_location || []} />
        </div>

        <div className="col-span-12 xl:col-span-7">
          {/* <RecentOrders /> */}
          {/* <MostViewInquiry
            productInquiry={dashboardData?.most_product_inquiry || []}
          /> */}
          <DemographicCard
            viewLocation={dashboardData?.most_view_location || []}
          />
        </div>
      </div>
    </>
  );
}
