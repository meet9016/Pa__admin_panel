import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Product } from "../../../pages/Product/Product";
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";
import DialogBox from "../../common/DialogBox";
import api from "../../../pages/utils/axiosInstance";
import endPointApi from "../../../pages/utils/endPointApi";
import { useNavigate } from "react-router";

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
    return <img src={rowData.product_image} alt="product" width="60" />;
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div className="flex gap-5">
        {/* View Button */}
        <i
          className="pi pi-eye text-white text-base"
          style={{ color: "blue" }}
          onClick={() =>
            window.open(
              `https://shop.progressalliance.org/single-product/${
                (rowData as any).product_id
              }`,
              "_blank"
            )
          }
        ></i>
        {/* Edit Button */}
        <i
          className="pi pi-pen-to-square cursor-pointer"
          style={{ color: "green" }}
          onClick={() =>
            navigate("/add-product", {
              state: { productId: (rowData as any).product_id },
            })
          }
        ></i>

        {/* Delete Button */}
        <i
          className="pi pi-trash cursor-pointer"
          style={{ color: "red" }}
          onClick={() => {
            setSelectedProductId((rowData as any).product_id);
            setIsDialogOpen(true);
          }}
        ></i>
      </div>
    );
  };

  const handleConfirmDelete = async () => {
    if (!selectedProductId) return;
    const formData = new FormData();
    formData.append("product_id", selectedProductId);
    try {
      const res = await api.post(`${endPointApi.deleteProduct}`, formData);
      if (res.data && res.data.data) {
        setTableData((prevData) =>
          prevData.filter((item: any) => item.product_id !== selectedProductId)
        );
        setIsDialogOpen(false);
        setSelectedProductId(null);
      }
    } catch (error) {
      console.error("API Error", error);
    }
  };

  return (
    // <div className={`relative rounded-xl transition ${isDialogOpen ? "bg-gray-100" : "bg-white"}`}>
    //   <DataTable
    //     value={tableData ?? []}
    //     dataKey="product_id"
    //     tableStyle={{ minWidth: '60rem' }}
    //     paginator rows={10}
    //     rowsPerPageOptions={[10, 20, 50]}
    //     emptyMessage="No product found"
    //   >
    //     <Column field="no" header="No." sortable></Column>
    //     <Column body={imageBodyTemplate} header="Image" sortable></Column>
    //     <Column field="product_name" header="Product Name" sortable></Column>
    //     <Column field="category_name" header="Category" sortable></Column>
    //     <Column field="price" body={(rowData) => (
    //       <span className="flex items-center gap-1">
    //         ₹ {rowData.price}
    //       </span>
    //     )} header="MRP" sortable>
    //     </Column>
    //     <Column body={actionBodyTemplate} header="Action"></Column>
    //   </DataTable>

    //   <DialogBox
    //     isOpen={isDialogOpen}
    //     onClose={() => setIsDialogOpen(false)}
    //     onConfirm={handleConfirmDelete}
    //     title="Delete Product"
    //     message="Are you sure you want to delete this item?"
    //   />
    // </div>
    <div
      className={`relative rounded-xl transition ${
        isDialogOpen ? "bg-gray-100" : "bg-white"
      }`}
    >
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block">
        <DataTable
          value={tableData ?? []}
          dataKey="product_id"
          tableStyle={{ minWidth: "60rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          emptyMessage="No product found"
        >
          <Column field="no" header="No." sortable />
          <Column body={imageBodyTemplate} header="Image" sortable />
          <Column field="product_name" header="Product Name" sortable />
          <Column field="category_name" header="Category" sortable />
          <Column
            field="price"
            header="MRP"
            body={(rowData) => (
              <span className="flex items-center gap-1">₹ {rowData.price}</span>
            )}
            sortable
          />
          <Column body={actionBodyTemplate} header="Action" />
        </DataTable>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-1 md:hidden">
        {(tableData ?? []).map((row: any) => (
          <div
            key={row.product_id}
            className="flex items-center gap-3 border-b transition-all duration-300 p-3"
          >
            {/* Left: Image */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={row.product_image}
                alt={row.product_name}
                className="h-full w-full object-cover"
              />

             
            </div>

            {/* Right: Details & Actions */}
            <div className="flex flex-col justify-between flex-1">
              {/* Product Info */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug" style={{marginTop:"-15px"}}>
                  {row.product_name}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  {row.category_name}
                </p>
                <p className="text-black-600 text-sm font-bold mt-1">
                  ₹ {row.price}
                </p>
              </div>

             {/* Action Icons */}
              <div className="flex gap-4 mt-2 mobile-view-btn">
                {/* View */}
                <i
                  className="pi pi-eye cursor-pointer text-blue-600 text-base hover:scale-110 transition"
                  onClick={() =>
                    window.open(
                      `https://shop.progressalliance.org/single-product/${row.product_id}`,
                      "_blank"
                    )
                  }
                ></i>
                {/* Edit */}
                <i
                  className="pi pi-pen-to-square cursor-pointer text-green-600 text-base hover:scale-110 transition"
                  onClick={() =>
                    navigate("/add-product", {
                      state: { productId: row.product_id },
                    })
                  }
                ></i>
                {/* Delete */}
                <i
                  className="pi pi-trash cursor-pointer text-red-600 text-base hover:scale-110 transition"
                  onClick={() => {
                    setSelectedProductId(row.product_id);
                    setIsDialogOpen(true);
                  }}
                ></i>
                {/* View */}
                <i
                  className="pi pi-eye cursor-pointer text-blue-600 text-base hover:scale-110 transition"
                  onClick={() =>
                    window.open(
                      `https://shop.progressalliance.org/single-product/${row.product_id}`,
                      "_blank"
                    )
                  }
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
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
