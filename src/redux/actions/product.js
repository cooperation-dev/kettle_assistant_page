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

export const findProducts = (productReqVO) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/productService/v1/products',
            data: productReqVO
        }).then((response) => {
            return response.data.data
        }).then((productRespVO) => {
            dispatch(find_products(productRespVO))
        }) 
    }
}