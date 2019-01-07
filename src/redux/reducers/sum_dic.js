import {SHOW_LIST,
        ADD_MODAL_SHOW, ADD_MODAL_SURE, ADD_MODAL_CANCEL,
        UPDATE_MODAL_SHOW, UPADTE_MODAL_SURE, UPDATE_MODAL_CANCEL, DELETE_DIC_BY_IDS,
        CHANGE_DISABLED,
        DETAILS_MODAL_SHOW, DETAILS_MODAL_SURE, DETAILS_MODAL_CANCEL} from '../actions/sum_dic';

const initState = {
    list: [],
    dicTypes: [],
    addModalVisible: false,
    updateModalVisible: false,
    detailsModalVisible: false,
    updateId: '',
    dicTree: {},
    //分页
    total: 0,
    pageNo: 1,
    pageSize: 10,
}

export default function reducers(state=initState, action){
    switch(action.type){
        case SHOW_LIST: {
            return {
                ...state,
                list: action.list,
                total: action.total,
                pageNo: action.pageNo,
                pageSize: action.pageSize
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
            let newlist = state.list.map(ele => {
                if(ele.dic_id == dic.dic_id)
                    return dic
                else
                    return ele
            })
            return {
                ...state,
                updateModalVisible: false,
                list: newlist
            }
        }
        case UPDATE_MODAL_CANCEL: {
            return {
                ...state,
                updateModalVisible: false
            }
        }
        case DELETE_DIC_BY_IDS: {
            let dic_id = action.id
            let newlist = []
            for(var i=0; i<state.list.length; i++){
                if(dic_id != state.list[i].dic_id){
                    newlist.push(state.list[i])
                }
            }
            return {
                ...state,
                list: newlist
            }
        }
        case CHANGE_DISABLED: {
            let newlist = []
            state.list.map(ele => {
                if(ele.id == action.row.id){
                    return 
                }else{
                    return newlist.push(ele)
                }
            })
            return {
                ...state,
                list: newlist
            }
        }
        case DETAILS_MODAL_SHOW: {
            return {
                ...state,
                detailsModalVisible: true,
                dicTree: action.data
            }
        }
        case DETAILS_MODAL_SURE: {
            return {
                ...state,
                detailsModalVisible: false
            }
        }
        case DETAILS_MODAL_CANCEL: {
            return {
                ...state,
                detailsModalVisible: false
            }
        }
        default: 
            return state
    }
}