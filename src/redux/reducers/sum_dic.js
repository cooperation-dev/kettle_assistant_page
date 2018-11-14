import {SHOW_LIST, CHANGE_DISABLED, 
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL,
        DELETE_DIC,
        FIND_DIC_TYPES, FIND_ROOT_DIC_TYPES,
        CHANGE_MODAL_NAME, CHANGE_MODAL_CODE, CHANGE_MODAL_TYPE, CHANGE_MODAL_BELONGS,
        UPDATE_MODAL_SHOW, UPDATE_MODAL_SURE, UPDATE_MODAL_CANCEL} from '../actions/sum_dic';

const initState = {
    list: [],
    addVisible: false,
    updateVisible: false,
    dicTypes: [],
    rootDicTypes: [],
    modalDicId: '',
    modalDicName: '',
    modalDicCode: '',
    modalDicType: '',
    modalBelongs: '',
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
                addVisible: true
            }
        }
        case ADD_MODAL_SURE: {
            state.list.push(action.dic)
            return {
                ...state,
                addVisible: false
            }
        }
        case ADD_MODAL_CANCEL: {
            return {
                ...state,
                addVisible: false
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
                dicTypes: action.list
            }
        }
        case FIND_ROOT_DIC_TYPES: {
            return {
                ...state,
                rootDicTypes: action.list
            }
        }
        case CHANGE_MODAL_NAME: {
            return {
                ...state,
                modalDicName: action.name
            }
        }
        case CHANGE_MODAL_CODE: {
            return {
                ...state,
                modalDicCode: action.code
            }
        }
        case CHANGE_MODAL_TYPE: {
            return {
                ...state,
                modalDicType: action.dicType
            }
        }
        case CHANGE_MODAL_BELONGS: {
            return {
                ...state,
                modalBelongs: action.belongs
            }
        }
        case UPDATE_MODAL_SHOW: {
            return {
                ...state,
                updateVisible: true,
                modalDicId: action.dic.id,
                modalDicName: action.dic.name,
                modalDicCode: action.dic.code,
                modalDicType: action.dic.dicType,
                modalBelongs: action.dic.belongs,
            }
        }
        case UPDATE_MODAL_SURE: {
            let newlist = state.list.map(ele => {
                if(ele.id == action.dic.id)
                    return action.dic
                else
                    return ele
            })
            return {
                ...state,
                updateVisible: false,
                list: newlist
            }
        }
        case UPDATE_MODAL_CANCEL: {
            return {
                ...state,
                updateVisible: false
            }
        }
        default: 
            return state
    }
}