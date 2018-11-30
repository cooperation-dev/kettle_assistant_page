import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_ROLES = "/api/roleController/findList";
//新增显示
export const ADD_ROLE_MODAL_SHOW = "roleManager/addRoleShow";
//新增取消
export const ADD_ROLE_MODAL_CANCEL = "roleManager/addRoleCancel";
//新增确认
export const ADD_ROLE_MODAL_SURE = "/api/roleController/saveRole";
//修改显示
export const UPDATE_ROLE_MODAL_SHOW = "roleManager/updateRoleShow";
//修改取消
export const UPDATE_ROLE_MODAL_CANCEL = "roleManager/updateRoleCancel";
//修改确认
export const UPDATE_ROLE_MODAL_SURE = "/api/roleController/updateRole";
//删除行
export const DELETE_ROLES_BY_IDS = "/api/roleController/deleteRoleByIds";
//角色菜單權限
export const FIND_PRIVILEGES = "/api/roleController/findPrivileges";
//关闭权限窗口
export const CLOSE_PRIVILEGE_MODAL = "roleManager/closePrivilegeModal"
//确定权限
export const SURE_PRIVILEGE_MODAL = "/api/roleController/saveRolePrivilege"

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

export const update_role_modal_sure = (role) => {
    return {
        type: UPDATE_ROLE_MODAL_SURE,
        role: role
    }
}

export const delete_roles_by_ids = (deleteIds) => {
    return {
        type: DELETE_ROLES_BY_IDS,
        deleteIds: deleteIds,
    }
}

export const find_privileges = (privileges) => {
    return {
        type: FIND_PRIVILEGES,
        privileges: privileges
    }
}

export const close_privilege_modal = () => {
    return {
        type: CLOSE_PRIVILEGE_MODAL,
    }
}

export const sure_privilege_modal = (role) => {
    return {
        type: SURE_PRIVILEGE_MODAL,
        role: role,
    }
}

export const findRoles = (role) => {
    return(dispatch) => {
        axios({
            method: 'post',
            url: FIND_ROLES,
            data: role,
        }).then((res) => {
            return res.data.data
        }).then((list) => {
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

export const addRoleSure = (role) => {
    return (dispatch) => {
        axios({
            method:'post',
            url: ADD_ROLE_MODAL_SURE,
            data:role
        }).then((res) => {
            return res.data.data
        }).then((role) => {
            dispatch(add_role_modal_sure(role));
        })
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

export const updateRoleSure = (role) => {
    return (dispatch) => {
        axios({
            method:'post',
            url: UPDATE_ROLE_MODAL_SURE,
            data: role
        }).then((res) => {
            return res.data.data
        }).then((role) => {
            dispatch(update_role_modal_sure(role));
        })
    }
}

export const deleteRolesByIds = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map(row => ids.push(row.id))
        axios({
            method: 'post',
            url: DELETE_ROLES_BY_IDS,
            data:ids
        }).then((res) => {
            return res.data.data
        }).then((deleteIds) => {
            dispatch(delete_roles_by_ids(deleteIds))
        })
    }
}

export const findPrivileges = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error("请选择行!")
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行!')
        }else {
            axios({
                method: 'get',
                url: FIND_PRIVILEGES,
            }).then((res) => {
                return res.data.data
            }).then((privileges) => {
                dispatch(find_privileges(privileges));
            })
        }
    }
}

export const closePrivilegeModal = () => {
    return (dispatch) => {
        dispatch(close_privilege_modal())
    }
}

export const surePrivilegeModal = (privilegeKeys) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: SURE_PRIVILEGE_MODAL,
            data: privilegeKeys,
        }).then((res) => {
            return res.data.data
        }).then((role) => {
            dispatch(sure_privilege_modal(role))
        })
    }
}