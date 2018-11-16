import {SHOW_LIST,
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL} from '../actions/sum_dic';

const initState = {
    list: [],
    dicTypes: [],
    addModalVisible: false
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
        default: 
            return state
    }
}