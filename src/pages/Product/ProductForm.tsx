import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import { Dropdown } from "primereact/dropdown";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";

export interface ProductData {
  name: string;
  price: number;
  cancel_price: number;
  specifications: string[]; // multiple specs
  details: string[]; // multiple details
  description: string;
  images: File[];
}

type ProductFormErrors = {
  category?: string;
  sub_category?: string;
  name?: string;
  price?: string;
  cancel_price?: string;
  specifications?: string;
  details?: string;
  image?: string;
};

export default function ProductForm() {
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState<[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);

  const [productForm, setProductForm] = useState<ProductData>({
    name: "",
    price: 0,
    cancel_price: 0,
    specifications: [""],
    details: [""],
    description: "",
    images: [],
  });
  console.log("images", productForm.images);
  
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // clear error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSpecificationChange = (index: number, value: string) => {
    const updated = [...productForm.specifications];
    updated[index] = value;
    setProductForm({ ...productForm, specifications: updated });
  };

  const handleDetailChange = (index: number, value: string) => {
    const updated = [...productForm.details];
    updated[index] = value;
    setProductForm({ ...productForm, details: updated });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.post(endPointApi.dropDownMainCategoryList, {});
        if (res.data && res.data.data) {
          setCategoryList(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory?.id !== "") {
        try {
          const formdata = new FormData();

          formdata.append("category_id", selectedCategory?.id || "");
          const res = await api.post(
            endPointApi.dropDownSubCategoryList,
            formdata
          );
          if (res.data && res.data.data) {
            setSubCategoryList(res.data.data);
          }
        } catch (err) {
          console.error("Error fetching categories", err);
        }
      }
    };

    fetchSubCategories();
  }, [selectedCategory?.id]);

  const categoryOptionTemplate = (option: any) => {
    return (
      <div className="flex items-center gap-2">
        <img
          src={option.image}
          alt={option.name}
          className="w-6 h-6 rounded-full"
        />
        <span>{option.name}</span>
      </div>
    );
  };

  // Selected value display
  const selectedCategoryTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex items-center gap-2">
          <img
            src={option.image}
            alt={option.name}
            className="w-6 h-6 rounded-full"
          />
          <span>{option.name}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const addProduct = async () => {
    try {
      let newErrors: ProductFormErrors = {};

      if (!selectedCategory) {
        newErrors.category = "Please select a category";
      }
      if (!selectedSubCategory) {
        newErrors.sub_category = "Please select a sub category";
      }
      if (!productForm.name.trim()) {
        newErrors.name = "Please enter a product name";
      }
      if (!productForm.price) {
        newErrors.price = "Please enter a product price";
      }
      if (!productForm.cancel_price) {
        newErrors.cancel_price = "Please enter a product cancel price";
      }

      if (
        productForm.specifications.length === 0 ||
        productForm.specifications.some((spec) => !spec.trim())
      ) {
        newErrors.specifications =
          "Please add at least one valid specification";
      }
      if (
        productForm.details.length === 0 ||
        productForm.details.some((spec) => !spec.trim())
      ) {
        newErrors.details = "Please add at least one valid details";
      }

      if (productForm.images.length == 0) {
        newErrors.image = "Please at list one image select";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const formdata = new FormData();

      formdata.append("category_id", selectedCategory?.id || "");
      formdata.append("sub_category_id", selectedSubCategory?.id || "");
      formdata.append("product_name", productForm.name);
      formdata.append("price", productForm.price.toString());
      formdata.append("cancle_price", productForm.cancel_price.toString());
      formdata.append("description", productForm.description);

      // Specifications array
      productForm.specifications.forEach((spec, i) => {
        formdata.append(`specification[${i}]`, spec);
      });

      // Details array
      productForm.details.forEach((det, i) => {
        formdata.append(`detail[${i}]`, det);
      });

      // Images array
      productForm.images.forEach((file, i) => {
        formdata.append(`image[${i}]`, file);
      });

      // Await API response
      const res = await api.post(`${endPointApi.postaddProduct}`, formdata);
      if (res.data.status == 200) {
        navigate("/product");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <ComponentCard title="Products Description">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Category</Label>
            <Dropdown
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.value);
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
              options={categoryList}
              optionLabel="name"
              placeholder="Select Category"
              filter
              valueTemplate={selectedCategoryTemplate}
              itemTemplate={categoryOptionTemplate}
              className={`w-full md:w-14rem ${
                errors.category ? "p-invalid" : ""
              }`}
            />

            {errors.category && (
              <small className="p-error">{errors.category}</small> // 👈 error text
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
              className={`w-full md:w-14rem ${
                errors.sub_category ? "p-invalid" : ""
              }`}
            />
            {errors.sub_category && (
              <small className="p-error">{errors.sub_category}</small> // 👈 error text
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="weight">Product Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Product name"
              value={productForm.name}
              onChange={handleChange}
              hint={errors.name}
              error={!!errors.name}
            />
          </div>
          {/* Price */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="length">Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={productForm.price}
                onChange={handleChange}
                hint={errors.price}
                error={!!errors.price}
              />
            </div>
            {/* Cancel Price */}
            <div>
              <Label htmlFor="length">Cancle price</Label>
              <Input
                type="number"
                name="cancel_price"
                placeholder="Cancel Price"
                value={productForm.cancel_price}
                onChange={handleChange}
                hint={errors.cancel_price}
                error={!!errors.cancel_price}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Specifications */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Specifications
            </label>
            {productForm.specifications.map((spec, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) => {
                    handleSpecificationChange(index, e.target.value);
                    setErrors((prev) => ({ ...prev, specifications: "" }));
                  }}
                  className={`flex-1 border rounded-lg px-3 py-2 ${
                    errors.specifications && !spec.trim()
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder={`Specification ${index + 1}`}
                />

                {/* Add (+) button for all rows */}
                <button
                  onClick={() =>
                    setProductForm({
                      ...productForm,
                      specifications: [...productForm.specifications, ""],
                    })
                  }
                  className="bg-[#465fff] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
                >
                  +
                </button>

                {/* Show delete (–) button only from 2nd input onward */}
                {index > 0 && (
                  <button
                    onClick={() =>
                      setProductForm({
                        ...productForm,
                        specifications: productForm.specifications.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                    className="bg-[#465fff] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
                  >
                    - 
                  </button>
                  
                )}
              </div>
            ))}

            {/* Error message below input list */}
            {errors.specifications && (
              <p className="text-error-500 text-sm">{errors.specifications}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Details
            </label>

            {productForm.details.map((detail, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => {
                    handleDetailChange(index, e.target.value);
                    setErrors((prev) => ({ ...prev, details: "" }));
                  }}
                  className={`flex-1 border rounded-lg px-3 py-2 ${
                    errors.details && !detail.trim() ? "border-red-500" : ""
                  }`}
                  placeholder={`Detail ${index + 1}`}
                />

                {/* Add (+) button for all rows */}
                <button
                  onClick={() =>
                    setProductForm({
                      ...productForm,
                      details: [...productForm.details, ""],
                    })
                  }
                  className="bg-[#465fff] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
                >
                  +
                </button>

                {/* Show delete (–) button only from 2nd input onward */}
                {index > 0 && (
                  <button
                    onClick={() =>
                      setProductForm({
                        ...productForm,
                        details: productForm.details.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                    className="bg-[#465fff] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
                  >
                    -
                  </button>
                )}
              </div>
            ))}

            {/* Error message */}
            {errors.details && (
              <p className="text-error-500 text-sm">{errors.details}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            {/* <Label htmlFor="description">Description</Label> */}
            <textarea
              placeholder="Description Info (optional)"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm dark:border-dark-800 dark:bg-dark-900"
              rows={13}
              name="description"
              value={productForm.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <DropzoneComponent
              setProductForm={setProductForm}
              productForm={productForm}
              error={errors.image}
              setErrors={setErrors}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={addProduct}
            className="bg-[#465fff] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
          >
            Add Product
          </button>

          <button
            onClick={() => navigate('/product')}
            className="border border-[#465fff] text-[#465fff] px-4 py-2 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </ComponentCard>
  );
}
