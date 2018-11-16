// import '../../../mock/api';
import axios from 'axios';
import {message} from 'antd';

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
//修改Modal名称
export const CHANGE_MODAL_NAME = "projectManager/changeModalName"
//修改Modal Url
export const CHANGE_MODAL_PROJECT_URL = "projectManager/changeModalProjectUrl"
//修改Modal排序
export const CHANGE_MODAL_SORT = "projectManager/changeModalSort"

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

export const change_modal_name = (name) => {
    return {
        type: CHANGE_MODAL_NAME,
        name: name
    }
}

export const change_modal_project_url = (projectUrl) => {
    return {
        type: CHANGE_MODAL_PROJECT_URL,
        projectUrl: projectUrl
    }
}

export const change_modal_sort = (sort) => {
    return {
        type: CHANGE_MODAL_SORT,
        sort: sort
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

export const addProjectSure = (project) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: ADD_PROJECT_MODAL_SURE,
            data: project
        }).then((res) => {
            return res.data.project
        }).then((project) => {
            dispatch(add_project_modal_sure(project));
        })
    }
}

export const deleteProject = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map((row) => ids.push(row.id))
        axios({
            method: 'post',
            url: 'projectManager/deleteProjectByIds',
            data: ids
        }).then((res) => {
            return res.data.list
        }).then((list) => {
            dispatch(find_projects(list))
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
            return res.data.project
        }).then((project) => {
            dispatch(update_project_modal_sure(project));  
        })
    }
}

export const changeModalName = (event) => {
    return (dispatch) => {
        dispatch(change_modal_name(event.target.value))
    }
}

export const changeModalProjectUrl = (event) => {
    return (dispatch) => {
        dispatch(change_modal_project_url(event.target.value))
    }
}

export const changeModalSort = (event) => {
    return (dispatch) => {
        dispatch(change_modal_sort(event.target.value))
    }
}