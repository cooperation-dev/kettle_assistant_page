import {FIND_USERS, FIND_ROLES, 
        ADD_USER_MODAL_SHOW, ADD_USER_MODAL_CANCEL, ADD_USER_MODAL_SURE, 
        UPDATE_USER_MODAL_SHOW, UPDATE_USER_MODAL_CANCEL, UPDATE_USER_MODAL_SURE, 
        DELETE_USERS_BY_IDS, } from '../actions/user_manager'

const initState = {
    list: [],
    roles: [],
    addVisible: false,
    updateVisible: false,
    id: '',
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_USERS:{
            return {
                ...state,
                list: action.list
            }
        }
        case FIND_ROLES:{
            return {
                ...state,
                roles: action.roles,
            }
        }
        case ADD_USER_MODAL_SHOW:{
            return {
                ...state,
                addVisible: true
            }
        }
        case ADD_USER_MODAL_CANCEL:{
            return {
                ...state,
                addVisible: false
            }
        }
        case ADD_USER_MODAL_SURE:{
            state.list.push(action.user)
            return {
                ...state,
                addVisible: false
            }
        }
        case UPDATE_USER_MODAL_SHOW:{
            return {
                ...state,
                updateVisible: true,
                id: action.user.id,
            }
        }
        case UPDATE_USER_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_USER_MODAL_SURE:{
            let newList = state.list.map((ele) => {
                if(ele.id == action.user.id){
                    return action.user
                }else {
                    return ele
                }
            })
            return {
                ...state,
                updateVisible: false,
                list: newList,
            }
        }
        case DELETE_USERS_BY_IDS:{
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