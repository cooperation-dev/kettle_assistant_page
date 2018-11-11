import '../../../mock/api';
import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_USERS = "userManager/findUsers";
//新增显示
export const ADD_USER_MODAL_SHOW = "userManager/addUserShow"
//新增取消
export const ADD_USER_MODAL_CANCEL = "userManager/addUserCancel"
//新增确认
export const ADD_USER_MODAL_SURE = "userManager/addUserSure"
//修改显示
export const UPDATE_USER_MODAL_SHOW = "userManager/updateUserShow"
//修改取消
export const UPDATE_USER_MODAL_CANCEL = "userManager/updateUserCancel"
//修改确认
export const UPDATE_USER_MODAL_SURE = "userManager/updateUserSure"

export const find_users = (list) => {
    return {
        type: FIND_USERS,
        list: list
    }
}

export const add_user_modal_show = () => {
    return {
        type: ADD_USER_MODAL_SHOW
    }
}

export const add_user_modal_cancel = () => {
    return {
        type: ADD_USER_MODAL_CANCEL
    }
}

export const add_user_modal_sure = (user) => {
    return {
        type: ADD_USER_MODAL_SURE,
        user: user
    }
}

export const update_user_modal_show = (row) => {
    return {
        type: UPDATE_USER_MODAL_SHOW,
        user: row
    }
}

export const update_user_modal_cancel = () => {
    return {
        type: UPDATE_USER_MODAL_CANCEL
    }
}

export const update_user_modal_sure = () => {
    return {
        type: UPDATE_USER_MODAL_SURE
    }
}

export const findUsers = () => {
    return (dispatch) => {
        axios.post(FIND_USERS)
        .then((response) => {
            return response.data.list
        })
        .then((list) => {
            dispatch(find_users(list))
        })
    }
}

export const addUserShow = () => {
    return (dispatch) => {
        dispatch(add_user_modal_show());
    }
}

export const addUserCancel = () => {
    return (dispatch) => {
        dispatch(add_user_modal_cancel());
    }
}

export const addUserSure = () => {
    return (dispatch) => {
        dispatch(add_user_modal_sure());
    }
}

export const updateUserShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行!')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行!')
        }else {
            dispatch(update_user_modal_show(selectRows[0]));
        }
    }
}

export const updateUserCancel = () => {
    return (dispatch) => {
        dispatch(update_user_modal_cancel());
    }
}

export const updateUserSure = () => {
    return (dispatch) => {
        dispatch(update_user_modal_sure());
    }
}