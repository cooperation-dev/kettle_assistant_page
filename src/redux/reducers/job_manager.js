import {FIND_JOBS, 
    ADD_JOB_MODAL_SHOW, ADD_JOB_MODAL_SURE, ADD_JOB_MODAL_CANCEL,
    UPDATE_JOB_MODAL_SHOW, UPDATE_JOB_MODAL_SURE, UPDATE_JOB_MODAL_CANCEL} from '../actions/job_manager';

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
}

export default function reducers(state=initState, action){
    switch(action.type){
        case FIND_JOBS: {
            return {
                ...state,
                list: action.list
            }
        }
        case ADD_JOB_MODAL_SHOW: {
            return {
                ...state,
                add_visible: true
            }
        }
        case ADD_JOB_MODAL_SURE: {
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_JOB_MODAL_CANCEL: {
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_JOB_MODAL_SHOW: {
            return {
                ...state,
                update_visible: true
            }
        }
        case UPDATE_JOB_MODAL_SURE: {
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_JOB_MODAL_CANCEL: {
            return {
                ...state,
                update_visible: false
            }
        }
        default:
            return state
    }
}