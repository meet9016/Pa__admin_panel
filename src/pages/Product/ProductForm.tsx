import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";

import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import MyCKEditor from "./MyCKEditor";

import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";

// ---------- Types ----------
type ID = string | number;

interface CategoryOption {
  id: ID;
  name: string;
  image?: string;
}

interface ApiProductDetail {
  product_name?: string;
  price?: string | number;
  cancle_price?: string | number;
  description?: string;
  long_description?: string;
  sku?: string;
  images?: string[];
  category_name?: string;
  sub_category_name?: string;
  search_keywords?: string;
  product_details?: {
    specification: string;
    detail: string;
    specification_id?: string | number;
  }[];
}

interface AiResp {
  product_name?: string;
  price?: string;
  cancle_price?: string;
  long_description?: string;
  short_description?: string;
  sku?: string;
  search_keywords?: string;
  specifications?: { name: string; value: string }[];
  category?: ID;
  sub_category_id?: ID;
}

type FormImage =
  | (File & { preview?: string })
  | (File & { preview: string })
  | (Blob & { name?: string; preview: string });

export interface ProductData {
  name: string;
  price: string; // keep as string for inputs; convert when sending
  cancel_price: string; // (same)
  specifications: string[]; // multiple specs
  details: string[]; // multiple details
  specification_id: (string | number)[];
  description: string;
  shortDescription: string;
  sku: string;
  images: FormImage[];
  searchkey: string;
}

type ProductFormErrors = {
  category?: string;
  sub_category?: string;
  name?: string;
  price?: string;
  cancel_price?: string;
  specifications?: string;
  details?: string;
  shortDescription?: string;
  sku?: string;
  image?: string;
  searchkey?: string;
};

