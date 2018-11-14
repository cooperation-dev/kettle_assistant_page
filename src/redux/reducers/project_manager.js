import {FIND_PROJECTS,
        ADD_PROJECT_MODAL_SHOW, ADD_PROJECT_MODAL_CANCEL, ADD_PROJECT_MODAL_SURE, 
        UPDATE_PROJECT_MODAL_SHOW, UPDATE_PROJECT_MODAL_CANCEL, UPDATE_PROJECT_MODAL_SURE, 
        CHANGE_MODAL_NAME, CHANGE_MODAL_PROJECT_URL, CHANGE_MODAL_SORT} from '../actions/project_manager'

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
    id: '',
    name: '',
    sort: '',
    projectUrl: ''
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
            state.list.push(action.project)
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_PROJECT_MODAL_SHOW:{
            return {
                ...state,
                update_visible: true,
                id: action.project.obj_code,
                name: action.project.obj_name,
                sort: action.project.obj_sort,
                projectUrl: action.project.project_url
            }
        }
        case UPDATE_PROJECT_MODAL_CANCEL:{
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_PROJECT_MODAL_SURE:{
            let newList = state.list.map((project) => {
                if(project.obj_code == action.project.obj_code){
                    return action.project
                }else {
                    return project
                }
            })
            return {
                ...state,
                update_visible: false,
                list: newList
            }
        }
        case CHANGE_MODAL_NAME:{
            return {
                ...state,
                name:action.name
            }
        }
        case CHANGE_MODAL_PROJECT_URL:{
            return {
                ...state,
                projectUrl: action.projectUrl
            }
        }
        case CHANGE_MODAL_SORT:{
            return {
                ...state,
                sort: action.sort
            }
        }
        default:{
            return state
        }
    }
}