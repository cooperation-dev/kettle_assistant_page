import {FIND_USERS, 
        ADD_USER_MODAL_SHOW, ADD_USER_MODAL_CANCEL, ADD_USER_MODAL_SURE, 
        UPDATE_USER_MODAL_SHOW, UPDATE_USER_MODAL_CANCEL, UPDATE_USER_MODAL_SURE} from '../actions/user_manager'

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
    user:{
        nick_name: '',
        role: ''
    }
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_USERS:{
            return {
                ...state,
                list: action.list
            }
        }
        case ADD_USER_MODAL_SHOW:{
            return {
                ...state,
                add_visible: true
            }
        }
        case ADD_USER_MODAL_CANCEL:{
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_USER_MODAL_SURE:{
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_USER_MODAL_SHOW:{
            return {
                ...state,
                update_visible: true,
                user: action.user
            }
        }
        case UPDATE_USER_MODAL_CANCEL:{
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_USER_MODAL_SURE:{
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