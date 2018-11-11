import '../../../mock/api';
import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_ROLES = "roleManager/findRoles";
//新增显示
export const ADD_ROLE_MODAL_SHOW = "roleManager/addRoleShow"
//新增取消
export const ADD_ROLE_MODAL_CANCEL = "roleManager/addRoleCancel"
//新增确认
export const ADD_ROLE_MODAL_SURE = "roleManager/addRoleSure"
//修改显示
export const UPDATE_ROLE_MODAL_SHOW = "roleManager/updateRoleShow"
//修改取消
export const UPDATE_ROLE_MODAL_CANCEL = "roleManager/updateRoleCancel"
//修改确认
export const UPDATE_ROLE_MODAL_SURE = "roleManager/updateRoleSure"

export const find_roles = (list) => {
    return {
        type: FIND_ROLES,
        list: list
    }
}

export const add_role_modal_show = () => {
    return {
        type: ADD_ROLE_MODAL_SHOW
    }
}

export const add_role_modal_cancel = () => {
    return {
        type: ADD_ROLE_MODAL_CANCEL
    }
}

export const add_role_modal_sure = (role) => {
    return {
        type: ADD_ROLE_MODAL_SURE,
        role: role
    }
}

export const update_role_modal_show = (row) => {
    return {
        type: UPDATE_ROLE_MODAL_SHOW,
        role: row
    }
}

export const update_role_modal_cancel = () => {
    return {
        type: UPDATE_ROLE_MODAL_CANCEL
    }
}

export const update_role_modal_sure = () => {
    return {
        type: UPDATE_ROLE_MODAL_SURE
    }
}

export const findRoles = () => {
    return(dispatch) => {
        axios.post(FIND_ROLES)
            .then((response) => {
                return response.data.list
            })
            .then((list) => {
                dispatch(find_roles(list))
            })
    }
}

export const addRoleShow = () => {
    return (dispatch) => {
        dispatch(add_role_modal_show());
    }
}

export const addRoleCancel = () => {
    return (dispatch) => {
        dispatch(add_role_modal_cancel());
    }
}

export const addRoleSure = () => {
    return (dispatch) => {
        dispatch(add_role_modal_sure());
    }
}

export const updateRoleShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行!')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行!')
        }else {
            dispatch(update_role_modal_show(selectRows[0]));
        }
    }
}

export const updateRoleCancel = () => {
    return (dispatch) => {
        dispatch(update_role_modal_cancel());
    }
}

export const updateRoleSure = () => {
    return (dispatch) => {
        dispatch(update_role_modal_sure());
    }
}