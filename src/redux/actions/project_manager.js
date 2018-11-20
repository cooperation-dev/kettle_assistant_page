import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_PROJECTS = "projectManager/findProjects";
//新增显示
export const ADD_PROJECT_MODAL_SHOW = 'projectManager/addProjectShow';
//新增取消
export const ADD_PROJECT_MODAL_CANCEL = 'projectManager/addProjectCancel';
//新增确认
export const ADD_PROJECT_MODAL_SURE = 'projectManager/addProjectSure';
//修改显示
export const UPDATE_PROJECT_MODAL_SHOW = 'projectManager/updateProjectShow';
//修改取消
export const UPDATE_PROJECT_MODAL_CANCEL = 'projectManager/updateProjectCancel';
//修改确认
export const UPDATE_PROJECT_MODAL_SURE = 'projectManager/updateProjectSure';
//删除行
export const DELETE_PROJECTS_BY_IDS = 'projectManager/deleteProjectsByIds';

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

export const add_project_modal_sure = (project) => {
    return {
        type: ADD_PROJECT_MODAL_SURE,
        project: project
    }
}

export const update_project_modal_show = (row) => {
    return {
        type: UPDATE_PROJECT_MODAL_SHOW,
        project: row
    }
}

export const update_project_modal_cancel = () => {
    return {
        type: UPDATE_PROJECT_MODAL_CANCEL
    }
}

export const update_project_modal_sure = (project) => {
    return {
        type: UPDATE_PROJECT_MODAL_SURE,
        project: project
    }
}

export const delete_projects_by_ids = (deleteIds) => {
    return {
        type: DELETE_PROJECTS_BY_IDS,
        deleteIds: deleteIds,
    }
}

export const findProjects = (project) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: FIND_PROJECTS,
            data: project,
        }).then((res) => {
            return res.data
        }).then((list) => {
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

export const addProjectSure = (project) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: ADD_PROJECT_MODAL_SURE,
            data: project
        }).then((res) => {
            return res.data
        }).then((project) => {
            dispatch(add_project_modal_sure(project));
        })
    }
}

export const updateProjectShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行!')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行!')
        }else {
            dispatch(update_project_modal_show(selectRows[0]));
        }
    }
}

export const updateProjectCancel = () => {
    return (dispatch) => {
        dispatch(update_project_modal_cancel());
    }
}

export const updateProjectSure = (project) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: UPDATE_PROJECT_MODAL_SURE,
            data: project
        }).then((res) => {
            return res.data
        }).then((project) => {
            dispatch(update_project_modal_sure(project));  
        })
    }
}

export const deleteProjectsByIds = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map((row) => ids.push(row.id))
        axios({
            method: 'post',
            url: DELETE_PROJECTS_BY_IDS,
            data: ids
        }).then((res) => {
            return res.data
        }).then((deleteIds) => {
            dispatch(delete_projects_by_ids(deleteIds))
        })
    }
}