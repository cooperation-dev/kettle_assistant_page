import {FIND_PRODUCTS} from '../actions/product';

const initState = {
    list: [],
}

export default function reducers(state=initState, action){
    switch(action.type){
        case FIND_PRODUCTS: {
            return {
                ...state,
                list: action.list
            }
        }
        default:
            return state
    }
}