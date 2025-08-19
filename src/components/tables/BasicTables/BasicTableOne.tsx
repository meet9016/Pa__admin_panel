// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";

// import Badge from "../../ui/badge/Badge";

// interface Order {
//   id: number;
//   user: {
//     image: string;
//     name: string;
//     role: string;
//   };
//   projectName: string;
//   team: {
//     images: string[];
//   };
//   status: string;
//   budget: string;
// }

// // Define the table data using the interface
// const tableData: Order[] = [
//   {
//     id: 1,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Lindsey Curtis",
//       role: "Web Designer",
//     },
//     projectName: "Agency Website",
//     team: {
//       images: [
//         "/images/user/user-22.jpg",
//         "/images/user/user-23.jpg",
//         "/images/user/user-24.jpg",
//       ],
//     },
//     budget: "3.9K",
//     status: "Active",
//   },
//   {
//     id: 2,
//     user: {
//       image: "/images/user/user-18.jpg",
//       name: "Kaiya George",
//       role: "Project Manager",
//     },
//     projectName: "Technology",
//     team: {
//       images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
//     },
//     budget: "24.9K",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Zain Geidt",
//       role: "Content Writing",
//     },
//     projectName: "Blog Writing",
//     team: {
//       images: ["/images/user/user-27.jpg"],
//     },
//     budget: "12.7K",
//     status: "Active",
//   },
//   {
//     id: 4,
//     user: {
//       image: "/images/user/user-20.jpg",
//       name: "Abram Schleifer",
//       role: "Digital Marketer",
//     },
//     projectName: "Social Media",
//     team: {
//       images: [
//         "/images/user/user-28.jpg",
//         "/images/user/user-29.jpg",
//         "/images/user/user-30.jpg",
//       ],
//     },
//     budget: "2.8K",
//     status: "Cancel",
//   },
//   {
//     id: 5,
//     user: {
//       image: "/images/user/user-21.jpg",
//       name: "Carla George",
//       role: "Front-end Developer",
//     },
//     projectName: "Website",
//     team: {
//       images: [
//         "/images/user/user-31.jpg",
//         "/images/user/user-32.jpg",
//         "/images/user/user-33.jpg",
//       ],
//     },
//     budget: "4.5K",
//     status: "Active",
//   },
// ];

// export default function BasicTableOne() {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <Table>
//           {/* Table Header */}
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 User
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Project Name
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Team
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Status
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Budget
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           {/* Table Body */}
//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {tableData.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell className="px-5 py-4 sm:px-6 text-start">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 overflow-hidden rounded-full">
//                       <img
//                         width={40}
//                         height={40}
//                         src={order.user.image}
//                         alt={order.user.name}
//                       />
//                     </div>
//                     <div>
//                       <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
//                         {order.user.name}
//                       </span>
//                       <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                         {order.user.role}
//                       </span>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {order.projectName}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   <div className="flex -space-x-2">
//                     {order.team.images.map((teamImage, index) => (
//                       <div
//                         key={index}
//                         className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
//                       >
//                         <img
//                           width={24}
//                           height={24}
//                           src={teamImage}
//                           alt={`Team member ${index + 1}`}
//                           className="w-full size-6"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   <Badge
//                     size="sm"
//                     color={
//                       order.status === "Active"
//                         ? "success"
//                         : order.status === "Pending"
//                         ? "warning"
//                         : "error"
//                     }
//                   >
//                     {order.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                   {order.budget}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

























import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import axios from 'axios';

export default function BasicTableOne() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);

  console.log(products, 'product')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTU0OTYzMjMsImV4cCI6NTM1NTQ5NjMyMywiZGF0YSI6eyJpZCI6IjEiLCJlbWFpbCI6InNob3Bub0BnbWFpbC5jb20iLCJmdWxsX25hbWUiOiJSYXZpIEMuIiwibnVtYmVyIjoiOTkwOTkyOTI5MyIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3NTU0OTYzMjMsImV4cCI6MTc1NTU4MjcyM319.E4Z4qjGWOrIA-E-RcTYQTAXbjOvIawRQPqYVScvSzXA";

        const res = await axios.post(
          "https://pa.2-min.in/supplier-product-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        )
        console.log("resss", res);

        if (res.data && res.data.data) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log("API Error", error)
      }
    }
    fetchData();
  }, [])



  const imageBodyTemplate = (rowData) => {
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
        value={products}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: '60rem' }}
        paginator rows={5}
        rowsPerPageOptions={[4, 8, 12]}
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
