import axios from 'axios';

export const FIND_PRODUCTS = "product/findProducts";

export const find_products = (list) => {
    return {
        type: FIND_PRODUCTS,
        list: list
    }
}

export const findProducts = (product) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/productService/v1/products',
            data: product
        }).then((response) => {
            return response.data
        })
        .then((list) => {
            dispatch(find_products(list))
        }) 
    }
}