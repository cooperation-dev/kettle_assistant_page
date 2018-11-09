import '../../../mock/api';
import axios from 'axios';

//请求数据
export const FIND_ROLES = "roleManager/findRoles";
//新增显示
export const ADD_ROLE_MODAL_SHOW = "projectManager/addProjectShow"
//新增取消
export const ADD_ROLE_MODAL_CANCEL = "projectManager/addProjectCancel"
//新增确认
export const ADD_ROLE_MODAL_SURE = "projectManager/addProjectSure"
//修改显示
export const UPDATE_ROLE_MODAL_SHOW = "projectManager/updateProjectShow"
//修改取消
export const UPDATE_ROLE_MODAL_CANCEL = "projectManager/updateProjectCancel"
//修改确认
export const UPDATE_ROLE_MODAL_SURE = "projectManager/updateProjectSure"

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

export const add_role_modal_sure = () => {
    return {
        type: ADD_ROLE_MODAL_SURE
    }
}

export const update_role_modal_show = () => {
    return {
        type: UPDATE_ROLE_MODAL_SHOW
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

export const updateRoleShow = () => {
    return (dispatch) => {
        dispatch(update_role_modal_show());
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