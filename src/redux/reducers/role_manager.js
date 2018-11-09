import {FIND_ROLES, 
        ADD_ROLE_MODAL_SHOW, ADD_ROLE_MODAL_CANCEL, ADD_ROLE_MODAL_SURE, 
        UPDATE_ROLE_MODAL_SHOW, UPDATE_ROLE_MODAL_CANCEL, UPDATE_ROLE_MODAL_SURE} from '../actions/role_manager'

const initState = {
    list:[],
    add_visible: false,
    update_visible: false,
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
                add_visible: true
            }
        }
        case ADD_ROLE_MODAL_CANCEL:{
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_ROLE_MODAL_SURE:{
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_ROLE_MODAL_SHOW:{
            return {
                ...state,
                update_visible: true
            }
        }
        case UPDATE_ROLE_MODAL_CANCEL:{
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_ROLE_MODAL_SURE:{
            return {
                ...state,
                update_visible: false
            }
        }
        default:{
            return state
        }
    }
}