import axios from 'axios';
import { message } from 'antd';

export const FIND_JOBS = "reptileJob/findJobs";
//新增作业
export const ADD_JOB_MODAL_SHOW = "reptileJob/addModalShow";
export const ADD_JOB_MODAL_SURE = "reptileJob/addModalSure";
export const ADD_JOB_MODAL_CANCEL = "reptileJob/addModalCancel";

//修改作业
export const UPDATE_JOB_MODAL_SHOW = "reptileJob/updateModalShow";
export const UPDATE_JOB_MODAL_SURE = "reptileJob/updateModalSure";
export const UPDATE_JOB_MODAL_CANCEL = "reptileJob/updateModalCancel";

//删除作业
export const DELETE_JOB_BY_IDS = "reptileJob/deleteJobByIds";

//查看运行日志
export const DISPLAY_LOG_SHOW = "reptileJob/displayLogShow";
export const DISPLAY_LOG_CLOSE = "reptileJob/displayLogClose";

//运行/停止
export const STARTING_JOB = "reptileJob/startingJob";
export const PAUSE_JOB = "reptileJob/pauseJob";

//查询运行状态列表
export const FIND_STATUS = "reptileJob/findStatus"

//查询平台列表
export const FIND_PLATFORMS = "reptileJob/findPlatforms"

//查询产品类别列表
export const FIND_TYPES = "reptileJob/findTypes"

export const find_jobs = (reptileRespVO) => {
    return {
        type: FIND_JOBS,
        list: reptileRespVO.data,
        pageNo: reptileRespVO.pageNo,
        pageSize: reptileRespVO.pageSize,
        total: reptileRespVO.total
    }
}

export const add_job_modal_show = () => {
    return {
        type: ADD_JOB_MODAL_SHOW
    }
}

export const add_job_modal_sure = (reptileRespVO) => {
    return {
        type: ADD_JOB_MODAL_SURE,
        reptileRespVO: reptileRespVO
    }
}

export const add_job_modal_cancel = () => {
    return {
        type: ADD_JOB_MODAL_CANCEL
    }
}

export const update_job_modal_show = (id) => {
    return {
        type: UPDATE_JOB_MODAL_SHOW,
        updateJobId: id
    }
}

export const update_job_modal_sure = (reptileRespVO) => {
    return {
        type: UPDATE_JOB_MODAL_SURE,
        reptileRespVO: reptileRespVO
    }
}

export const update_job_modal_cancel = () => {
    return {
        type: UPDATE_JOB_MODAL_CANCEL
    }
}

export const display_log_show = (id) => {
    return {
        type: DISPLAY_LOG_SHOW,
        logJobId: id
    }
}

export const display_log_close = () => {
    return {
        type: DISPLAY_LOG_CLOSE,
    }
}

export const delete_job_by_ids = (reptileId) => {
    return {
        type: DELETE_JOB_BY_IDS,
        reptileId: reptileId
    }
}

export const starting_job = (reptileRespVO) => {
    return {
        type: STARTING_JOB,
        reptileRespVO: reptileRespVO
    }
}

export const pause_job = (reptileRespVO) => {
    return {
        type: PAUSE_JOB,
        reptileRespVO: reptileRespVO
    }
}

export const find_status = (list) => {
    return {
        type: FIND_STATUS,
        statusList: list
    }
}

export const find_platforms = (list) => {
    return {
        type: FIND_PLATFORMS,
        platformList: list
    }
}

export const find_types = (list) => {
    return {
        type: FIND_TYPES,
        typeList: list
    }
}

export const findJobs = (reptileVO) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/rest/reptileService/v1/jobs?name='+reptileVO.name+'&status='+reptileVO.status+'&platform='+reptileVO.platform+'&pageNo='+reptileVO.pageNo+'&pageSize='+reptileVO.pageSize,
            // data: reptileReqVO
        }).then((response) => {
            return response.data.data
        }).then((reptileVO) => {
            dispatch(find_jobs(reptileVO))
        }) 
    }
}

export const addJobModalShow = () => {
    return (dispatch) => {
        dispatch(add_job_modal_show())

    }
}

export const addJobModalSure = (reptileVO) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/rest/reptileService/v1/job?name='+reptileVO.name+'&platform='+reptileVO.platform+'&type='+reptileVO.type+'&timing='+reptileVO.timing+"&cookies="+reptileVO.cookies,
            // data: reptileVO,
        }).then((res) => {
            return res.data.data
        }).then((reptileVO) => {
            dispatch(add_job_modal_sure(reptileVO))
        })
    }
}

export const addJobModalCancel = () => {
    return (dispatch) => {
        dispatch(add_job_modal_cancel())
    }
}

export const updateJobModalShow = (id) => {
    return (dispatch) => {
        dispatch(update_job_modal_show(id))
    }
}

export const updateJobModalSure = (reptileVO,reptileId) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: '/api/rest/reptileService/v1/job/'+reptileId+'?name='+reptileVO.name+'&platform='+reptileVO.platform+'&type='+reptileVO.type+'&timing='+reptileVO.timing,
            // data: job
        }).then((response) => {
            return response.data.data
        }).then((reptileRespVO) => {
            dispatch(update_job_modal_sure(reptileRespVO))
        })
    }
}

export const updateJobModalCancel = () => {
    return (dispatch) => {
        dispatch(update_job_modal_cancel())
    }
}

export const deleteJob = (reptileId) => {
    return (dispatch) => {
            axios({
                method: 'delete',
                url: '/api/rest/reptileService/v1/job/'+reptileId,
            }).then((response) => {
                return response.data.data
            }).then((reptileId) => {
                dispatch(delete_job_by_ids(reptileId))
            })
    }
}

export const displayLogShow = (reptileId) => {
    return (dispatch) => {
        dispatch(display_log_show(reptileId))
    }
}

export const displayLogClose = () => {
    return (dispatch) => {
        dispatch(display_log_close())
    }
}

export const startingJob = (reptileId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/rest/reptileService/v1/job/'+reptileId+'/starting',
        }).then((response) => {
            if(response.data.code == "0"){
                message.success('启动成功');
            }
            return response.data.data
        }).then((reptileVO) => {
            dispatch(starting_job(reptileVO))
        })
    }
}

export const pauseJob = (reptileId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/rest/reptileService/v1/job/'+reptileId+'/pause',
        }).then((response) => {
            if(response.data.code == "0"){
                message.success('停止成功');
            }
            return response.data.data
        }).then((reptileVO) => {
            dispatch(pause_job(reptileVO))
        })
    }
}

export const findStatus = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/rest/reptileService/v1/job/status',
        }).then((response) => {
            return response.data.data
        }).then((list) => {
            dispatch(find_status(list))
        }) 
    }
}

export const findPlatforms = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/rest/reptileService/v1/job/platforms',
        }).then((response) => {
            return response.data.data
        }).then((list) => {
            dispatch(find_platforms(list))
        }) 
    }
}

export const findTypes = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/rest/reptileService/v1/job/types',
        }).then((response) => {
            return response.data.data
        }).then((list) => {
            dispatch(find_types(list))
        }) 
    }
}