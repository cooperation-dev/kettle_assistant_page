import {FIND_JOBS} from '../actions/job_manager';

const initState = {
    list: []
}

export default function reducers(state=initState, action){
    switch(action.type){
        case FIND_JOBS: {
            return {
                list: action.list
            }
        }
        default:
            return state
    }
}