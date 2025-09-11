// interface ComponentCardProps {
//   title: string;
//   children: React.ReactNode;
//   className?: string; // Additional custom classes for styling
//   desc?: string; // Description text
//   addProduct?: string // Add product
// }

import { DataTable } from "primereact/datatable";
import React from "react";
import { useNavigate } from "react-router";

// const ComponentCard: React.FC<ComponentCardProps> = ({
//   title,
//   children,
//   className = "",
//   desc = "",
//   addProduct = "",

// }) => {
//   return (
//     <div
//       className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
//     >
//       {/* Card Header */}
//       <div className="px-6 py-5">
//         <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
//           {title}
//         </h3>
//         {desc && (
//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             {desc}
//           </p>
//         )}
//         {
//           addProduct && (
//             <button className="bg-[#465fff] text-white flex">
//               {addProduct}
//             </button>
//           )
//         }
//       </div>

//       {/* Card Body */}
//       <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
//         <div className="space-y-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default ComponentCard;













interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  addProduct?: React.ReactNode; // Add product
  onAddProductClick?: string; // new prop for click handler
  Plusicon?: React.ReactNode;
  dashboardTitle?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  Plusicon = null,
  addProduct = "",
  onAddProductClick = "",
  dashboardTitle = "",
}) => {
  const navigate = useNavigate()

  const elementContainsDataTable = (node: React.ReactNode): boolean => {
    const arr = React.Children.toArray(node);
    for (const item of arr) {
      if (!React.isValidElement(item)) continue;
      const type: any = item.type;

      if (type === DataTable) return true;
      const typeName = type?.displayName || type?.name;
      if (typeName === "DataTable") return true;
      if ((item as any).props?.children) {
        if (elementContainsDataTable((item as any).props.children)) return true;
      }
    }
    return false;
  };

  const hasDataTable = elementContainsDataTable(children);


  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
          <h3 className="font-semibold text-[18px]">
            {dashboardTitle}
          </h3>
        </div>

        {addProduct && (
          <button onClick={() => navigate(onAddProductClick)} className="bg-brand-950 text-white px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2">
            {Plusicon} {addProduct}
          </button>
        )}



      </div>


      {/* Card Body */}
      {/* <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-4">
        <div className="space-y-6">{children}</div>
      </div> */}
      <div
        className={
          hasDataTable
            ? "p-0 border border-gray-100 dark:border-gray-800 sm:p-0"
            : "p-0 border border-gray-100 dark:border-gray-800 sm:p-0"
        }
      >
        <div className="space-y-6">{children}</div>
      </div>

    </div>
  );
};

export default ComponentCard;
