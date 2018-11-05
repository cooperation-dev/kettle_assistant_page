import {FIND_LOGS} from '../actions/system_log';

const init = {
    list: []
}

export default function reducers (state=init, action){
    switch(action.type){
        case FIND_LOGS: {
            return {
                ...state,
                list: action.list
            }
        }
        default:
            return state
    }
}