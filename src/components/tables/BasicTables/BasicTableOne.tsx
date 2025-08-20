import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Product } from '../../../pages/Product/Product';
import 'primeicons/primeicons.css';
import { useState, useEffect } from 'react';
import DialogBox from '../../common/DialogBox';
import api from '../../../pages/utils/axiosInstance';
import endPointApi from '../../../pages/utils/endPointApi';
import { useNavigate } from 'react-router';

type Props = {
  productsData: Product[];
};

export default function BasicTableOne({ productsData }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<any>(null);
  const [tableData, setTableData] = useState<Product[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    setTableData(productsData);
  }, [productsData]);

  const imageBodyTemplate = (rowData: any) => {
    return <img src={rowData.product_image} alt="product" width="30" />;
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div className="flex gap-5">
        <i
          className="pi pi-pen-to-square cursor-pointer"
          style={{ color: 'green' }}
          onClick={() => navigate('/add-product', { state: { productId: rowData.product_id } })}
        ></i>

        <i
          className="pi pi-trash cursor-pointer"
          style={{ color: 'red' }}
          onClick={() => {
            setSelectedProductId(rowData.product_id);
            setIsDialogOpen(true);
          }}
        ></i>
      </div>
    );
  };



  const handleConfirmDelete = async () => {
    if (!selectedProductId) return;
    const formData = new FormData();
    formData.append('product_id', selectedProductId)
    try {
      const res = await api.post(`${endPointApi.deleteProduct}`, formData);
      if (res.data && res.data.data) {
        setTableData((prevData) =>
          prevData.filter((item) => item.product_id !== selectedProductId)
        );
        setIsDialogOpen(false);
        setSelectedProductId(null);
        console.log("Product deleted successfully");
      }
    } catch (error) {
      console.error("API Error", error);
    }
  };


  return (
    <div className={`relative rounded-xl transition ${isDialogOpen ? "bg-gray-100" : "bg-white"}`}>
      <DataTable
        value={tableData ?? []}
        dataKey="product_id"
        tableStyle={{ minWidth: '60rem' }}
        paginator rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="product_name" header="Product Name" sortable></Column>
        <Column field="price" header="Price" sortable></Column>
        <Column field="cancle_price" header="Cancel Price" sortable></Column>
        <Column field="category_name" header="Category" sortable></Column>
        <Column field="sub_category_name" header="Sub Category" sortable></Column>
        <Column body={imageBodyTemplate} header="Image" sortable></Column>
        <Column body={actionBodyTemplate} header="Action"></Column>
      </DataTable>
      
      <DialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
