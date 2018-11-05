import {FIND_LIST} from '../actions/database_manager'

const initState = {
    list : []
}

export default function reducers (state = initState, action){
    switch(action.type){
        case FIND_LIST:{
            return {
                list:action.list
            }
        }
        default : 
            return state
    }
}