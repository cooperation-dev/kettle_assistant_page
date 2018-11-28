import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_USERS = "/api/userController/findList";
//請求角色列表
export const FIND_ROLES = "/api/roleController/userFindRoles"
//新增显示
export const ADD_USER_MODAL_SHOW = "/userManager/addUserShow";
//新增取消
export const ADD_USER_MODAL_CANCEL = "/userManager/addUserCancel";
//新增确认
export const ADD_USER_MODAL_SURE = "/api/userController/saveUser";
//修改显示
export const UPDATE_USER_MODAL_SHOW = "/userManager/updateUserShow";
//修改取消
export const UPDATE_USER_MODAL_CANCEL = "/userManager/updateUserCancel";
//修改确认
export const UPDATE_USER_MODAL_SURE = "/api/userController/updateUser";
//删除行
export const DELETE_USERS_BY_IDS = "/api/userController/deleteUserByIds";

export const find_users = (list) => {
    return {
        type: FIND_USERS,
        list: list
    }
}

export const find_roles = (list) => {
    return {
        type: FIND_ROLES,
        roles: list
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

export const update_user_modal_sure = (user) => {
    return {
        type: UPDATE_USER_MODAL_SURE,
        user:user
    }
}

export const delete_users_by_ids = (deleteIds) => {
    return {
        type: DELETE_USERS_BY_IDS,
        deleteIds: deleteIds,
    }
}

export const findUsers = (user) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: FIND_USERS,
            data: user,
        }).then((res) => {
            return res.data.data
        }).then((list) => {
            dispatch(find_users(list))
        })
    }
}

export const findRoles = (user) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: FIND_ROLES,
            data: user,
        }).then((res) => {
            return res.data.data
        }).then((list) => {
            dispatch(find_roles(list))
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

export const addUserSure = (user) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: ADD_USER_MODAL_SURE,
            data: user
        }).then((res) => {
            return res.data.data
        }).then((user) => {
            dispatch(add_user_modal_sure(user));
        })
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

export const updateUserSure = (user) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: UPDATE_USER_MODAL_SURE,
            data: user
        }).then((res) => {
            return res.data.data
        }).then((user) => {
            dispatch(update_user_modal_sure(user));
        })
    }
}

export const deleteUsersByIds = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map((row) => ids.push(row.id))
        axios({
            method: 'post',
            url: DELETE_USERS_BY_IDS,
            data: ids
        }).then((res) => {
            return res.data.data
        }).then((deleteIds) => {
            dispatch(delete_users_by_ids(deleteIds))
        })
    }
}