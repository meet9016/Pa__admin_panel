export interface EndPointApi {
    loginUser: string;

    //Product
    getProductList: string;
    postaddProduct: string;
    dropDownMainCategoryList: string;
    dropDownSubCategoryList: string;
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    loginUser:'supplier-login',
    
    //Product
    getProductList: 'supplier-product-list',
    postaddProduct: 'supplier-add-product',
    dropDownMainCategoryList: 'supplier-category-list',
    dropDownSubCategoryList: 'supplier-sub-category-list',
    
};

export default endPointApi;