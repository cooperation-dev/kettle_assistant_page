import {SHOW_LIST, CHANGE_DISABLED, 
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL,
        DELETE_DIC,
        FIND_DIC_TYPES} from '../actions/sum_dic';

const initState = {
    list: [],
    add_visible: false,
    dic_types: []
}

export default function reducers(state=initState, action){
    switch(action.type){
        case SHOW_LIST:{
            return {
                ...state,
                list: action.list
            }
        }
        case CHANGE_DISABLED: {
            let list = state.list.map(record => {
                if(record.key == action.row.key){
                    return action.row
                }else{
                    return record
                }
            })
            return {
                ...state,
                list: list
            }
        }
        case ADD_MODAL_SHOW: {
            return {
                ...state,
                add_visible: true
            }
        }
        case ADD_MODAL_SURE: {
            state.list.push(action.dic)
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_MODAL_CANCEL: {
            return {
                ...state,
                add_visible: false
            }
        }
        case DELETE_DIC: {
            return {
                ...state, 
                list: action.list
            }
        }
        case FIND_DIC_TYPES: {
            return {
                ...state,
                dic_types: action.list
            }
        }
        default: 
            return state
    }
}