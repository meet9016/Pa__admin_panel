import { useState, useEffect, useRef } from "react";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
interface Product {
  order_number: string;
  user_name: string;
  mobile_number: string;
  order_date: string;
  product_count: string;
  final_total_amount: string;
  // Include other fields if needed
}

export default function Order() {
  const [products, setProducts] = useState<Product[]>([]);

  // const [expandedRows, setExpandedRows] = useState(null);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>({});
  const toast = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.orderList}`);
        if (res.data && res.data.data) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log("API Error", error);
      }
    };
    fetchData();
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <button
        onClick={() => {
          if (rowData.view_link) {
            window.open(rowData.view_link, "_blank");
          } else {
            console.log("No view_link available");
          }
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-[#251c4b] text-white 
                 hover:bg-[#3a2d6e] hover:shadow-md 
                 transition-all duration-200"
      >
        <i className="pi pi-eye text-white text-base"></i>
        <span className="text-sm font-medium">View Product</span>
      </button>
    );
  };

  return (
    <>
      <PageMeta
        title="inquiry"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Inquirys" /> */}
      <div className="space-y-6">
        <ComponentCard
          title="Inquiry List"
          // Plusicon={<DownloadIcon />}
        >
          {/* <div className="card">
            <Toast ref={toast} />
            <DataTable
              value={products}
              expandedRows={expandedRows}
              onRowToggle={(e: any) => setExpandedRows(e.data)}
              dataKey="id"
              tableStyle={{ minWidth: "60rem" }}
              emptyMessage="No product found"
            >
              <Column field="order_number" header="Inquiry Number" sortable />
              <Column field="user_name" header="Name" sortable />
              <Column field="mobile_number" header="Whatsapp No." sortable />
              <Column field="order_date" header="Inquiry Date" sortable />
              <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
          </div> */}
          <div className="card">
            <Toast ref={toast} />

            {/* ✅ Desktop Table */}
            <div className="hidden md:block">
              <DataTable
                value={products}
                expandedRows={expandedRows}
                onRowToggle={(e: any) => setExpandedRows(e.data)}
                dataKey="id"
                tableStyle={{ minWidth: "60rem" }}
                emptyMessage="No product found"
              >
                <Column field="order_number" header="Inquiry Number" sortable />
                <Column field="user_name" header="Name" sortable />
                <Column field="mobile_number" header="Whatsapp No." sortable />
                <Column field="order_date" header="Inquiry Date" sortable />
                <Column header="Action" body={actionBodyTemplate} />
              </DataTable>
            </div>

            {/* ✅ Mobile Cards */}
            <div className="grid gap-2 md:hidden">
              {products?.length > 0 ? (
                products.map((row: any) => (
                  <div
                    key={row.id}
                    className="p-3 border-b transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-semibold text-gray-800">
                        Inquiry #{row.order_number}
                      </h3>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <i className="pi pi-calendar text-gray-400 text-sm"></i>
                        {row.order_date}
                      </span>
                      
                    </div>

                    {/* Body */}
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {row.user_name}
                      </p>
                      <p>
                        <span className="font-medium">Number:</span>{" "}
                        {row.mobile_number}
                      </p>
                    </div>
                    {/* Footer Action */}
                    <div className="mt-3 flex justify-start">
                      <button
                        onClick={() => {
                          if (row.view_link) {
                            window.open(row.view_link, "_blank");
                          } else {
                            console.log("No view_link available");
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg 
               bg-[#251c4b] text-white 
               hover:bg-[#3a2d6e] hover:shadow-md 
               transition-all duration-200 view-product-btn"
                      >
                        <i className="pi pi-eye text-white text-base"></i>
                        <span className="text-sm font-medium">
                          View Product
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm">
                  No product found
                </p>
              )}
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
