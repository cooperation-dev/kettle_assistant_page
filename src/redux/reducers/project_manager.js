import {FIND_PROJECTS} from '../actions/project_manager'

const initState = {
    list: []
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_PROJECTS:{
            return {
                list: action.list
            }
        }
        default:{
            return state
        }
    }
}