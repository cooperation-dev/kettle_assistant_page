import {FIND_MENUS, FIND_PARENTS, FIND_ICONS, FIND_TYPES, 
        ADD_MENU_MODAL_SHOW, ADD_MENU_MODAL_CANCEL, ADD_MENU_MODAL_SURE, 
        UPDATE_MENU_MODAL_SHOW, UPDATE_MENU_MODAL_CANCEL, UPDATE_MENU_MODAL_SURE,
        DELETE_MENUS_BY_IDS, } from '../actions/menu_manager'

const initState = {
    list:[],
    parents: [],
    icons: [],
    types: [],
    addVisible: false,
    updateVisible: false,
    updateId: '',
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_MENUS:{
            return {
                ...state,
                list:action.list
            }
        }
        case FIND_PARENTS:{
            return {
                ...state,
                parents: action.parents,
            }
        }
        case FIND_ICONS:{
            return {
                ...state,
                icons: action.icons,
            }
        }
        case FIND_TYPES:{
            return {
                ...state,
                types: action.types,
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
                if(menu.id == action.menu.parentId){
                    flag = false;
                    menu.children.push(action.menu);
                    return menu;
                }else {
                    return menu;
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
                updateId: action.menu.id,
            }
        }
        case UPDATE_MENU_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_MENU_MODAL_SURE:{
            let flag = true;
            let testList = state.list.map(menu => {
                if(menu.id == action.menu.id){
                    flag = false;
                    return action.menu
                }else {
                    return menu;
                }
            })
            if(flag){
                testList.map(menu => {
                    let newChildren = menu.children.map(children => {
                        if(children.id == action.menu.id){
                            return action.menu;
                        }else {
                            return children;
                        }
                    })
                    menu.children.push(newChildren);
                    return menu;
                })
            }
            return {
                ...state,
                updateVisible: false,
                list: testList,
            }
        }
        case DELETE_MENUS_BY_IDS:{
            let newDeleList = [];
            let deleteIds = action.deleteIds;
            for(let i = 0; i < state.list.length; i++){
                let newChildren = [];
                if(deleteIds.indexOf(state.list[i].id) == -1){
                    for(let j = 0; j < state.list[i].children.length; j++){
                        if(deleteIds.indexOf(state.list[i].children[j].id) == -1){
                            newChildren.push(state.list[i].children[j]);
                        }
                    }
                    state.list[i].children = newChildren;
                    newDeleList.push(state.list[i]);
                }
            }
            return {
                ...state,
                list: newDeleList,
            }
        }
        default : {
            return state
        }
    }
}