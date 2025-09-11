import { useState, useEffect, useRef } from "react";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { PlusIcon } from "../../icons";

export default function Subscription() {
  const [products, setProducts] = useState([]);
  // const [expandedRows, setExpandedRows] = useState(null);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>({});
  const toast = useRef(null);
  console.log("products", products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.supplierBilling}`);
        if (res.data && res.data.data) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log("API Error", error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (value: string) => {
    // console.log(value, 'valueeeeeee');
    if (!value) return "";
    return value.split(" ")[0];
  };

  const actionBodyTemplate = (rowData: any) => {
    console.log("rowData", rowData);

    return (
      <button
        onClick={() => {
          if (rowData.invoive_link) {
            window.open(rowData.invoive_link, "_blank");
          } else {
            console.log("No view_link available");
          }
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-[#251c4b] text-white 
                 hover:bg-[#3a2d6e] hover:shadow-md 
                 transition-all duration-200"
      >
        <i className="pi pi-download text-white text-base"></i>
        {/* <span className="text-sm font-medium">Download</span> */}
      </button>
    );
  };

  return (
    <>
      <PageMeta
        title="Invoice"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Billings" /> */}
      <div className="space-y-6">
        <ComponentCard
          title="Invoice List"
          Plusicon={<PlusIcon />}
          // addProduct="Upgrade Plan"
        >
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
                <Column field="no" header="No." sortable />
                <Column field="invoice_no" header="Invoice No" sortable />
                <Column field="txnid" header="Transaction Id" sortable />
                <Column
                  field="cdate"
                  header="Payment Date"
                  body={(rowData) => formatDate(rowData.cdate)}
                  sortable
                />
                <Column
                  field="starting_date"
                  header="Starting Date"
                  body={(rowData) => formatDate(rowData.starting_date)}
                  sortable
                />
                <Column
                  field="ending_date"
                  header="Ending Date"
                  body={(rowData) => formatDate(rowData.ending_date)}
                  sortable
                />
                <Column
                  field="amount"
                  header="Amount"
                  body={(rowData) => (
                    <span className="flex items-center gap-1 font-medium text-gray-800">
                      ₹ {rowData.amount}
                    </span>
                  )}
                  sortable
                />
                <Column
                  header="Invoice"
                  body={(rowData) => actionBodyTemplate(rowData)}
                />
              </DataTable>
            </div>

            {/* ✅ Mobile Cards */}
            <div className="grid gap-2 md:hidden">
              {(products ?? []).map((row: any, index: number) => (
                <div
                  key={row.id}
                  className="transition-all duration-300 overflow-hidden"
                >
                  {/* Header with Invoice No */}
                  <div
                    className="flex justify-between items-center px-3 py-2 border-b"
                    style={{ backgroundColor: "#251c4b", color: "white" }}
                  >
                    <span className="text-xs font-semibold text-white-300">
                      #{index + 1} • {row.invoice_no}
                    </span>
                    <span className="text-xs text-white-500 flex items-center">
                      <i className="pi pi-calendar text-white-400 text-[10px] mr-2"></i>
                      {formatDate(row.cdate)}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="p-3 space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Txn Id:</span> {row.txnid}
                    </p>
                    <p>
                      <span className="font-semibold">Start:</span>{" "}
                      {formatDate(row.starting_date)}
                    </p>
                    <p>
                      <span className="font-semibold">End:</span>{" "}
                      {formatDate(row.ending_date)}
                    </p>
                    <p className="font-semibold text-black-600">
                      <span className="font-semibold">Amount:</span> ₹{" "}
                      {row.amount}
                    </p>
                    <button
                      onClick={() => {
                        if (row.invoive_link) {
                          window.open(row.invoive_link, "_blank");
                        } else {
                          console.log("No invoice link available");
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-[#251c4b] text-white 
                       hover:bg-[#3a2d6e] hover:shadow-md 
                       transition-all duration-200 mobile-download"
                    >
                      <i className="pi pi-download text-white text-base"></i>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
