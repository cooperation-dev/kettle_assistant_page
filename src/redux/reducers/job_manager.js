import {FIND_JOBS, 
    ADD_JOB_MODAL_SHOW, ADD_JOB_MODAL_SURE, ADD_JOB_MODAL_CANCEL,
    UPDATE_JOB_MODAL_SHOW, UPDATE_JOB_MODAL_SURE, UPDATE_JOB_MODAL_CANCEL,
    DELETE_JOB,
    DISPLAY_LOG_SHOW, DISPLAY_LOG_CLOSE,
    FIND_JOB_TYPES} from '../actions/job_manager';

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
    log_visible: false,
    job_types: [],
    job: {
        job_name: '',
        job_type: '',
        job_desc: '',
        log: ''
    },
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
            state.list.push(action.job)
            return {
                ...state,
                add_visible: false,
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
                update_visible: true,
                job: action.job
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
        case DISPLAY_LOG_SHOW: {
            return {
                ...state,
                log_visible: true,
                job: action.job
            }
        }
        case DISPLAY_LOG_CLOSE: {
            return {
                ...state, 
                log_visible: false
            }
        }
        case FIND_JOB_TYPES: {
            return {
                ...state,
                job_types: action.list
            }
        }
        default:
            return state
    }
}