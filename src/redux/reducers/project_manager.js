import {FIND_PROJECTS,
        ADD_PROJECT_MODAL_SHOW, ADD_PROJECT_MODAL_CANCEL, ADD_PROJECT_MODAL_SURE, 
        UPDATE_PROJECT_MODAL_SHOW, UPDATE_PROJECT_MODAL_CANCEL, UPDATE_PROJECT_MODAL_SURE} from '../actions/project_manager'

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_PROJECTS:{
            return {
                ...state,
                list: action.list
            }
        }
        case ADD_PROJECT_MODAL_SHOW:{
            return {
                ...state,
                add_visible: true
            }
        }
        case ADD_PROJECT_MODAL_CANCEL:{
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_PROJECT_MODAL_SURE:{
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_PROJECT_MODAL_SHOW:{
            return {
                ...state,
                update_visible: true
            }
        }
        case UPDATE_PROJECT_MODAL_CANCEL:{
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_PROJECT_MODAL_SURE:{
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