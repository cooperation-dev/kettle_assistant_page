import '../../../mock/api';
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
//查看运行日志
export const DISPLAY_LOG_SHOW = "jobManager/displayLogShow";
export const DISPLAY_LOG_CLOSE = "jobManager/displayLogClose";
//作业类型下拉框
export const FIND_JOB_TYPES = "jobManager/findJobTypes";

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

export const update_job_modal_show = (row) => {
    return {
        type: UPDATE_JOB_MODAL_SHOW,
        job: row,
    }
}

export const update_job_modal_sure = () => {
    return {
        type: UPDATE_JOB_MODAL_SURE
    }
}

export const update_job_modal_cancel = () => {
    return {
        type: UPDATE_JOB_MODAL_CANCEL
    }
}

export const display_log_show = (row) => {
    return {
        type: DISPLAY_LOG_SHOW,
        job: row
    }
}

export const display_log_close = () => {
    return {
        type: DISPLAY_LOG_CLOSE,
    }
}

export const find_job_types = (list) => {
    return {
        type: FIND_JOB_TYPES,
        list: list
    }
}

export const modal_change_job_name = (job_name) => {
    return {
        type: MODAL_CHANGE_JOB_NAME,
        job_name: job_name
    }
}

export const modal_change_job_desc = (job_desc) => {
    return {
        type: MODAL_CHANGE_JOB_DESC,
        job_desc: job_desc
    }
}

export const findJobs = () => {
    return (dispatch) => {
        axios.post('findJobs')
                .then((response) => {
                    return response.data.list
                })
                .then((list) => {
                    dispatch(find_jobs(list))
                })
    }
}

export const addJobModalShow = () => {
    return (dispatch) => {
        dispatch(add_job_modal_show())

        axios.post('jobManagerController/findJobTypes')
        .then((response) => {
            return response.data.list
        }).then((list) => {
            dispatch(find_job_types(list))
        })

    }
}

export const addJobModalSure = (job_name, job_desc) => {
    return (dispatch) => {
        axios.post('jobManager/saveJob')
            .then((response) => {
                return response.data.job
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
            axios.post('jobManagerController/findJobById/'+selectRows[0].job_id)
                .then((response) => {
                    return response.data.job
                }).then((data) => {
                    dispatch(update_job_modal_show(data))
                })
            // dispatch(update_job_modal_show(selectRows[0]))
        }
    }
}

export const updateJobModalSure = () => {
    return (dispatch) => {
        dispatch(update_job_modal_sure())
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
            axios.post('jobManagerController/deleteJobById', {
                job_id: selectRows[0].job_id
            }).then((response) => {
                return response.data.list
            }).then((list) => {
                dispatch(find_jobs(list))
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
            const id = selectRows[0].job_id;
            axios.post('jobManagerController/findJobById/'+id)
                .then((response) => {
                    return response.data.job
                }).then((data) => {
                    dispatch(display_log_show(data))
                })
        }
    }
}

export const displayLogClose = () => {
    return (dispatch) => {
        dispatch(display_log_close())
    }
}

export const findJobTypes = () => {
    return (dispatch) => {
        axios.post('jobManagerController/findJobTypes')
            .then((response) => {
                return response.data.list
            }).then((list) => {
                dispatch(find_job_types(list))
            })
    }
}
