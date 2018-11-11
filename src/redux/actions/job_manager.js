// import '../../../mock/api';
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
//修改弹出框名称
export const CHANGE_MODAL_NAME = 'jobManager/changeModalName';
//修改弹出框类型
export const CHANGE_MODAL_TYPE = 'jobManager/changeModalType';
//修改弹出框描述
export const CHANGE_MODAL_DESC = 'jobManager/changeModalDesc';

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

export const change_modal_name = (job_name) => {
    return {
        type: CHANGE_MODAL_NAME,
        job_name: job_name
    }
}

export const change_modal_type = (job_type) => {
    return {
        type: CHANGE_MODAL_TYPE,
        job_type: job_type
    }
}

export const change_modal_desc = (job_desc) => {
    return {
        type: CHANGE_MODAL_DESC,
        job_desc: job_desc
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

        axios.post('jobManagerController/findJobTypes')
        .then((response) => {
            return response.data
        }).then((list) => {
            dispatch(find_job_types(list))
        })

    }
}

export const addJobModalSure = (job) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: 'jobManager/saveJob',
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
            axios.post('jobManagerController/findJobById/'+selectRows[0].job_id)
                .then((response) => {
                    return response.data
                }).then((data) => {
                    dispatch(update_job_modal_show(data))
                })
        }
    }
}

export const updateJobModalSure = (job) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: 'jobManagerController/updateJob',
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
            selectRows.map(row => ids.push(row.job_id))
            axios({
                method: 'post',
                url: 'jobManagerController/deleteJobByIds',
                data: ids
            }).then((response) => {
                return response.data
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
                    return response.data
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
                return response.data
            }).then((list) => {
                dispatch(find_job_types(list))
            })
    }
}

export const changeModalName = (e) => {
    return (dispatch) => {
        dispatch(change_modal_name(e.target.value))
    }
}

export const changeModalType = (e) => {
    return (dispatch) => {
        dispatch(change_modal_type(e))
    }
}

export const changeModalDesc = (e) => {
    return (dispatch) => {
        dispatch(change_modal_desc(e.target.value))
    }
}