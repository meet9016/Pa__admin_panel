import { useState, useEffect, useRef } from "react";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

export default function Order() {
  const [products, setProducts] = useState([]);
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

  const imageBodyTemplate = (rowData: any) => {
    return (
      <img
        src={rowData}
        alt={rowData?.image}
        width="64px"
        className="shadow-4"
      />
    );
  };


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






  const rowExpansionTemplate = (data: any) => {
    return (
      <div className="p-3">
        {/* <h5>Inquiry Product List</h5> */}
        <DataTable value={data.order_items}>
          <Column field="product_name" header="Product Name"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column
            field="product_image"
            header="Product Image"
            body={imageBodyTemplate}
          ></Column>
          {/* <Column field="price" header="Price" body={priceTemplate}></Column>
          <Column field="sub_total" header="Sub Total"></Column> */}
        </DataTable>
      </div>
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
        <ComponentCard title="Inquiry List">
          <div className="card">
            <Toast ref={toast} />
            <DataTable
              value={products}
              expandedRows={expandedRows}
              onRowToggle={(e: any) => setExpandedRows(e.data)}
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id"
              tableStyle={{ minWidth: "60rem" }}
              emptyMessage="No product found"
            >
              <Column style={{ width: "5rem" }} />
              <Column field="order_number" header="Inquiry Number" sortable />
              <Column field="user_name" header="Name" sortable />
              <Column field="mobile_number" header="Whatsapp No." sortable />
              <Column field="order_date" header="Inquiry Date" sortable />
              {/* <Column field="product_count" header="Product Count" sortable /> */}
              <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
