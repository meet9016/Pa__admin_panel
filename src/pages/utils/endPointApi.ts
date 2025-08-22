export interface EndPointApi {
    loginUser: string;

    //Product
    getProductList: string;
    postaddProduct: string;
    dropDownMainCategoryList: string;
    dropDownSubCategoryList: string;
    deleteProduct: string,
    orderList: string,
    profile: string,
    productDetail: string,
    productImageDelete: string
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    loginUser: 'supplier-login',

    //Product
    getProductList: 'supplier-product-list',
    postaddProduct: 'supplier-add-product',
    dropDownMainCategoryList: 'supplier-category-list',
    dropDownSubCategoryList: 'supplier-sub-category-list',
    deleteProduct: 'supplier-delete-product',
    orderList: 'supplier-order-list',
    profile: 'supplier-profile',
    productDetail: 'supplier-product-details',
    productImageDelete:'supplier-delete-product-image'
};

export default endPointApi;