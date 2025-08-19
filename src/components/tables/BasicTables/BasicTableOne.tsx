import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Product } from '../../../pages/Product/Product';

type Props = {
  productsData: Product[];
};

export default function BasicTableOne({ productsData }: Props) {

  const imageBodyTemplate = (rowData: any) => {
    return <img src={rowData.product_image} alt="product" width="30" />;
  };

  const actionBodyTemplate = () => {
    return (
      <div className="flex gap-2">
        <img src='/src/icons/pencil.svg' className='text-green-500' />
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={productsData ?? []}
        // selection={selectedProducts}
        // onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: '60rem' }}
        paginator rows={10}
        rowsPerPageOptions={[10,20,50]}
      >
        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
        <Column field="product_name" header="Product Name" sortable></Column>
        <Column field="price" header="Price" sortable></Column>
        <Column field="cancle_price" header="Cancel Price" sortable></Column>
        <Column field="category_name" header="Category" sortable></Column>
        <Column field="sub_category_name" header="Sub Category" sortable></Column>
        <Column body={imageBodyTemplate} header="Image" sortable></Column>
        <Column body={actionBodyTemplate} header="Action" sortable></Column>
      </DataTable>
    </div>
  );
}