// ---------- Component ----------
export default function ProductForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const productId: ID | undefined = location.state?.productId;

  const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<CategoryOption | null>(null);

  // const [aiData, setAiData] = useState<AiResp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [productForm, setProductForm] = useState<ProductData>({
    name: "",
    price: "",
    cancel_price: "",
    specifications: [""],
    details: [""],
    specification_id: [""],
    description: "",
    shortDescription: "",
    sku: "",
    images: [],
    searchkey: "",
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});

  // ---- Helpers ----
  const categoryOptionTemplate = (option: CategoryOption) => {
    if (!option) return null;
    return (
      <div className="flex items-center gap-2">
        {option.image ? (
          <img
            src={option.image}
            alt={option.name}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <span className="w-6 h-6 rounded-full bg-gray-200 inline-block" />
        )}
        <span>{option.name}</span>
      </div>
    );
  };

  const selectedCategoryTemplate = (
    option: CategoryOption | null,
    props: any
  ) => {
    if (option) {
      return (
        <div className="flex items-center gap-2">
          {option.image ? (
            <img
              src={option.image}
              alt={option.name}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <span className="w-6 h-6 rounded-full bg-gray-200 inline-block" />
          )}
          <span>{option.name}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const numericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  // ---- Field Handlers ----
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSpecificationChange = (index: number, value: string) => {
    const updated = [...productForm.specifications];
    updated[index] = value;
    setProductForm((prev) => ({ ...prev, specifications: updated }));
  };

  const handleDetailChange = (index: number, value: string) => {
    const updated = [...productForm.details];
    updated[index] = value;
    setProductForm((prev) => ({ ...prev, details: updated }));
  };

  const handleEditorChange = (htmlValue: string) => {
    setProductForm((prev) => ({ ...prev, description: htmlValue }));
    setErrors((prev) => ({ ...prev, description: "" }));
  };

  // ---- Fetch Categories ----
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.post(endPointApi.dropDownMainCategoryList, {});
        if (res?.data?.data) {
          setCategoryList(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  // ---- Fetch SubCategories whenever Category changes ----
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategory?.id && selectedCategory?.id !== 0) return;
      try {
        const formdata = new FormData();
        formdata.append("category_id", String(selectedCategory.id));
        const res = await api.post(
          endPointApi.dropDownSubCategoryList,
          formdata
        );
        if (res?.data?.data) {
          setSubCategoryList(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching subcategories", err);
      }
    };
    fetchSubCategories();
  }, [selectedCategory?.id]);

  // ---- Pre-fill form in Edit mode ----
  useEffect(() => {
    const fetchEditData = async () => {
      if (!productId) return;
      try {
        const formData = new FormData();
        formData.append("product_id", String(productId));
        const res = await api.post(endPointApi.productDetail, formData);

        const data: ApiProductDetail | undefined = res?.data?.data;
        if (!data) return;

        setProductForm((prev) => ({
          ...prev,
          name: data.product_name || "",
          price: data.price ? String(data.price) : "",
          cancel_price: data.cancle_price ? String(data.cancle_price) : "",
          specifications: data.product_details?.map((d) => d.specification) || [
            "",
          ],
          details: data.product_details?.map((d) => d.detail) || [""],
          specification_id: data.product_details?.map(
            (d) => d.specification_id ?? ""
          ) || [""],
          searchkey: data.search_keywords || "",
          description: data.long_description || "",
          shortDescription: data.description || "",
          sku: data.sku || "",
          images:
            data.images?.map((img) =>
              Object.assign(new Blob([]), { preview: img })
            ) || [],
        }));

        // Preselect category/subcategory by name match
        const categoryObj =
          categoryList.find((cat) => cat.name === data.category_name) || null;
        setSelectedCategory(categoryObj);

        const subCategoryObj =
          subCategoryList.find((s) => s.name === data.sub_category_name) ||
          null;
        setSelectedSubCategory(subCategoryObj);
      } catch (err) {
        console.log("Error fetching edit data:", err);
      }
    };
    // run when lists are ready (for name match)
    fetchEditData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, categoryList, subCategoryList]);

  // ---- AI Autofill ----
  const handleOnClickAI = async () => {
    if (!productForm.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Please enter product name" }));
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("product_name", productForm.name);
      const res = await api.post(`${endPointApi.addProductAI}`, fd);

      const ai: AiResp | undefined = res?.data?.data;
      if (ai) {
        const aiSpecifications = ai.specifications?.map((s) => s.name) || [];
        const aiDetails = ai.specifications?.map((s) => s.value) || [];

        setProductForm((prev) => ({
          ...prev,
          name: ai.product_name || prev.name,
          price: ai.price ?? prev.price,
          cancel_price: ai.cancle_price ?? prev.cancel_price,
          description: ai.long_description ?? prev.description,
          shortDescription: ai.short_description ?? prev.shortDescription,
          sku: ai.sku ?? prev.sku,
          searchkey: ai.search_keywords ?? prev.searchkey,
          specifications: aiSpecifications.length
            ? aiSpecifications
            : prev.specifications,
          details: aiDetails.length ? aiDetails : prev.details,
        }));

        // auto-select category if id matches
        if (ai.category) {
          const match = categoryList.find(
            (c) => String(c.id) === String(ai.category)
          );
          if (match) setSelectedCategory(match);
        }
        if (ai.sub_category_id) {
          const match = subCategoryList.find(
            (s) => String(s.id) === String(ai.sub_category_id)
          );
          if (match) setSelectedSubCategory(match);
        }

        // setAiData(ai);
      }
    } catch (err) {
      console.log("Error (AI):", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- Submit ----
  const addOrUpdateProduct = async () => {
    try {
      const newErrors: ProductFormErrors = {};

      if (!selectedCategory) newErrors.category = "Please select a category";
      if (!selectedSubCategory)
        newErrors.sub_category = "Please select a sub category";
      if (!productForm.name.trim())
        newErrors.name = "Please enter a product name";
      if (!productForm.price) newErrors.price = "Please enter a product price";
      if (!productForm.cancel_price)
        newErrors.cancel_price = "Please enter a product cancel price";
      if (!productForm.shortDescription)
        newErrors.shortDescription = "Please enter a short description";
      if (!productForm.sku) newErrors.sku = "Please enter a SKU";
      if (!productForm.searchkey)
        newErrors.searchkey = "Please enter a Search Keyword";

      if (
        productForm.specifications.length === 0 ||
        productForm.specifications.some((s) => !s.trim())
      ) {
        newErrors.specifications =
          "Please add at least one valid specification";
      }
      if (
        productForm.details.length === 0 ||
        productForm.details.some((d) => !d.trim())
      ) {
        newErrors.details = "Please add at least one valid details";
      }

      if (productForm.images.length === 0) {
        newErrors.image = "Please select at least one image";
      } else if (productForm.images.length > 5) {
        newErrors.image = "Please select maximum 5 images";
      } else {
        // size check > 1MB
        const large: string[] = [];
        productForm.images.forEach((f, idx) => {
          const size = (f as File).size ?? 0;
          if (size > 5 * 1024 * 1024) {
            large.push(`Image ${idx + 1} is larger than 5MB.`);
          }
        });
        if (large.length) newErrors.image = large.join(" | ");
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const fd = new FormData();

      if (productId) {
        fd.append("product_id", String(productId));
        productForm.specification_id.forEach((id, i) => {
          fd.append(`specification_id[${i}]`, String(id ?? ""));
        });
      }

      fd.append("category_id", String(selectedCategory?.id ?? ""));
      fd.append("sub_category_id", String(selectedSubCategory?.id ?? ""));
      fd.append("product_name", productForm.name);
      fd.append("price", productForm.price);
      fd.append("cancle_price", productForm.cancel_price);
      fd.append("description", productForm.shortDescription);
      fd.append("long_description", productForm.description ?? "");
      fd.append("sku", productForm.sku ?? "");
      fd.append("search_keywords", productForm.searchkey ?? "");

      productForm.specifications.forEach((spec, i) => {
        fd.append(`specification[${i}]`, spec);
      });
      productForm.details.forEach((det, i) => {
        fd.append(`detail[${i}]`, det);
      });

      productForm.images.forEach((file, i) => {
        // if it's an existing image preview string from server, skip uploading
        const hasFile =
          (file as File).size !== undefined && (file as File).size > 0;
        if (hasFile) {
          fd.append(`image[${i}]`, file as File);
        }
      });

      const res = await api.post(`${endPointApi.postaddProduct}`, fd);
      if (res?.data?.status === 200) {
        toast.success(res.data.message || "Saved");
        navigate("/product");
      } else {
        toast.error(res?.data?.message || "Failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("API Error");
    }
  };

  // disable interactions when loading AI
  const mainWrapperClass = useMemo(
    () => (loading ? "opacity-10 pointer-events-none" : ""),
    [loading]
  );

  return (
    <ComponentCard title={productId ? "Update Product" : ""}>
      <div className="relative p-2 md:p-6">
        {/* overlay loader */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center  backdrop-blur-sm z-20">
            {/* <img
              src="https://superadmin.progressalliance.org/upload/web_logo/Aigif.gif"
              alt="Loading..."
              className="w-50 h-40 border border-gray-300 rounded-md"
            /> */}
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className={`${mainWrapperClass} space-y-6`}>
          {/* Top row: Product + AI + Search Key */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Label htmlFor="name">Product Name</Label>

              {/* Input + Button container */}
              <div className="relative">
                {" "}
                {/* 👈 Fixed height */}
                <Input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  value={productForm.name}
                  onChange={handleChange}
                  // hint={errors.name}
                  error={!!errors.name}
                  className="pr-20" // 👈 right padding for button + fixed height
                />
                <button
                  type="button"
                  onClick={handleOnClickAI}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center px-3 h-8 bg-[#251c4b] text-white text-sm font-medium rounded-md shadow-md transition-all duration-200"
                  title="Auto-fill with AI"
                >
                  ChatGpt
                </button>
              </div>

              {/* Error message shown BELOW input, not affecting layout */}
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a product name
                </p>
              )}
            </div>

            <div className="grid grid-cols-1">
              <Label htmlFor="searchkey">Search Keyword</Label>
              <Input
                type="text"
                name="searchkey"
                placeholder="Search Keyword"
                value={productForm.searchkey}
                onChange={handleChange}
                hint={errors.searchkey}
                error={!!errors.searchkey}
              />
            </div>
          </div>

          {/* Category / Sub Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Category</Label>
              <Dropdown
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.value);
                  setSelectedSubCategory(null); // reset subcat on cat change
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
                options={categoryList}
                optionLabel="name"
                placeholder="Select Category"
                filter
                valueTemplate={selectedCategoryTemplate}
                itemTemplate={categoryOptionTemplate}
                className={`w-full md:w-14rem custom-dropdown focus:outline-hidden ${
                  errors.category ? "p-invalid" : ""
                }`}
              />
              {errors.category && (
                <small className="p-error">{errors.category}</small>
              )}
            </div>

            <div>
              <Label>Sub Category</Label>
              <Dropdown
                value={selectedSubCategory}
                onChange={(e) => {
                  setSelectedSubCategory(e.value);
                  setErrors((prev) => ({ ...prev, sub_category: "" }));
                }}
                options={subCategoryList}
                optionLabel="name"
                placeholder="Select Sub Category"
                filter
                valueTemplate={selectedCategoryTemplate}
                itemTemplate={categoryOptionTemplate}
                className={`w-full md:w-14rem custom-dropdown ${
                  errors.category ? "p-invalid" : ""
                }`}
              />
              {errors.sub_category && (
                <small className="p-error">{errors.sub_category}</small>
              )}
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price">MRP</Label>
              <Input
                type="text"
                name="price"
                placeholder="Price"
                value={productForm.price}
                onChange={handleChange}
                onInput={numericInput}
                hint={errors.price}
                error={!!errors.price}
              />
            </div>
            <div>
              <Label htmlFor="cancel_price">Discounted price</Label>
              <Input
                type="text"
                name="cancel_price"
                placeholder="Cancel Price"
                value={productForm.cancel_price}
                onChange={handleChange}
                onInput={numericInput}
                hint={errors.cancel_price}
                error={!!errors.cancel_price}
              />
            </div>
          </div>

          {/* ShortDesc / SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                type="text"
                name="shortDescription"
                placeholder="Short Description"
                value={productForm.shortDescription}
                onChange={handleChange}
                hint={errors.shortDescription}
                error={!!errors.shortDescription}
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                type="text"
                name="sku"
                placeholder="SKU"
                value={productForm.sku}
                onChange={handleChange}
                hint={errors.sku}
                error={!!errors.sku}
              />
            </div>
          </div>

          {/* Specifications & Details */}
          {/* <div className="col-span-2">
            <div className="flex items-center justify-between mb-3">
              <Label
                htmlFor="specifications"
                className="block text-gray-700 font-semibold text-sm sm:text-base"
              >
                Specifications & Details
              </Label>
              <button
                type="button"
                onClick={() =>
                  setProductForm((prev) => ({
                    ...prev,
                    specifications: [...prev.specifications, ""],
                    details: [...prev.details, ""],
                  }))
                }
                className="bg-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
              >
                <i className="pi pi-plus text-xs"></i>
              </button>
            </div>

            <div className="space-y-3">
              {productForm.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                >
                  <div className="flex-1 w-full">
                    <Input
                      type="text"
                      name={`specification_${index}`}
                      value={spec}
                      onChange={(e) => {
                        handleSpecificationChange(index, e.target.value);
                        setErrors((prev) => ({ ...prev, specifications: "" }));
                      }}
                      placeholder={`Specification ${index + 1}`}
                      error={!!errors.specifications && !spec.trim()}
                    />
                    {errors.specifications && !spec.trim() && (
                      <p className="text-error-500 text-xs mt-1">
                        {errors.specifications}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <Input
                      type="text"
                      name={`detail_${index}`}
                      value={productForm.details[index] ?? ""}
                      onChange={(e) => {
                        handleDetailChange(index, e.target.value);
                        setErrors((prev) => ({ ...prev, details: "" }));
                      }}
                      placeholder={`Detail ${index + 1}`}
                      error={
                        !!errors.details && !productForm.details[index]?.trim()
                      }
                    />
                    {errors.details && !productForm.details[index]?.trim() && (
                      <p className="text-error-500 text-xs mt-1">
                        {errors.details}
                      </p>
                    )}
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setProductForm((prev) => ({
                          ...prev,
                          specifications: prev.specifications.filter(
                            (_, i) => i !== index
                          ),
                          details: prev.details.filter((_, i) => i !== index),
                        }));
                      }}
                      className="border border-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200 self-center sm:self-auto"
                      title="Remove row"
                    >
                      <i className="pi pi-minus text-xs text-brand-950"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div> */}

          <div className="col-span-2">
            <div className="flex items-center justify-between mb-3">
              <Label
                htmlFor="specifications"
                className="block text-gray-700 font-semibold text-sm sm:text-base"
              >
                Specifications & Details
              </Label>
              <button
                type="button"
                onClick={() =>
                  setProductForm((prev) => ({
                    ...prev,
                    specifications: [...prev.specifications, ""],
                    details: [...prev.details, ""],
                  }))
                }
                className="bg-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
              >
                <i className="pi pi-plus text-xs"></i>
              </button>
            </div>

            <div className="space-y-3">
              {productForm.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 items-center"
                >
                  {/* Specification */}
                  <div className="col-span-6">
                    <Input
                      type="text"
                      name={`specification_${index}`}
                      value={spec}
                      onChange={(e) => {
                        handleSpecificationChange(index, e.target.value);
                        setErrors((prev) => ({ ...prev, specifications: "" }));
                      }}
                      placeholder={`Specification ${index + 1}`}
                      error={!!errors.specifications && !spec.trim()}
                    />
                    {errors.specifications && !spec.trim() && (
                      <p className="text-error-500 text-xs mt-1">
                        {errors.specifications}
                      </p>
                    )}
                  </div>

                  {/* Detail + Minus Button */}
                  <div className="col-span-6 flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        name={`detail_${index}`}
                        value={productForm.details[index] ?? ""}
                        onChange={(e) => {
                          handleDetailChange(index, e.target.value);
                          setErrors((prev) => ({ ...prev, details: "" }));
                        }}
                        placeholder={`Detail ${index + 1}`}
                        error={
                          !!errors.details &&
                          !productForm.details[index]?.trim()
                        }
                      />
                      {errors.details &&
                        !productForm.details[index]?.trim() && (
                          <p className="text-error-500 text-xs mt-1">
                            {errors.details}
                          </p>
                        )}
                    </div>

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setProductForm((prev) => ({
                            ...prev,
                            specifications: prev.specifications.filter(
                              (_, i) => i !== index
                            ),
                            details: prev.details.filter((_, i) => i !== index),
                          }));
                        }}
                        className="border border-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
                        title="Remove row"
                      >
                        <i className="pi pi-minus text-xs text-brand-950"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description + Images */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <MyCKEditor
                value={productForm.description}
                onChange={handleEditorChange}
              />
            </div>
            <div>
              <DropzoneComponent
                setProductForm={setProductForm}
                productForm={productForm}
                error={errors.image}
                setErrors={setErrors}
                // productId={productId as any}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={addOrUpdateProduct}
              className="bg-brand-950 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              {productId ? "Update Product" : "Add Product"}
            </button>

            <button
              onClick={() => navigate("/product")}
              className="border border-brand-950 text-brand-950 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
