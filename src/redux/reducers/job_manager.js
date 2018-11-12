import {FIND_JOBS, 
    ADD_JOB_MODAL_SHOW, ADD_JOB_MODAL_SURE, ADD_JOB_MODAL_CANCEL,
    UPDATE_JOB_MODAL_SHOW, UPDATE_JOB_MODAL_SURE, UPDATE_JOB_MODAL_CANCEL,
    DELETE_JOB,
    DISPLAY_LOG_SHOW, DISPLAY_LOG_CLOSE,
    FIND_JOB_TYPES,
    CHANGE_MODAL_NAME, CHANGE_MODAL_TYPE, CHANGE_MODAL_DESC} from '../actions/job_manager';

const initState = {
    list: [],
    addVisible: false,
    updateVisible: false,
    logVisible: false,
    jobTypes: [],
    modalJobId: '',
    modalJobName: '',
    modalJobType: '',
    modalJobDesc: '',
    modalLog: '',
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
                addVisible: true
            }
        }
        case ADD_JOB_MODAL_SURE: {
            state.list.push(action.job)
            return {
                ...state,
                addVisible: false,
            }
        }
        case ADD_JOB_MODAL_CANCEL: {
            return {
                ...state,
                addVisible: false
            }
        }
        case UPDATE_JOB_MODAL_SHOW: {
            return {
                ...state,
                updateVisible: true,
                modalJobId: action.job.id,
                modalJobName: action.job.name,
                modalJobType: action.job.jobType,
                modalJobDesc: action.job.desc,
            }
        }
        case UPDATE_JOB_MODAL_SURE: {
            let newlist = state.list.map(ele => {
                if(ele.id == action.job.id)
                    return action.job
                else
                    return ele
            })
            return {
                ...state,
                updateVisible: false,
                list: newlist
            }
        }
        case UPDATE_JOB_MODAL_CANCEL: {
            return {
                ...state,
                updateVisible: false
            }
        }
        case DISPLAY_LOG_SHOW: {
            return {
                ...state,
                logVisible: true,
                modalJobName: action.job.name,
                modalLog: action.job.log,
            }
        }
        case DISPLAY_LOG_CLOSE: {
            return {
                ...state, 
                logVisible: false
            }
        }
        case FIND_JOB_TYPES: {
            return {
                ...state,
                jobTypes: action.list
            }
        }
        case CHANGE_MODAL_NAME: {
            return {
                ...state,
                modalJobName: action.name
            }
        }
        case CHANGE_MODAL_TYPE: {
            return {
                ...state,
                modalJobType: action.jobType
            }
        }
        case CHANGE_MODAL_DESC: {
            return {
                ...state,
                modalJobDesc: action.desc
            }
        }
        default:
            return state
    }
}