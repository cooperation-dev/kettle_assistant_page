import {FIND_JOBS, 
    ADD_JOB_MODAL_SHOW, ADD_JOB_MODAL_SURE, ADD_JOB_MODAL_CANCEL,
    UPDATE_JOB_MODAL_SHOW, UPDATE_JOB_MODAL_SURE, UPDATE_JOB_MODAL_CANCEL,
    DELETE_JOB,
    DISPLAY_LOG_SHOW, DISPLAY_LOG_CLOSE,
    FIND_JOB_TYPES,
    CHANGE_MODAL_NAME, CHANGE_MODAL_TYPE, CHANGE_MODAL_DESC} from '../actions/job_manager';

const initState = {
    list: [],
    add_visible: false,
    update_visible: false,
    log_visible: false,
    job_types: [],
    modal_job_id: '',
    modal_job_name: '',
    modal_job_type: '',
    modal_job_desc: '',
    modal_log: '',
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
                modal_job_id: action.job.job_id,
                modal_job_name: action.job.job_name,
                modal_job_type: action.job.job_type,
                modal_job_desc: action.job.job_desc,
            }
        }
        case UPDATE_JOB_MODAL_SURE: {
            let newlist = state.list.map(ele => {
                if(ele.job_id == action.job.job_id)
                    return action.job
                else
                    return ele
            })
            return {
                ...state,
                update_visible: false,
                list: newlist
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
                log: action.log
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
        case CHANGE_MODAL_NAME: {
            return {
                ...state,
                modal_job_name: action.job_name
            }
        }
        case CHANGE_MODAL_TYPE: {
            return {
                ...state,
                modal_job_type: action.job_type
            }
        }
        case CHANGE_MODAL_DESC: {
            return {
                ...state,
                modal_job_desc: action.job_desc
            }
        }
        default:
            return state
    }
}