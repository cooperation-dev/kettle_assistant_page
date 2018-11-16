import {FIND_USERS, 
        ADD_USER_MODAL_SHOW, ADD_USER_MODAL_CANCEL, ADD_USER_MODAL_SURE, 
        UPDATE_USER_MODAL_SHOW, UPDATE_USER_MODAL_CANCEL, UPDATE_USER_MODAL_SURE, 
        CHANGE_MODAL_NICKNAME, CHANGE_MODAL_ROLE} from '../actions/user_manager'

const initState = {
    list: [],
    addVisible: false,
    updateVisible: false,
    id: '',
    nickName: '',
    loginAccount: '',
    role: ''
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
                nickName: action.user.nickName,
                role: action.user.role
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
                list: newList
            }
        }
        case CHANGE_MODAL_NICKNAME:{
            return {
                ...state,
                nickName: action.nickName
            }
        }
        case CHANGE_MODAL_ROLE:{
            return {
                ...state,
                role: action.role
            }
        }
        default:{
            return state
        }
    }
}