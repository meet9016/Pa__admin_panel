import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import { PlusIcon } from "../../icons";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function Product() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.getProductList}`, {});
        if (res.data && res.data.data) {
          setProductsData(res.data.data as Product[]); // type cast
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
        title="Product"
        description="This is React.js Basic Tables Dashboard page for TailAdmin"
      />
      {/* <PageBreadcrumb pageTitle="Products" /> */}
      <div className="space-y-6">
        <ComponentCard
          title="Product List"
          Plusicon={<PlusIcon />}
          addProduct="Add product"
          onAddProductClick="/add-product"
        >
          <BasicTableOne productsData={productsData} />
        </ComponentCard>
      </div>
    </>
  );
}
