import {FIND_ROLES, 
        ADD_ROLE_MODAL_SHOW, ADD_ROLE_MODAL_CANCEL, ADD_ROLE_MODAL_SURE, 
        UPDATE_ROLE_MODAL_SHOW, UPDATE_ROLE_MODAL_CANCEL, UPDATE_ROLE_MODAL_SURE,
        DELETE_ROLES_BY_IDS, } from '../actions/role_manager'

const initState = {
    list:[],
    addVisible: false,
    updateVisible: false,
    updateId: '',
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_ROLES:{
            return {
                ...state,
                list: action.list
            }
        }
        case ADD_ROLE_MODAL_SHOW:{
            return {
                ...state,
                addVisible: true
            }
        }
        case ADD_ROLE_MODAL_CANCEL:{
            return {
                ...state,
                addVisible: false
            }
        }
        case ADD_ROLE_MODAL_SURE:{
            state.list.push(action.role)
            return {
                ...state,
                addVisible: false
            }
        }
        case UPDATE_ROLE_MODAL_SHOW:{
            return {
                ...state,
                updateVisible: true,
                updateId: action.role.id,
            }
        }
        case UPDATE_ROLE_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_ROLE_MODAL_SURE:{
            state.list.map(ele => {
                if(ele.id == action.role.id)
                    return action.role
                else
                    return ele
            })
            return {
                ...state,
                updateVisible: false,
            }
        }
        case DELETE_ROLES_BY_IDS:{
            let newList = [];
            let deleteIds = action.deleteIds;
            for(var i = 0; i < state.list.length; i++){
                if(deleteIds.indexOf(state.list[i].id) == -1){
                    newList.push(state.list[i]);
                }
            }
            return {
                ...state,
                list: newList,
            }
        }
        default:{
            return state
        }
    }
}