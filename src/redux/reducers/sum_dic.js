import {SHOW_LIST, CHANGE_DISABLED, 
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL,
        DELETE_DIC,
        FIND_DIC_TYPES,
        CHANGE_MODAL_NAME, CHANGE_MODAL_CODE, CHANGE_MODAL_TYPE, CHANGE_MODAL_BELONGS,
        UPDATE_MODAL_SHOW, UPDATE_MODAL_SURE, UPDATE_MODAL_CANCEL} from '../actions/sum_dic';

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
    dic_types: [],
    modal_dic_id: '',
    modal_dic_name: '',
    modal_dic_code: '',
    modal_dic_type: '',
    modal_belongs: '',
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
        case CHANGE_MODAL_NAME: {
            return {
                ...state,
                modal_dic_name: action.dic_name
            }
        }
        case CHANGE_MODAL_CODE: {
            return {
                ...state,
                modal_dic_code: action.dic_code
            }
        }
        case CHANGE_MODAL_TYPE: {
            return {
                ...state,
                modal_dic_type: action.dic_type
            }
        }
        case CHANGE_MODAL_BELONGS: {
            return {
                ...state,
                modal_belongs: action.belongs
            }
        }
        case UPDATE_MODAL_SHOW: {
            return {
                ...state,
                update_visible: true,
                modal_dic_id: action.dic.dic_id,
                modal_dic_name: action.dic.dic_name,
                modal_dic_code: action.dic.dic_code,
                modal_dic_type: action.dic.dic_type,
                modal_belongs: action.dic.belongs,
            }
        }
        case UPDATE_MODAL_SURE: {
            let newlist = state.list.map(ele => {
                if(ele.dic_id == action.dic.dic_id)
                    return action.dic
                else
                    return ele
            })
            return {
                ...state,
                update_visible: false,
                list: newlist
            }
        }
        case UPDATE_MODAL_CANCEL: {
            return {
                ...state,
                update_visible: false
            }
        }
        default: 
            return state
    }
}