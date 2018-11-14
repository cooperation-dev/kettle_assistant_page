import {FIND_MENUS, 
        ADD_MENU_MODAL_SHOW, ADD_MENU_MODAL_CANCEL, ADD_MENU_MODAL_SURE, 
        UPDATE_MENU_MODAL_SHOW, UPDATE_MENU_MODAL_CANCEL, UPDATE_MENU_MODAL_SURE} from '../actions/menu_manager'

const initState = {
    list:[],
    addVisible: false,
    updateVisible: false,
    key: '',
    title: '',
    type: '',
    level: '',
    parentKey: '',
    filterCondition: '',
    customFunc: ''
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
                addVisible: true
            }
        }
        case ADD_MENU_MODAL_CANCEL:{
            return {
                ...state,
                addVisible: false
            }
        }
        case ADD_MENU_MODAL_SURE:{
            return {
                ...state,
                addVisible: false
            }
        }
        case UPDATE_MENU_MODAL_SHOW:{
            return {
                ...state,
                updateVisible: true,
                key: action.menu.key,
                title: action.menu.title,
                type: action.menu.type,
                level: action.menu.level,
                parentKey: action.menu.parent_key,
                filterCondition: action.menu.filter_condition,
                customFunc: action.menu.custom_func
            }
        }
        case UPDATE_MENU_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_MENU_MODAL_SURE:{
            return {
                ...state,
                updateVisible: false
            }
        }
        default : {
            return state
        }
    }
}