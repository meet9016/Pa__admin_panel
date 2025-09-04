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

  return (
    <>
      <PageMeta
        title="Billing"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Billings" /> */}

      <div className="space-y-6">
        <ComponentCard
          title="Billing List"
          Plusicon={<PlusIcon />}
          addProduct="Upgrade Plan"
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
              <Column field="invoice_no" header="Invoice No" sortable />
              <Column field="txnid" header="Transection Id" sortable />
              <Column field="cdate" header="Payment Date" sortable />
              <Column field="starting_date" header="Starting Date" sortable />
              <Column field="ending_date" header="Ending Date" sortable />
              <Column field="amount" header="Amount" sortable />
            </DataTable>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
