import { useDropzone } from "react-dropzone";
import { ProductData } from "../../../pages/Product/ProductForm";
import endPointApi from "../../../pages/utils/endPointApi";
import api from "../../../pages/utils/axiosInstance";

export interface DropzoneProps {
  productForm: ProductData;
  setProductForm: React.Dispatch<React.SetStateAction<ProductData>>;
  error: string | undefined;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      image?: string;
    }>
  >;
}
const DropzoneComponent: React.FC<DropzoneProps> = ({
  productForm = {} as ProductData,
  setProductForm = () => {},
  error = "",
  setErrors = () => {},
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple: true,
  });

  const removeImage = async (idOrIndex: any) => {
    try {
      if (typeof idOrIndex === "string" || typeof idOrIndex === "number") {
        const formdata = new FormData();
        formdata.append("product_image_id", idOrIndex as string);
        await api.post(`${endPointApi.productImageDelete}`, formdata);
      }

      // UI state update (local remove)
      setProductForm((prev: any) => ({
        ...prev,
        images: prev.images.filter(
          (item: any, i: any) =>
            item?.preview?.product_image_id !== idOrIndex && i !== idOrIndex
        ),
      }));
    } catch (error) {
      console.error("Image remove failed:", error);
    }
  };

  return (
    <>
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-lg hover:border-brand-500">
        <form
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
          ${
            isDragActive
              ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
              : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          }`}
          id="demo-upload"
        >
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center m-0!">
            {/* Icon */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                ⬆
              </div>
            </div>

            {/* Text */}
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
            </h4>
            <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              Drag and drop your PNG, JPG, WebP, SVG images here or browse
            </span>
            <span className="font-medium underline text-theme-sm text-brand-500">
              Browse File
            </span>
          </div>
        </form>
      </div>
      {error && <p className="text-error-500 text-sm">{error}</p>}
      {/* Image Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
        {productForm?.images?.map((item, index) => (
          <div
            key={(item as any)?.preview?.product_image_id}
            className="relative w-full h-32 border rounded-xl overflow-hidden shadow group"
          >
            <img
              src={
                (item as any).preview?.image
                  ? (item as any).preview.image
                  : URL.createObjectURL(item)
              }
              alt={`preview-${index}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() =>
                 removeImage((item as any)?.preview?.product_image_id ?? index)
              }
              className="absolute top-1 right-1 bg-red-600 text-white p-[2px] rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition w-5 h-5 flex items-center justify-center"
            >
              <i className="pi pi-times text-xs"></i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DropzoneComponent;
