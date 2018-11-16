import {SHOW_LIST,
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL,
        UPDATE_MODAL_SHOW, UPADTE_MODAL_SURE, UPDATE_MODAL_CANCEL} from '../actions/sum_dic';

const initState = {
    list: [],
    dicTypes: [],
    addModalVisible: false,
    updateModalVisible: false,
    updateId: '',
}

export default function reducers(state=initState, action){
    switch(action.type){
        case SHOW_LIST: {
            return {
                ...state,
                list: action.list
            }
        }
        case ADD_MODAL_SHOW: {
            return {
                ...state,
                addModalVisible: true
            }
        }
        case ADD_MODAL_SURE: {
            state.list.push(action.dic)
            return {
                ...state,
                addModalVisible: false
            }
        }
        case ADD_MODAL_CANCEL: {
            return {
                ...state,
                addModalVisible: false
            }
        }
        case UPDATE_MODAL_SHOW: {
            return {
                ...state,
                updateModalVisible: true,
                updateId: action.updateId
            }
        }
        case UPADTE_MODAL_SURE: {
            return {
                ...state,
                updateModalVisible: false
            }
        }
        case UPDATE_MODAL_CANCEL: {
            return {
                ...state,
                updateModalVisible: false
            }
        }
        default: 
            return state
    }
}