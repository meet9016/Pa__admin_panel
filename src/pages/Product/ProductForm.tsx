import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import api from "../utils/axiosInstance";
import endPointApi from "../utils/endPointApi";
import { Dropdown } from "primereact/dropdown";
import { useLocation, useNavigate } from "react-router";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";
import MyCKEditor from "./MyCKEditor";

export interface ProductData {
    name: string;
    price: number;
    cancel_price: number;
    specifications: string[]; // multiple specs
    details: string[]; // multiple details
    specification_id: string[];
    description: string;
    shortDescription?: string;
    sku?: string;
    images: File[];
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

export default function ProductForm() {
    const navigate = useNavigate();

    const location = useLocation();
    const productId = location.state?.productId;

    const [categoryList, setCategoryList] = useState<[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<[]>([]);
    const [aiData, setAiData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    console.log(aiData, 'aiData')

    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);

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

    console.log(productForm.description, 'productForm.description')

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
    if (productId) {
        const fetchEditData = async () => {
            try {
                const formData = new FormData();
                formData.append("product_id", productId);

                const res = await api.post(endPointApi.productDetail, formData);

                if (res.data && res.data.data) {
                    const data = res.data.data;

                    setProductForm({
                        name: data.product_name || "",
                        price: data.price || "",
                        cancel_price: data.cancle_price || "",
                        specifications: data.product_details?.map(
                            (item: any) => item.specification
                        ) || [""],
                        details: data.product_details?.map(
                            (item: any) => item.detail
                        ) || [""],
                        specification_id: data.product_details?.map(
                            (item: any) => item.specification_id
                        ) || [""],
                        description: data.description || "",
                        shortDescription: data.long_description || "",
                        sku: data.sku || "",
                        images:
                            data.images?.map((img: string) => ({
                                preview: img,
                                file: null,
                            })) || [],
                    });
                    const categoryObj = categoryList.find(
                        (cat: any) => cat.name == data.category_name
                    );
                    setSelectedCategory(categoryObj || null);
                    const subCategoryObj = subCategoryList.find(
                        (subCat: any) => subCat.name == data.sub_category_name
                    );
                    setSelectedSubCategory(subCategoryObj || null);
                }
            } catch (err) {
                console.log("Error fetching edit data:", err);
            }
        };
        fetchEditData();
    }
}, [productId, categoryList, subCategoryList]);

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










const handleOnClick = async () => {
    if (!productForm.name.trim()) {
        setErrors((prev) => ({ ...prev, name: "Please enter product name" }));
        return;
    }

    setLoading(true)
    try {
        const formData = new FormData();
        formData.append("product_name", productForm.name);
        const res = await api.post(`${endPointApi.addProductAI}`, formData);

        if (res.data && res.data.data) {
            const ai = res.data.data;

            const aiSpecifications = ai.specifications?.map((item: any) => item.name) || [""];
            const aiDetails = ai.specifications?.map((item: any) => item.value) || [""];

            setProductForm((prev) => ({
                ...prev,
                name: ai.product_name || prev.name,
                price: ai.price || prev.price,
                cancel_price: ai.cancle_price || prev.cancel_price,
                description: ai.long_description || prev.shortDescription,
                shortDescription: ai.short_description || prev.shortDescription,
                sku: ai.sku || prev.sku,
                searchkey: ai.search_keywords || prev.searchkey,
                specifications: aiSpecifications.length ? aiSpecifications : prev.specifications,
                details: aiDetails.length ? aiDetails : prev.details,
            }));

            //  Category auto-select
            if (ai.category) {
                const categoryObj = categoryList.find(
                    (cat: any) => cat.id == ai.category
                );
                if (categoryObj) {
                    setSelectedCategory(categoryObj);
                }
            }

            //  SubCategory auto-select
            if (ai.sub_category_id) {
                const subCategoryObj = subCategoryList.find(
                    (subCat: any) => subCat.id == ai.sub_category_id
                );
                if (subCategoryObj) {
                    setSelectedSubCategory(subCategoryObj);
                }
            }

            setAiData(ai);
        }
    } catch (err) {
        console.log("Error Data", err);
    } finally {
        setLoading(false)
    }
};







const addProduct = async () => {
    try {
        const formData = new FormData();
        formData.append("product_id", productId);

        const res = await api.post(endPointApi.productDetail, formData);

        if (res.data && res.data.data) {
            const data = res.data.data;

            if (!productForm.shortDescription) {
                newErrors.shortDescription = "Please enter a short description";
            }
            if (!productForm.sku) {
                newErrors.sku = "Please enter a SKU";
            }
            if (!productForm.searchkey) {
                newErrors.searchkey = "Please enter a Search KeyWord";
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
            } else if (productForm.images.length > 5) {
                newErrors.image = "Please select maximum 5 images";
            } else {
                // 🔹 check size > 1MB
                const largeImages: string[] = [];
                productForm.images.forEach((file, idx) => {
                    if (file.size > 1024 * 1024) {
                        largeImages.push(`Image ${idx + 1} is larger than 1MB.`);
                    }
                });

                if (largeImages.length > 0) {
                    newErrors.image = largeImages.join(" | ");
                }
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            const formdata = new FormData();
            if (productId) {
                formdata.append("product_id", productId);
                productForm.specification_id.forEach((spec, i) => {
                    formdata.append(`specification_id[${i}]`, spec);
                });
            }
            formdata.append("category_id", selectedCategory?.id || "");
            formdata.append("sub_category_id", selectedSubCategory?.id || "");
            formdata.append("product_name", productForm.name);
            formdata.append("price", productForm.price.toString());
            formdata.append("cancle_price", productForm.cancel_price.toString());
            formdata.append("description", productForm.description);
            formdata.append("long_description", productForm.shortDescription);
            formdata.append("sku", productForm.sku);
            formdata.append("search_keywords", productForm.searchkey);

            // Specifications array
            productForm.specifications.forEach((spec, i) => {
                formdata.append(`specification[${i}]`, spec);
            });
            const categoryObj = categoryList.find(
                (cat: any) => cat.name == data.category_name
            );
            setSelectedCategory(categoryObj || null);
            const subCategoryObj = subCategoryList.find(
                (subCat: any) => subCat.name == data.sub_category_name
            );
            setSelectedSubCategory(subCategoryObj || null);
        }
    } catch (err) {
        console.log("Error fetching edit data:", err);
    }
};
fetchEditData();
    }
  }, [productId, categoryList, subCategoryList]);

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

        <ComponentCard title="Products Description">
            <div className="relative">
                <div className={`${loading ? "opacity-10  pointer-events-none" : ""} space-y-6`}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                            <Label htmlFor="weight">Product Name</Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Product name"
                                    value={productForm.name}
                                    onChange={handleChange}
                                    hint={errors.name}
                                    error={!!errors.name}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={handleOnClick}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 m-1
            bg-[#251c4b]
               text-white  font-medium 
               rounded-md shadow-md 
               transition-all duration-200"
                                >
                                    <span className="flex text-xl items-center gap-1">

                                        AI
                                    </span>
                                </button>

                            </div>
                        </div>
                        <div>
                            <Label htmlFor="weight">Search Keyword</Label>
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
                                className={`w-full md:w-14rem ${errors.category ? "p-invalid" : ""
                                    }`}
                            />

                            {errors.category && (
                                <small className="p-error">{errors.category}</small> //  error text
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
                                className={`w-full md:w-14rem ${errors.sub_category ? "p-invalid" : ""
                                    }`}
                            />
                            {errors.sub_category && (
                                <small className="p-error">{errors.sub_category}</small> //  error text
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="length">Price</Label>
                            <Input
                                type="text"
                                name="price"
                                placeholder="Price"
                                value={productForm.price}
                                onChange={handleChange}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                }}
                                hint={errors.price}
                                error={!!errors.price}
                            />
                        </div>
                        <div>
                            <Label htmlFor="length">Cancel price</Label>
                            <Input
                                type="text"
                                name="cancel_price"
                                placeholder="Cancel Price"
                                value={productForm.cancel_price}
                                onChange={handleChange}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                }}
                                hint={errors.cancel_price}
                                error={!!errors.cancel_price}
                            />
                        </div>
                    </div>



                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="weight">Short Description</Label>
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
                            <Label htmlFor="weight">SKU</Label>
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

                    <div className="col-span-2">
                        {/* Header row */}
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
                                    setProductForm({
                                        ...productForm,
                                        specifications: [...productForm.specifications, ""],
                                        details: [...productForm.details, ""],
                                    })
                                }
                                className="bg-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md 
                 transition-colors duration-200"
                            >
                                <i className="pi pi-plus text-xs"></i>
                            </button>
                        </div>

                        {/* Dynamic rows */}
                        <div className="space-y-3">
                            {productForm.specifications.map((spec, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                                >
                                    {/* Specification input */}
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

                                    {/* Detail input */}
                                    <div className="flex-1 w-full">
                                        <Input
                                            type="text"
                                            name={`detail_${index}`}
                                            value={productForm.details[index]}
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

                                    {/* Minus button */}
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setProductForm({
                                                    ...productForm,
                                                    specifications: productForm.specifications.filter(
                                                        (_, i) => i !== index
                                                    ),
                                                    details: productForm.details.filter(
                                                        (_, i) => i !== index
                                                    ),
                                                });
                                            }}
                                            className="border border-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md 
                       hover:bg-red-600 transition-colors duration-200 self-center sm:self-auto"
                                        >
                                            <i className="pi pi-minus text-xs text-brand-950"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            {/* <Label htmlFor="description">Description</Label> */}
                            {/* <textarea
                            placeholder="Description Info (optional)"
                            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm dark:border-dark-800 dark:bg-dark-900"
                            rows={13}
                            name="description"
                            value={productForm.description}
                            onChange={handleChange}
                        /> */}
                            <MyCKEditor value={productForm.description}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <DropzoneComponent
                                setProductForm={setProductForm}
                                productForm={productForm}
                                error={errors.image}
                                setErrors={setErrors}
                                productId={productId}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={addProduct}
                            className="bg-brand-950 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
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
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white/30 backdrop-blur-sm z-30">
                        <img
                            src="/src/Image/loader-unscreen (1).gif"
                            alt="Loading..."
                            className="w-50 h-40"
                        />
                    </div>
                )}

            </div>
        </ComponentCard>
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

        if (!productForm.shortDescription) {
            newErrors.shortDescription = "Please enter a short description";
        }
        if (!productForm.sku) {
            newErrors.sku = "Please enter a SKU";
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
        } else if (productForm.images.length > 5) {
            newErrors.image = "Please select maximum 5 images";
        } else {
            // 🔹 check size > 1MB
            const largeImages: string[] = [];
            productForm.images.forEach((file, idx) => {
                if (file.size > 1024 * 1024) {
                    largeImages.push(`Image ${idx + 1} is larger than 1MB.`);
                }
            });

            if (largeImages.length > 0) {
                newErrors.image = largeImages.join(" | ");
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formdata = new FormData();
        if (productId) {
            formdata.append("product_id", productId);
            productForm.specification_id.forEach((spec, i) => {
                formdata.append(`specification_id[${i}]`, spec);
            });
        }
        formdata.append("category_id", selectedCategory?.id || "");
        formdata.append("sub_category_id", selectedSubCategory?.id || "");
        formdata.append("product_name", productForm.name);
        formdata.append("price", productForm.price.toString());
        formdata.append("cancle_price", productForm.cancel_price.toString());
        formdata.append("description", productForm.description);
        formdata.append("long_description", productForm.shortDescription ?? "");
        formdata.append("sku", productForm.sku ?? "");

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
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    } catch (error: any) {
        toast.error("API Error:", error);
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
                        className={`w-full md:w-14rem ${errors.category ? "p-invalid" : ""
                            }`}
                    />

                    {errors.category && (
                        <small className="p-error">{errors.category}</small> //  error text
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
                        className={`w-full md:w-14rem ${errors.sub_category ? "p-invalid" : ""
                            }`}
                    />
                    {errors.sub_category && (
                        <small className="p-error">{errors.sub_category}</small> //  error text
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
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={productForm.price}
                            onChange={handleChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                            }}
                            hint={errors.price}
                            error={!!errors.price}
                        />
                    </div>
                    {/* Cancel Price */}
                    <div>
                        <Label htmlFor="length">Cancel price</Label>
                        <Input
                            type="text"
                            name="cancel_price"
                            placeholder="Cancel Price"
                            value={productForm.cancel_price}
                            onChange={handleChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                            }}
                            hint={errors.cancel_price}
                            error={!!errors.cancel_price}
                        />
                    </div>
                </div>
                {/* Short Description */}
                <div>
                    <Label htmlFor="weight">Short Description</Label>
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
                {/* SKU */}
                <div>
                    <Label htmlFor="weight">SKU</Label>
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

            <div className="col-span-2">
                {/* Header row */}
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
                            setProductForm({
                                ...productForm,
                                specifications: [...productForm.specifications, ""],
                                details: [...productForm.details, ""],
                            })
                        }
                        className="bg-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
                    >
                        <i className="pi pi-plus text-xs"></i>
                    </button>
                </div>

                {/* Dynamic rows */}
                <div className="space-y-3">
                    {productForm.specifications.map((spec, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                        >
                            {/* Specification input */}
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

                            {/* Detail input */}
                            <div className="flex-1 w-full">
                                <Input
                                    type="text"
                                    name={`detail_${index}`}
                                    value={productForm.details[index]}
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

                            {/* Minus button */}
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProductForm({
                                            ...productForm,
                                            specifications: productForm.specifications.filter(
                                                (_, i) => i !== index
                                            ),
                                            details: productForm.details.filter(
                                                (_, i) => i !== index
                                            ),
                                        });
                                    }}
                                    className="border border-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md 
                        transition-colors duration-200 self-center sm:self-auto"
                                >
                                    <i className="pi pi-minus text-xs text-brand-950"></i>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div>
                    {/* <Label htmlFor="description">Description</Label> */}
                    <textarea
                        placeholder="Description Info (optional)"
                        className="w-full rounded-lg border border-gray-300 px-4 py-4 text-sm dark:border-dark-800 dark:bg-dark-900"
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
                    className="bg-brand-950 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
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
    </ComponentCard>
);
}































//  <div className= "space-y-6">
//                 <div className="grid grid-cols-2 gap-6">
//                     <div className="relative">
//                         <Label htmlFor="weight">Product Name</Label>
//                         <div className="relative">
//                             <Input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Product name"
//                                 value={productForm.name}
//                                 onChange={handleChange}
//                                 hint={errors.name}
//                                 error={!!errors.name}
//                                 className="pr-10"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={handleOnClick}
//                                 className="absolute inset-y-0 right-0 flex items-center px-2 bg-white rounded-md text-sm"
//                             >
//                                 <img
//                                     src="/src/Image/icons8-chatgpt-64.png"
//                                     alt="AI"
//                                     className="w-8 h-8"
//                                 />
//                             </button>

//                         </div>
//                     </div>
//                     <div>
//                         <Label htmlFor="weight">Search Keyword</Label>
//                         <Input
//                             type="text"
//                             name="searchkey"
//                             placeholder="Search Keyword"
//                             value={productForm.searchkey}
//                             onChange={handleChange}
//                             hint={errors.searchkey}
//                             error={!!errors.searchkey}
//                         />
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-6">
//                     <div>
//                         <Label>Category</Label>
//                         <Dropdown
//                             value={selectedCategory}
//                             onChange={(e) => {
//                                 setSelectedCategory(e.value);
//                                 setErrors((prev) => ({ ...prev, category: "" }));
//                             }}
//                             options={categoryList}
//                             optionLabel="name"
//                             placeholder="Select Category"
//                             filter
//                             valueTemplate={selectedCategoryTemplate}
//                             itemTemplate={categoryOptionTemplate}
//                             className={`w-full md:w-14rem ${errors.category ? "p-invalid" : ""
//                                 }`}
//                         />

//                         {errors.category && (
//                             <small className="p-error">{errors.category}</small> //  error text
//                         )}
//                     </div>
//                     <div>
//                         <Label>Sub Category</Label>
//                         <Dropdown
//                             value={selectedSubCategory}
//                             onChange={(e) => {
//                                 setSelectedSubCategory(e.value);
//                                 setErrors((prev) => ({ ...prev, sub_category: "" }));
//                             }}
//                             options={subCategoryList}
//                             optionLabel="name"
//                             placeholder="Select Sub Category"
//                             filter
//                             valueTemplate={selectedCategoryTemplate}
//                             itemTemplate={categoryOptionTemplate}
//                             className={`w-full md:w-14rem ${errors.sub_category ? "p-invalid" : ""
//                                 }`}
//                         />
//                         {errors.sub_category && (
//                             <small className="p-error">{errors.sub_category}</small> //  error text
//                         )}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                     <div>
//                         <Label htmlFor="length">Price</Label>
//                         <Input
//                             type="text"
//                             name="price"
//                             placeholder="Price"
//                             value={productForm.price}
//                             onChange={handleChange}
//                             onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                 e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                             }}
//                             hint={errors.price}
//                             error={!!errors.price}
//                         />
//                     </div>
//                     <div>
//                         <Label htmlFor="length">Cancel price</Label>
//                         <Input
//                             type="text"
//                             name="cancel_price"
//                             placeholder="Cancel Price"
//                             value={productForm.cancel_price}
//                             onChange={handleChange}
//                             onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                 e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                             }}
//                             hint={errors.cancel_price}
//                             error={!!errors.cancel_price}
//                         />
//                     </div>
//                 </div>



//                 <div className="grid grid-cols-2 gap-6">
//                     <div>
//                         <Label htmlFor="weight">Short Description</Label>
//                         <Input
//                             type="text"
//                             name="shortDescription"
//                             placeholder="Short Description"
//                             value={productForm.shortDescription}
//                             onChange={handleChange}
//                             hint={errors.shortDescription}
//                             error={!!errors.shortDescription}
//                         />
//                     </div>
//                     <div>
//                         <Label htmlFor="weight">SKU</Label>
//                         <Input
//                             type="text"
//                             name="sku"
//                             placeholder="SKU"
//                             value={productForm.sku}
//                             onChange={handleChange}
//                             hint={errors.sku}
//                             error={!!errors.sku}
//                         />
//                     </div>
//                 </div>

//                 <div className="col-span-2">
//                     {/* Header row */}
//                     <div className="flex items-center justify-between mb-3">
//                         <Label
//                             htmlFor="specifications"
//                             className="block text-gray-700 font-semibold text-sm sm:text-base"
//                         >
//                             Specifications & Details
//                         </Label>
//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setProductForm({
//                                     ...productForm,
//                                     specifications: [...productForm.specifications, ""],
//                                     details: [...productForm.details, ""],
//                                 })
//                             }
//                             className="bg-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md
//                  transition-colors duration-200"
//                         >
//                             <i className="pi pi-plus text-xs"></i>
//                         </button>
//                     </div>

//                     {/* Dynamic rows */}
//                     <div className="space-y-3">
//                         {productForm.specifications.map((spec, index) => (
//                             <div
//                                 key={index}
//                                 className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
//                             >
//                                 {/* Specification input */}
//                                 <div className="flex-1 w-full">
//                                     <Input
//                                         type="text"
//                                         name={`specification_${index}`}
//                                         value={spec}
//                                         onChange={(e) => {
//                                             handleSpecificationChange(index, e.target.value);
//                                             setErrors((prev) => ({ ...prev, specifications: "" }));
//                                         }}
//                                         placeholder={`Specification ${index + 1}`}
//                                         error={!!errors.specifications && !spec.trim()}
//                                     />
//                                     {errors.specifications && !spec.trim() && (
//                                         <p className="text-error-500 text-xs mt-1">
//                                             {errors.specifications}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Detail input */}
//                                 <div className="flex-1 w-full">
//                                     <Input
//                                         type="text"
//                                         name={`detail_${index}`}
//                                         value={productForm.details[index]}
//                                         onChange={(e) => {
//                                             handleDetailChange(index, e.target.value);
//                                             setErrors((prev) => ({ ...prev, details: "" }));
//                                         }}
//                                         placeholder={`Detail ${index + 1}`}
//                                         error={
//                                             !!errors.details && !productForm.details[index]?.trim()
//                                         }
//                                     />
//                                     {errors.details && !productForm.details[index]?.trim() && (
//                                         <p className="text-error-500 text-xs mt-1">
//                                             {errors.details}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Minus button */}
//                                 {index > 0 && (
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             setProductForm({
//                                                 ...productForm,
//                                                 specifications: productForm.specifications.filter(
//                                                     (_, i) => i !== index
//                                                 ),
//                                                 details: productForm.details.filter(
//                                                     (_, i) => i !== index
//                                                 ),
//                                             });
//                                         }}
//                                         className="border border-brand-950 text-white w-8 h-8 flex items-center justify-center rounded-md
//                        hover:bg-red-600 transition-colors duration-200 self-center sm:self-auto"
//                                     >
//                                         <i className="pi pi-minus text-xs text-brand-950"></i>
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                     <div>
//                         {/* <Label htmlFor="description">Description</Label> */}
//                         {/* <textarea
//                             placeholder="Description Info (optional)"
//                             className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm dark:border-dark-800 dark:bg-dark-900"
//                             rows={13}
//                             name="description"
//                             value={productForm.description}
//                             onChange={handleChange}
//                         /> */}
//                         <MyCKEditor value={productForm.description}
//                             onChange={handleChange} />
//                     </div>
//                     <div>
//                         <DropzoneComponent
//                             setProductForm={setProductForm}
//                             productForm={productForm}
//                             error={errors.image}
//                             setErrors={setErrors}
//                             productId={productId}
//                         />
//                     </div>
//                 </div>

//                 <div className="flex gap-4">
//                     <button
//                         onClick={addProduct}
//                         className="bg-brand-950 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#364de0] transition"
//                     >
//                         {productId ? "Update Product" : "Add Product"}
//                     </button>

//                     <button
//                         onClick={() => navigate("/product")}
//                         className="border border-brand-950 text-brand-950 px-4 py-2 rounded-md text-sm font-medium"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>