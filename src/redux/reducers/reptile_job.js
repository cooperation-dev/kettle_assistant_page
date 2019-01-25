import {FIND_JOBS, 
    ADD_JOB_MODAL_SHOW, ADD_JOB_MODAL_SURE, ADD_JOB_MODAL_CANCEL,
    UPDATE_JOB_MODAL_SHOW, UPDATE_JOB_MODAL_SURE, UPDATE_JOB_MODAL_CANCEL,
    DISPLAY_LOG_SHOW, DISPLAY_LOG_CLOSE,DELETE_JOB_BY_IDS,
    STARTING_JOB, PAUSE_JOB,
    FIND_STATUS, FIND_PLATFORMS, FIND_TYPES} from '../actions/reptile_job';

const initState = {
    list: [],
    addVisible: false,
    updateVisible: false,
    logVisible: false,
    updateJobId: '',
    logJobId: '',
    //分页
    total: 0, //数据总数
    pageSize: 10, //默认一页10条
    pageNo: 1, //当前显示数
    statusList: [],
    platformList: [],
    typeList: []
}

export default function reducers(state=initState, action){
    switch(action.type){
        case FIND_JOBS: {
            return {
                ...state,
                list: action.list,
                total: action.total,
                pageSize: action.pageSize,
                pageNo: action.pageNo,
            }
        }
        case ADD_JOB_MODAL_SHOW: {
            return {
                ...state,
                addVisible: true
            }
        }
        case ADD_JOB_MODAL_SURE: {
            state.list.push(action.reptileRespVO)
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
                updateJobId: action.updateJobId
            }
        }
        case UPDATE_JOB_MODAL_SURE: {
            let newlist = state.list.map(ele => {
                if(ele.reptileId == action.reptileRespVO.reptileId)
                    return action.reptileRespVO
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
                logJobId: action.logJobId
            }
        }
        case DISPLAY_LOG_CLOSE: {
            return {
                ...state, 
                logVisible: false
            }
        }
        case DELETE_JOB_BY_IDS: {
            let reptileId = action.reptileId
            let newlist = []
            for(var i=0; i<state.list.length; i++){
                if(reptileId != state.list[i].reptileId){
                    newlist.push(state.list[i])
                }
            }
            return {
                ...state,
                list: newlist
            }
        }
        case STARTING_JOB: {
            let newlist = state.list.map(ele => {
                if(ele.reptileId == action.reptileRespVO.reptileId)
                    return action.reptileRespVO
                else
                    return ele
            })
            return {
                ...state,
                list: newlist
            }
        }
        case PAUSE_JOB:{
            let newlist = state.list.map(ele => {
                if(ele.reptileId == action.reptileRespVO.reptileId)
                    return action.reptileRespVO
                else
                    return ele
            })
            return {
                ...state,
                list: newlist
            }
        }
        case FIND_STATUS: {
            return {
                ...state,
                statusList: action.statusList
            }
        }
        case FIND_PLATFORMS: {
            return {
                ...state,
                platformList: action.platformList
            }
        }
        case FIND_TYPES: {
            return {
                ...state,
                typeList: action.typeList
            }
        }
        default:
            return state
    }
}