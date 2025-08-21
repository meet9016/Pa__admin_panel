import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import api from '../utils/axiosInstance';
import endPointApi from '../utils/endPointApi';

export default function Order() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);

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

    const allowExpansion = (rowData) => {
        return rowData?.order_items?.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.user_name}</h5>
                <DataTable value={data.order_items}>
                    <Column field="id" header="Id"></Column>
                    <Column field="product_name" header="Product Name"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                    <Column field="product_image" header="Product Image"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="sub_total" header="Sub Total"></Column>
                </DataTable>
            </div>
        );
    };


    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id" tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="order_date" header="Order Date" sortable />
                <Column field="order_number" header="Order Number" sortable />
                <Column field="user_name" header="Name" sortable />
                <Column field="mobile_number" header="Whatsapp No." sortable />
                <Column field="product_count" header="Product Count" sortable />
                <Column field="final_total_amount" header="Total Amount" sortable />
            </DataTable>
        </div>
    );
}
























