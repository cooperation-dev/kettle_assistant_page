import {FIND_MENUS, 
        ADD_MENU_MODAL_SHOW, ADD_MENU_MODAL_CANCEL, ADD_MENU_MODAL_SURE, 
        UPDATE_MENU_MODAL_SHOW, UPDATE_MENU_MODAL_CANCEL, UPDATE_MENU_MODAL_SURE} from '../actions/menu_manager'

const initState = {
    list:[],
    add_visible: false,
    update_visible: false,
    menu:{
        title: '',
        type: '',
        key: '',
        level: '',
        parent_key: '',
        filter_condition: '',
        custom_func: '',
    }
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_MENUS:{
            return {
                ...state,
                list:action.list
            }
        }
        case ADD_MENU_MODAL_SHOW:{
            return {
                ...state,
                add_visible: true
            }
        }
        case ADD_MENU_MODAL_CANCEL:{
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_MENU_MODAL_SURE:{
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_MENU_MODAL_SHOW:{
            return {
                ...state,
                update_visible: true,
                menu: action.menu
            }
        }
        case UPDATE_MENU_MODAL_CANCEL:{
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_MENU_MODAL_SURE:{
            return {
                ...state,
                update_visible: false
            }
        }
        default : {
            return state
        }
    }
}