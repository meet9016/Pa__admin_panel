export interface EndPointApi {
    loginUser: string;
    dropDownSupplierCategoryList: string;
    getProductList: string;
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    loginUser:'supplier-login',
    
    //Product
    getProductList: 'supplier-product-list',
    dropDownSupplierCategoryList: 'supplier-category-list',
    
};

export default endPointApi;