export const ProductService = {
    getProductsData() {
        return [
            {
                id: 1,
                code: "P001",
                product_name: "T-Shirt",
                price: 499,
                cancle_price: 799,
                category_name: "Clothing",
                sub_category_name: "Kids Wear",
                product_image: "https://pa.2-min.in/upload/product_images/385307026.jpg",
            },
            {
                id: 2,
                code: "P002",
                product_name: "Dress",
                price: 999,
                cancle_price: 1499,
                category_name: "Clothing",
                sub_category_name: "Women Wear",
                product_image: "https://pa.2-min.in/upload/product_images/385307026.jpg",
            },
            {
                id: 3,
                code: "P003",
                product_name: "Kids Shoes",
                price: 799,
                cancle_price: 1299,
                category_name: "Footwear",
                sub_category_name: "Kids Shoes",
                product_image: "https://pa.2-min.in/upload/product_images/385307026.jpg",
            },
            {
                id: 4,
                code: "P004",
                product_name: "Handbag",
                price: 1599,
                cancle_price: 2299,
                category_name: "Accessories",
                sub_category_name: "Handbags",
                product_image: "https://pa.2-min.in/upload/product_images/385307026.jpg",
            },
              {
                id: 5,
                code: "P005",
                product_name: "jeans",
                price: 6000,
                cancle_price: 2299,
                category_name: "Accessories",
                sub_category_name: "Jeans",
                product_image: "https://pa.2-min.in/upload/product_images/385307026.jpg",
            },
        ];
    },

    getProductsWithOrdersData() {
        return [];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};
