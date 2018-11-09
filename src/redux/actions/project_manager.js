import '../../../mock/api';
import axios from 'axios';

//请求数据
export const FIND_PROJECTS = "projectManager/findProjects";
//新增显示
export const ADD_PROJECT_MODAL_SHOW = "projectManager/addProjectShow"
//新增取消
export const ADD_PROJECT_MODAL_CANCEL = "projectManager/addProjectCancel"
//新增确认
export const ADD_PROJECT_MODAL_SURE = "projectManager/addProjectSure"
//修改显示
export const UPDATE_PROJECT_MODAL_SHOW = "projectManager/updateProjectShow"
//修改取消
export const UPDATE_PROJECT_MODAL_CANCEL = "projectManager/updateProjectCancel"
//修改确认
export const UPDATE_PROJECT_MODAL_SURE = "projectManager/updateProjectSure"

export const find_projects = (list) => {
    return {
        type: FIND_PROJECTS,
        list: list
    }
}

export const add_project_modal_show = () => {
    return {
        type: ADD_PROJECT_MODAL_SHOW
    }
}

export const add_project_modal_cancel = () => {
    return {
        type: ADD_PROJECT_MODAL_CANCEL
    }
}

export const add_project_modal_sure = () => {
    return {
        type: ADD_PROJECT_MODAL_SURE
    }
}

export const update_project_modal_show = () => {
    return {
        type: UPDATE_PROJECT_MODAL_SHOW
    }
}

export const update_project_modal_cancel = () => {
    return {
        type: UPDATE_PROJECT_MODAL_CANCEL
    }
}

export const update_project_modal_sure = () => {
    return {
        type: UPDATE_PROJECT_MODAL_SURE
    }
}

export const findProjects = () => {
    return (dispatch) => {
        axios.post(FIND_PROJECTS)
            .then((response) => {
                return response.data.list
            })
            .then((list) => {
                dispatch(find_projects(list))
            })
    }
}

export const addProjectShow = () => {
    return (dispatch) => {
        dispatch(add_project_modal_show());
    }
}

export const addProjectCancel = () => {
    return (dispatch) => {
        dispatch(add_project_modal_cancel());
    }
}

export const addProjectSure = () => {
    return (dispatch) => {
        dispatch(add_project_modal_sure());
    }
}

export const updateProjectShow = () => {
    return (dispatch) => {
        dispatch(update_project_modal_show());
    }
}

export const updateProjectCancel = () => {
    return (dispatch) => {
        dispatch(update_project_modal_cancel());
    }
}

export const updateProjectSure = () => {
    return (dispatch) => {
        dispatch(update_project_modal_sure());
    }
}