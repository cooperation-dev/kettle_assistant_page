import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_MENUS = "/api/privilegeController/findList"
//请求父级菜单
export const FIND_PARENTS = "/api/privilegeController/findParents"
//请求图标
export const FIND_ICONS = "/api/privilegeController/findIcons"
//请求类型
export const FIND_TYPES = "/api/privilegeController/findTypes"
//新增显示
export const ADD_MENU_MODAL_SHOW = "menuManager/addMenuShow"
//新增取消
export const ADD_MENU_MODAL_CANCEL = "menuManager/addMenuCancel"
//新增确认
export const ADD_MENU_MODAL_SURE = "/api/privilegeController/savePrivilege"
//修改显示
export const UPDATE_MENU_MODAL_SHOW = "menuManager/updateMenuShow"
//修改取消
export const UPDATE_MENU_MODAL_CANCEL = "menuManager/updateMenuCancel"
//修改确认
export const UPDATE_MENU_MODAL_SURE = "/api/privilegeController/updatePrivilege"
//删除行
export const DELETE_MENUS_BY_IDS = "/api/privilegeController/deletePrivilege"

export const find_menus = (list) => {
    return {
        type: FIND_MENUS,
        list: list
    }
}

export const find_parents = (parents) => {
    return {
        type: FIND_PARENTS,
        parents: parents
    }
}

export const find_icons = (icons) => {
    return {
        type: FIND_ICONS,
        icons: icons,
    }
}

export const find_types = (types) => {
    return {
        type: FIND_TYPES,
        types: types,
    }
}

export const add_menu_modal_show = () => {
    return {
        type: ADD_MENU_MODAL_SHOW
    }
}

export const add_menu_modal_cancel = () => {
    return {
        type: ADD_MENU_MODAL_CANCEL
    }
}

export const add_menu_modal_sure = (menu) => {
    return {
        type: ADD_MENU_MODAL_SURE,
        menu: menu
    }
}

export const update_menu_modal_show = (row) => {
    return {
        type: UPDATE_MENU_MODAL_SHOW,
        menu: row
    }
}

export const update_menu_modal_cancel = () => {
    return {
        type: UPDATE_MENU_MODAL_CANCEL
    }
}

export const update_menu_modal_sure = (menu) => {
    return {
        type: UPDATE_MENU_MODAL_SURE,
        menu: menu,
    }
}

export const delete_menus_by_ids = (deleteIds) => {
    return {
        type: DELETE_MENUS_BY_IDS,
        deleteIds: deleteIds
    }
}

export const findMenus = () => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: FIND_MENUS,
        }).then((response) => {
            return response.data.data
        })
        .then((list) => {
            dispatch(find_menus(list))
        })
    }
}

export const findParents = () => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: FIND_PARENTS,
        }).then((res) => {
            return res.data.data
        }).then((parents) => {
            dispatch(find_parents(parents))
        })
    }
}

export const findIcons = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: FIND_ICONS,
        }).then((res) => {
            return res.data.data
        }).then((icons) => {
            dispatch(find_icons(icons))
        })
    }
}

export const findTypes = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: FIND_TYPES,
        }).then((res) => {
            return res.data.data
        }).then((types) => {
            dispatch(find_types(types))
        })
    }
}

export const addMenuShow = () => {
    return (dispatch) => {
        dispatch(add_menu_modal_show());
    }
}

export const addMenuCancel = () => {
    return (dispatch) => {
        dispatch(add_menu_modal_cancel());
    }
}

export const addMenuSure = (menu) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: ADD_MENU_MODAL_SURE,
            data: menu
        }).then((res) => {
            return res.data.data
        }).then((menu) => {
            dispatch(add_menu_modal_sure(menu));
        })
    }
}

export const updateMenuShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行!')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行!')
        }else {
            dispatch(update_menu_modal_show(selectRows[0]));
        }
    }
}

export const updateMenuCancel = () => {
    return (dispatch) => {
        dispatch(update_menu_modal_cancel());
    }
}

export const updateMenuSure = (menu) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: UPDATE_MENU_MODAL_SURE,
            data: menu,
        }).then((res) => {
            return res.data.data
        }).then((menu) => {
            dispatch(update_menu_modal_sure(menu));  
        })
    }
}

export const deleteMenusByIds = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map((row) => ids.push(row.id))
        axios({
            method: 'delete',
            url: DELETE_MENUS_BY_IDS,
            data: ids
        }).then((res) => {
            return res.data.data
        }).then((deleteIds) => {
            dispatch(delete_menus_by_ids(deleteIds))
        })
    }
}