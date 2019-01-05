import axios from 'axios';
import {message} from 'antd';

export const FIND_JOBS = "/reptileService/v1/jobs";
//新增作业
export const ADD_JOB_MODAL_SHOW = "reptileJob/addModalShow";
export const ADD_JOB_MODAL_SURE = "/reptileService/v1/job";
export const ADD_JOB_MODAL_CANCEL = "reptileJob/addModalCancel";

//修改作业
export const UPDATE_JOB_MODAL_SHOW = "reptileJob/updateModalShow";
export const UPDATE_JOB_MODAL_SURE = "/reptileService/v1/job";
export const UPDATE_JOB_MODAL_CANCEL = "reptileJob/updateModalCancel";

//删除作业
export const DELETE_JOB_BY_IDS = "/reptileService/v1/job/{id}";

//查看运行日志
export const DISPLAY_LOG_SHOW = "reptileJob/displayLogShow";
export const DISPLAY_LOG_CLOSE = "reptileJob/displayLogClose";

//运行/停止
export const STARTING_JOB = "/reptileService/v1/job/{id}/starting";
export const PAUSE_JOB = "/reptileService/v1/job/{id}/pause";

export const find_jobs = (list) => {
    return {
        type: FIND_JOBS,
        list: list
    }
}

export const add_job_modal_show = () => {
    return {
        type: ADD_JOB_MODAL_SHOW
    }
}

export const add_job_modal_sure = (job) => {
    return {
        type: ADD_JOB_MODAL_SURE,
        job: job
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

export const update_job_modal_sure = (job) => {
    return {
        type: UPDATE_JOB_MODAL_SURE,
        job: job
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

export const delete_job_by_ids = (reptileJob) => {
    return {
        type: DELETE_JOB_BY_IDS,
        reptileJob: reptileJob
    }
}

export const starting_job = (reptileJob) => {
    return {
        type: STARTING_JOB,
        reptileJob: reptileJob
    }
}

export const pause_job = (reptileJob) => {
    return {
        type: PAUSE_JOB,
        reptileJob: reptileJob
    }
}

export const findJobs = (job) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/reptileService/v1/jobs',
            data: job
        }).then((response) => {
            return response.data
        })
        .then((list) => {
            dispatch(find_jobs(list))
        }) 
    }
}

export const addJobModalShow = () => {
    return (dispatch) => {
        dispatch(add_job_modal_show())

    }
}

export const addJobModalSure = (job) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: ADD_JOB_MODAL_SURE,
            data: job
        }).then((res) => {
            return res.data
        }).then((job) => {
            dispatch(add_job_modal_sure(job))
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

export const updateJobModalSure = (job) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: UPDATE_JOB_MODAL_SURE,
            data: job
        }).then((res) => {
            return res.data
        }).then((job) => {
            dispatch(update_job_modal_sure(job))
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
                return response.data
            }).then((reptileJob) => {
                dispatch(delete_job_by_ids(reptileJob))
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
            return response.data
        }).then((reptileJob) => {
            dispatch(starting_job(reptileJob))
        })
    }
}

export const pauseJob = (reptileId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/reptileService/v1/job/'+reptileId+'/pause',
        }).then((response) => {
            return response.data
        }).then((reptileJob) => {
            dispatch(pause_job(reptileJob))
        })
    }
}