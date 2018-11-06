import {FIND_ROLES} from '../actions/role_manager'

const initState = {
    list:[]
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_ROLES:{
            return {
                list: action.list
            }
        }
        default:{
            return state
        }
    }
}