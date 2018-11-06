import '../../../mock/api';
import axios from 'axios';

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

export const add_job_modal_sure = () => {
    return {
        type: ADD_JOB_MODAL_SURE
    }
}

export const add_job_modal_cancel = () => {
    return {
        type: ADD_JOB_MODAL_CANCEL
    }
}

export const update_job_modal_show = () => {
    return {
        type: UPDATE_JOB_MODAL_SHOW
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
    }
}

export const addJobModalSure = () => {
    return (dispatch) => {
        dispatch(add_job_modal_sure())
    }
}

export const addJobModalCancel = () => {
    return (dispatch) => {
        dispatch(add_job_modal_cancel())
    }
}

export const updateJobModalShow = () => {
    return (dispatch) => {
        dispatch(update_job_modal_show())
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