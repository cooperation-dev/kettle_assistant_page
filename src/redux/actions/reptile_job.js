import axios from 'axios';

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

export const findJobs = (reptileReqVO) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/reptileService/v1/jobs',
            data: reptileReqVO
        }).then((response) => {
            return response.data.data
        }).then((reptileRespVO) => {
            dispatch(find_jobs(reptileRespVO))
        }) 
    }
}

export const addJobModalShow = () => {
    return (dispatch) => {
        dispatch(add_job_modal_show())

    }
}

export const addJobModalSure = (reptileReqVO) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/reptileService/v1/job',
            data: reptileReqVO
        }).then((res) => {
            return res.data.data
        }).then((reptileRespVO) => {
            dispatch(add_job_modal_sure(reptileRespVO))
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

export const updateJobModalSure = (job,reptileId) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: '/reptileService/v1/job/'+reptileId,
            data: job
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
                url: '/reptileService/v1/job/'+reptileId,
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
            url: '/reptileService/v1/job/'+reptileId+'/starting',
        }).then((response) => {
            return response.data.data
        }).then((reptileRespVO) => {
            dispatch(starting_job(reptileRespVO))
        })
    }
}

export const pauseJob = (reptileId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/reptileService/v1/job/'+reptileId+'/pause',
        }).then((response) => {
            return response.data.data
        }).then((reptileRespVO) => {
            dispatch(pause_job(reptileRespVO))
        })
    }
}