import ComponentCard from "../common/ComponentCard";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface MostViewInquiryProps {
  productInquiry: {
    product_name: string;
    total_inquiries: string;
  }[];
}

export default function MostViewInquiry({
  productInquiry,
}: MostViewInquiryProps) {
  const toast = useRef<Toast | null>(null);
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Most Product Inquiry">
          <div className="
  min-h-[250px] 
  sm:min-h-[300px] 
  md:min-h-[320px] 
  lg:min-h-[390px]
">
            <Toast ref={toast} />
            <DataTable
              value={productInquiry}
              scrollable
              responsiveLayout="scroll"
               emptyMessage="No product found"
            >
              <Column field="product_name" header="Product" />
              <Column field="total_inquiries" header="Inquiry" />
            </DataTable>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
