import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

export default function Order() {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
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

  // const allowExpansion = (rowData: any) => {
  //   return rowData?.order_items?.length > 0;
  // };

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
  // const priceTemplate = (rowData: any) => {
  //   return `₹ ${rowData.price}`;
  // };

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
        className="p-button p-button-text p-button-sm"
      >
        <i className="pi pi-eye text-blue-600" style={{ fontSize: "1.2rem" }}></i>
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
      <PageBreadcrumb pageTitle="Inquirys" />
      <div className="space-y-6">
        <ComponentCard >
          <div className="card">
            <Toast ref={toast} />
            <DataTable
              value={products}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id"
              tableStyle={{ minWidth: "60rem" }}
            >
              <Column style={{ width: "5rem" }} />
              <Column field="order_date" header="Inquiry Date" sortable />
              <Column field="order_number" header="Inquiry Number" sortable />
              <Column field="user_name" header="Name" sortable />
              <Column field="mobile_number" header="Whatsapp No." sortable />
              <Column field="product_count" header="Product Count" sortable />
              <Column header="Action" body={actionBodyTemplate} />
              {/* <Column
                field="final_total_amount"
                header="Total Amount"
                sortable
              /> */}
            </DataTable>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
