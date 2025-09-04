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
            <DataTable
              value={products}
              expandedRows={expandedRows}
              onRowToggle={(e: any) => setExpandedRows(e.data)}
              dataKey="id"
              tableStyle={{ minWidth: "60rem" }}
            >
              <Column style={{ width: "5rem" }} />
              <Column field="no" header="No." sortable />
              <Column field="invoice_no" header="Invoice No" sortable />
              <Column field="txnid" header="Transection Id" sortable />
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
              {/* <Column field="amount" header="Amount" sortable /> */}
              <Column
                field="amount"
                header="Amount"
                body={(rowData) => (
                  <span className="flex items-center gap-1">
                    ₹ {rowData.amount}
                  </span>
                )}
                sortable
              />

            </DataTable>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
