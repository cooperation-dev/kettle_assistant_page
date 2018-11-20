import axios from 'axios';
import {message} from 'antd';

export const FIND_JOBS = "jobManager/findJobs";
//新增作业框弹出
export const ADD_JOB_MODAL_SHOW = "jobManager/addModalShow";
//新增作业框确认
export const ADD_JOB_MODAL_SURE = "jobManager/addModalSure";
//新增作业框取消
export const ADD_JOB_MODAL_CANCEL = "jobManager/addModalCancel";

//修改作业框弹出
export const UPDATE_JOB_MODAL_SHOW = "jobManager/updateModalShow";
//修改作业框确认
export const UPDATE_JOB_MODAL_SURE = "jobManager/updateModalSure";
//修改作业框取消
export const UPDATE_JOB_MODAL_CANCEL = "jobManager/updateModalCancel";
//删除作业
export const DELETE_JOB_BY_IDS = "jobManager/deleteJobByIds";
//查看运行日志
export const DISPLAY_LOG_SHOW = "jobManager/displayLogShow";
export const DISPLAY_LOG_CLOSE = "jobManager/displayLogClose";

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

export const delete_job_by_ids = (deleteJobs) => {
    return {
        type: DELETE_JOB_BY_IDS,
        deleteJobs: deleteJobs
    }
}

export const findJobs = (job) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/jobManagerController/findJobs',
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
            url: '/api/jobManagerController/saveJob',
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

export const updateJobModalShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行')
        }else{
            dispatch(update_job_modal_show(selectRows[0].id))
        }
    }
}

export const updateJobModalSure = (job) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/jobManagerController/updateJob',
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

export const deleteJob = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行')
        }else{
            let ids = []
            selectRows.map(row => ids.push(row.id))
            axios({
                method: 'post',
                url: '/api/jobManagerController/deleteJobByIds',
                data: ids
            }).then((response) => {
                return response.data
            }).then((list) => {
                dispatch(delete_job_by_ids(list))
            })
        }
    }
}

export const displayLogShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行')
        }else{
            dispatch(display_log_show(selectRows[0].id))
        }
    }
}

export const displayLogClose = () => {
    return (dispatch) => {
        dispatch(display_log_close())
    }
}
