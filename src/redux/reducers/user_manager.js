import {FIND_USERS} from '../actions/user_manager'

const initState = {
    list: []
}

export default function reducers(state = initState, action){
    switch(action.type){
        case FIND_USERS:{
            return {
                list: action.list
            }
        }
        default:{
            return state
        }
    }
}