import {SHOW_LIST,
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL,
        UPDATE_MODAL_SHOW, UPADTE_MODAL_SURE, UPDATE_MODAL_CANCEL, DELETE_DIC_BY_IDS} from '../actions/sum_dic';

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
            let dic = action.dic
            state.list.map(ele => {
                if(ele.id == dic.id)
                    return dic
                else
                    return ele
            })
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
        case DELETE_DIC_BY_IDS: {
            let deleteIds = action.deleteDics
            // let newlist = state.list.map(ele => {
            //     if(deleteIds.indexOf(ele.id) == -1){
            //         return ele
            //     }
            // })
            let newlist = []
            for(var i=0; i<state.list.length; i++){
                if(deleteIds.indexOf(state.list[i].id) == -1){
                    newlist.push(state.list[i])
                }
            }
            return {
                ...state,
                list: newlist
            }
        }
        default: 
            return state
    }
}