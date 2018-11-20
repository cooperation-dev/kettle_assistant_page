import {FIND_PROJECTS,
        ADD_PROJECT_MODAL_SHOW, ADD_PROJECT_MODAL_CANCEL, ADD_PROJECT_MODAL_SURE, 
        UPDATE_PROJECT_MODAL_SHOW, UPDATE_PROJECT_MODAL_CANCEL, UPDATE_PROJECT_MODAL_SURE, 
        DELETE_PROJECTS_BY_IDS, } from '../actions/project_manager'

const initState = {
    list: [],
    addVisible: false,
    updateVisible: false,
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
                addVisible: true
            }
        }
        case ADD_PROJECT_MODAL_CANCEL:{
            return {
                ...state,
                addVisible: false
            }
        }
        case ADD_PROJECT_MODAL_SURE:{
            state.list.push(action.project)
            return {
                ...state,
                addVisible: false
            }
        }
        case UPDATE_PROJECT_MODAL_SHOW:{
            return {
                ...state,
                updateVisible: true,
                id: action.project.id,
                name: action.project.name,
                sort: action.project.sort,
                projectUrl: action.project.projectUrl
            }
        }
        case UPDATE_PROJECT_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_PROJECT_MODAL_SURE:{
            state.list.map((project) => {
                if(project.id == action.project.id){
                    return action.project
                }else {
                    return project
                }
            })
            return {
                ...state,
                updateVisible: false,
            }
        }
        case DELETE_PROJECTS_BY_IDS:{
            let newList = [];
            let deleteIds = action.deleteIds;
            for(var i = 0; i < state.list.length; i++){
                if(deleteIds.indexOf(state.list[i].id) == -1){
                    newList.push(state.list[i]);
                }
            }
            return {
                ...state,
                list: newList,
            }
        }
        default:{
            return state
        }
    }
}