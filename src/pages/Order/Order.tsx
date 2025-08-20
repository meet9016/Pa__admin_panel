import React, { useState, useEffect, useRef } from "react";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProductService } from "../../service/ProductService";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import { Product } from "../Product/Product";

interface OrderItem {
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: string;
}

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    order_items: OrderItem[];
}



export default function Order() {
    const [products, setProducts] = useState<Product[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | Product[] | null>(null);
    const toast = useRef<Toast>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const formData = new FormData();
            formData.append('product_id', 'dVdSZWZEOW1XVWd6cEJzcXZsbTB4UT09')
            try {
                const res = await api.post(`${endPointApi.orderList}`, formData)
                if (res.data && res.data.data) {
                    setProducts(res.data.data)
                }
            } catch (error) {
                console.log('API Error', error)
            }
        }
        fetchData()
    }, []);

    const allowExpansion = () => {
        return products.order_items.length > 0;
    };

    const rowExpansionTemplate = () => {
        return (
            <div className="p-3">
                <h5>Orders for</h5>
                <DataTable value={products.order_items}>
                    <Column field="product_image" header="prod_img" sortable />
                    <Column field="product_name" header="prod_name" sortable />
                    <Column field="quantity" header="quantity" sortable />
                    <Column field="price" header="price" sortable />
                    <Column field="sub_total" header="sub_total" sortable />
                </DataTable>
            </div>
        );
    };


    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Order Table" />
            <div className="space-y-6">
                <ComponentCard title="Basic Order Table">
                    <div className="card">
                        <Toast ref={toast} />
                        <DataTable
                            value={products}
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}
                            dataKey="id"
                            tableStyle={{ minWidth: "60rem" }}
                            paginator rows={5}
                            rowsPerPageOptions={[10, 20, 50]}
                            expander={allowExpansion}
                        >
                            <Column style={{ width: "5rem" }} />
                            <Column field="order_number" header="Order No" sortable />
                            <Column field="order_date" header="Order Date" sortable />
                            <Column field="user_name" header="User Name" sortable />
                            <Column field="mobile_number" header="Mobile No" sortable />
                            <Column field="product_count" header="Product Count" sortable />
                            <Column field="final_total_amount" header="Amount" sortable />
                        </DataTable>
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}




































