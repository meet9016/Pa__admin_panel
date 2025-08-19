// import React, { useState, useEffect, useRef } from "react";
// import { DataTable, DataTableExpandedRows } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Toast } from "primereact/toast";
// import { ProductService } from "../../service/ProductService";
// import PageMeta from "../../components/common/PageMeta";
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import ComponentCard from "../../components/common/ComponentCard";

// interface OrderItem {
//     id: string;
//     customer: string;
//     date: string;
//     amount: number;
//     status: string;
// }

// interface Product {
//     id: string;
//     name: string;
//     category: string;
//     price: number;
//     orders: OrderItem[];
// }

// export default function Order() {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | Product[] | null>(null);
//     const toast = useRef<Toast>(null);

//     useEffect(() => {
//         ProductService.getProductsWithOrdersSmall().then((data: Product[]) =>
//             setProducts(data)
//         );
//     }, []);

//     const allowExpansion = (rowData: Product) => {
//         return rowData.orders.length > 0;
//     };

//     const rowExpansionTemplate = (data: Product) => {
//         return (
//             <div className="p-3">
//                 <h5>Orders for {data.name}</h5>
//                 <DataTable value={data.orders}>
//                     <Column field="id" header="prod_list" sortable />
//                     <Column field="customer" header="prod_name" sortable />
//                     <Column field="date" header="quantity" sortable />
//                     <Column field="amount" header="price" sortable />
//                     <Column field="status" header="sub_total" sortable />
//                 </DataTable>
//             </div>
//         );
//     };

//     return (
//         <>
//             <PageMeta
//                 title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//                 description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//             />
//             <PageBreadcrumb pageTitle="Order Table" />
//             <div className="space-y-6">
//                 <ComponentCard title="Basic Order Table">
//                     <div className="card">
//                         <Toast ref={toast} />
//                         <DataTable
//                             value={products}
//                             expandedRows={expandedRows}
//                             onRowToggle={(e) => setExpandedRows(e.data)}
//                             rowExpansionTemplate={rowExpansionTemplate}
//                             dataKey="id"
//                             tableStyle={{ minWidth: "60rem" }}
//                             paginator rows={5}
//                             rowsPerPageOptions={[10, 20, 50]}
//                         >                                                       
//                             <Column expander={allowExpansion} style={{ width: "5rem" }} />
//                             <Column field="price" header="Order No" sortable />
//                             <Column field="price" header="Order Date" sortable />
//                             <Column field="name" header="User Name" sortable />
//                             <Column field="category" header="Mobile No" sortable />
//                             <Column field="price" header="Product Count" sortable />
//                             <Column field="price" header="Amount" sortable />
//                         </DataTable>
//                     </div>
//                 </ComponentCard>
//             </div>
//         </>
//     );
// }



























import React, { useState, useEffect, useRef } from "react";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProductService } from "../../service/ProductService";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

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
    orders: OrderItem[];
}

export default function Order() {
    const [products, setProducts] = useState<Product[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | Product[] | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        ProductService.getProductsWithOrdersSmall().then((data: Product[]) =>
            setProducts(data)
        );
    }, []);

    const allowExpansion = (rowData: Product) => {
        return rowData.orders.length > 0;
    };

    const rowExpansionTemplate = (data: Product) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.name}</h5>
                <DataTable value={data.orders}>
                    <Column field="id" header="prod_list" sortable />
                    <Column field="customer" header="prod_name" sortable />
                    <Column field="date" header="quantity" sortable />
                    <Column field="amount" header="price" sortable />
                    <Column field="status" header="sub_total" sortable />
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
                <span className="pi pi-user"></span>

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
                            paginator
                            rows={5}
                            rowsPerPageOptions={[10, 20, 50]}
                        >
                            <Column
                                expander={allowExpansion}
                                style={{ width: "5rem" }}
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="price"
                                header="Order No"
                                sortable
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="price"
                                header="Order Date"
                                sortable
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="name"
                                header="User Name"
                                sortable
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="category"
                                header="Mobile No"
                                sortable
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="price"
                                header="Product Count"
                                sortable
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="price"
                                header="Amount"
                                sortable
                                headerClassName="text-center"
                                bodyClassName="text-center"
                            />
                        </DataTable>
                        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>

                    </div>
                </ComponentCard>
            </div>
        </>
    );
}



























