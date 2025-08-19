// import { useEffect, useState } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import Select from "../../components/form/Select";
// import FileInput from "../../components/form/input/FileInput";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import axios from "axios";

// export default function Product() {
//   // const [selectedValues, setSelectedValues] = useState<string[]>([]);

//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };

//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];

//   const [specifications, setSpecifications] = useState<string[]>([""]);
//   const [details, setDetails] = useState<string[]>([""]);

//   // Handle Specification Change
//   const handleSpecificationChange = (index: number, value: string) => {
//     const newSpecs = [...specifications];
//     newSpecs[index] = value;
//     setSpecifications(newSpecs);
//   };

//   // Handle Details Change
//   const handleDetailChange = (index: number, value: string) => {
//     const newDetails = [...details];
//     newDetails[index] = value;
//     setDetails(newDetails);
//   };

//   const getCategoryList = async () =>{
//       const res = await axios.post(`https://pa.2-min.in/supplier-category-list`, {
//   headers: {
//     "Authorization": `Bearer ${`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTUzMjc5NDksImV4cCI6NTM1NTMyNzk0OSwiZGF0YSI6eyJpZCI6IjEiLCJlbWFpbCI6InNob3Bub0BnbWFpbC5jb20iLCJmdWxsX25hbWUiOiJSYXZpIEMuIiwibnVtYmVyIjoiOTkwOTkyOTI5MyIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3NTUzMjc5NDksImV4cCI6MTc1NTQxNDM0OX19.SRObh60wuv4IB70dYpz8xJtazSBVKVYM2vrS1D59qVo`}`
//   }
//   });
//     console.log("ress",res);
//   }

//   useEffect(()=>{
//     getCategoryList()
//   },[])

//   return (
//     <ComponentCard title="Products Description">
//       <div className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <Label>Category</Label>
//             <Select
//               options={options}
//               placeholder="Select Option"
//               onChange={handleSelectChange}
//               className="dark:bg-dark-900"
//             />
//           </div>
//           <div>
//             <Label>Sub Category</Label>
//             <Select
//               options={options}
//               placeholder="Select Option"
//               onChange={handleSelectChange}
//               className="dark:bg-dark-900"
//             />
//           </div>
//           <div>
//             <Label htmlFor="weight">Product Name</Label>
//             <Input type="number" id="weight" placeholder="Product name" />
//           </div>
//           <div>
//             <Label htmlFor="length">Price</Label>
//             <Input type="number" id="length" placeholder="e.g. 120" />
//           </div>
//           <div>
//             <Label htmlFor="length">Cancle price</Label>
//             <Input type="number" id="length" placeholder="e.g. 120" />
//           </div>
//           <div>
//             <div>
//               {/* <Label>Upload file</Label>
//               <FileInput onChange={handleFileChange} className="custom-class" /> */}
//             </div>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Specifications
//             </label>
//             {specifications.map((spec, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={spec}
//                   onChange={(e) =>
//                     handleSpecificationChange(index, e.target.value)
//                   }
//                   className="flex-1 border rounded-lg px-3 py-2"
//                   placeholder={`Specification ${index + 1}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setSpecifications(
//                       specifications.filter((_, i) => i !== index)
//                     )
//                   }
//                   className="text-gray px-3 rounded-lg"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => setSpecifications([...specifications, ""])}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//             >
//               + Add Specification
//             </button>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Details
//             </label>
//             {details.map((detail, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={detail}
//                   onChange={(e) => handleDetailChange(index, e.target.value)}
//                   className="flex-1 border rounded-lg px-3 py-2"
//                   placeholder={`Detail ${index + 1}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setDetails(details.filter((_, i) => i !== index))
//                   }
//                   className="text-gray px-3 rounded-lg"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => setDetails([...details, ""])}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//             >
//               + Add Detail
//             </button>
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <textarea
//               id="description"
//               placeholder="Receipt Info (optional)"
//               className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm dark:border-dark-800 dark:bg-dark-900"
//               rows={13}
//             />
//           </div>
//           <div>
//             <DropzoneComponent />
//           </div>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }

import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function Product() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post(`${endPointApi.getProductList}`, {});
        if (res.data && res.data.data) {
          setProductsData(res.data.data as Product[]); // type cast
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
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Product Table" />
      <div className="space-y-6">
        <ComponentCard
          title="Basic Product Table"
          addProduct="Add product"
          onAddProductClick="/add-product"
        >
          <BasicTableOne productsData={productsData} />
        </ComponentCard>
      </div>
    </>
  );
}
