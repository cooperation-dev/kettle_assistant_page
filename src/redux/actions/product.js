import axios from 'axios';

export const FIND_PRODUCTS = "product/findProducts";

export const find_products = (productRespVO) => {
    return {
        type: FIND_PRODUCTS,
        list: productRespVO.data,
        pageNo: productRespVO.pageNo,
        pageSize: productRespVO.pageSize,
        total: productRespVO.total,
    }
}

export const findProducts = (productVO) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/rest/productService/v1/products?name='+productVO.name+'&platform='+productVO.platform+'&pageNo='+productVO.pageNo+'&pageSize='+productVO.pageSize,
            // data: productReqVO
        }).then((response) => {
            return response.data.data
        }).then((productVO) => {
            dispatch(find_products(productVO))
        }) 
    }
}