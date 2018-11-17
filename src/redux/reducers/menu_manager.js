import {FIND_MENUS, 
        ADD_MENU_MODAL_SHOW, ADD_MENU_MODAL_CANCEL, ADD_MENU_MODAL_SURE, 
        UPDATE_MENU_MODAL_SHOW, UPDATE_MENU_MODAL_CANCEL, UPDATE_MENU_MODAL_SURE, 
        CHANGE_MODAL_NAME, CHANGE_MODAL_TYPE, CHANGE_MODAL_CODE, CHANGE_MODAL_LEVEL, CHANGE_MODAL_PARENT_ID, 
        CHANGE_MODAL_ICON, CHANGE_MODAL_DIRECTION, CHANGE_MODAL_COMPONENT, CHANGE_MODAL_FILTER_CONDITION, CHANGE_MODAL_CUSTOM_FUNC, } from '../actions/menu_manager'

const initState = {
    list:[],
    addVisible: false,
    updateVisible: false,
    id: '',
    name: '',
    type: '',
    code: '',
    level: '',
    parentId: '',
    icon: '',
    direction: '',
    component: '',
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
            let flag = true;
            let newList = state.list.map((menu) => {
                if(menu.id == action.menu.id){
                    flag = false;
                    return action.menu
                }else {
                    return menu
                }
            })
            if(flag) newList.push(action.menu)
            return {
                ...state,
                addVisible: false,
                list: newList,
            }
        }
        case UPDATE_MENU_MODAL_SHOW:{
            return {
                ...state,
                updateVisible: true,
                id: action.menu.id,
                name: action.menu.name,
                type: action.menu.type,
                code: action.menu.code,
                level: action.menu.level,
                parentId: action.menu.parentId,
                icon: action.menu.icon,
                direction: action.menu.direction,
                component: action.menu.component,
                filterCondition: action.menu.filterCondition,
                customFunc: action.menu.customFunc
            }
        }
        case UPDATE_MENU_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_MENU_MODAL_SURE:{
            let newList = state.list.map(menu => {
                if(menu.id == action.menu.id){
                    return action.menu
                }else {
                    return menu
                }
            })
            return {
                ...state,
                updateVisible: false,
                list: newList,
            }
        }
        case CHANGE_MODAL_NAME:{
            return {
                ...state,
                name: action.name
            }
        }
        case CHANGE_MODAL_TYPE:{
            return {
                ...state,
                type: action.menuType
            }
        }
        case CHANGE_MODAL_CODE:{
            return {
                ...state,
                code: action.code
            }
        }
        case CHANGE_MODAL_LEVEL:{
            return {
                ...state,
                level: action.level
            }
        }
        case CHANGE_MODAL_PARENT_ID:{
            return {
                ...state,
                parentId: action.parentId
            }
        }
        case CHANGE_MODAL_ICON:{
            return {
                ...state,
                icon: action.icon
            }
        }
        case CHANGE_MODAL_DIRECTION:{
            return {
                ...state,
                direction: action.direction
            }
        }
        case CHANGE_MODAL_COMPONENT:{
            return {
                ...state,
                component: action.component
            }
        }
        case CHANGE_MODAL_FILTER_CONDITION:{
            return {
                ...state,
                filterCondition: action.filterCondition
            }
        }
        case CHANGE_MODAL_CUSTOM_FUNC:{
            return {
                ...state,
                customFunc: action.customFunc
            }
        }
        default : {
            return state
        }
    }
}