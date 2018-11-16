import {FIND_ROLES, 
        ADD_ROLE_MODAL_SHOW, ADD_ROLE_MODAL_CANCEL, ADD_ROLE_MODAL_SURE, 
        UPDATE_ROLE_MODAL_SHOW, UPDATE_ROLE_MODAL_CANCEL, UPDATE_ROLE_MODAL_SURE, 
        CHANGE_MODAL_NAME, CHANGE_MODAL_DESCRIPTION} from '../actions/role_manager'

const initState = {
    list:[],
    addVisible: false,
    updateVisible: false,
    modalRoleId: '',
    modalRoleName: '',
    modalRoleDescription: ''
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
                modalRoleId: action.role.id,
                modalRoleName: action.role.roleName,
                modalRoleDescription: action.role.roleDescription,
            }
        }
        case UPDATE_ROLE_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_ROLE_MODAL_SURE:{
            let newlist = state.list.map(ele => {
                if(ele.id == action.role.id)
                    return action.role
                else
                    return ele
            })
            return {
                ...state,
                updateVisible: false,
                list: newlist
            }
        }
        case CHANGE_MODAL_NAME:{
            return {
                ...state,
                modalRoleName: action.roleName
            }
        }
        case CHANGE_MODAL_DESCRIPTION:{
            return {
                ...state,
                modalRoleDescription: action.roleDescription
            }
        }
        default:{
            return state
        }
    }
}