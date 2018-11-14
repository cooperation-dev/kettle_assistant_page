import '../../../mock/api';
import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_MENUS = "menuManager/findList"
//新增显示
export const ADD_MENU_MODAL_SHOW = "menuManager/addMenuShow"
//新增取消
export const ADD_MENU_MODAL_CANCEL = "menuManager/addMenuCancel"
//新增确认
export const ADD_MENU_MODAL_SURE = "menuManager/addMenuSure"
//修改显示
export const UPDATE_MENU_MODAL_SHOW = "menuManager/updateMenuShow"
//修改取消
export const UPDATE_MENU_MODAL_CANCEL = "menuManager/updateMenuCancel"
//修改确认
export const UPDATE_MENU_MODAL_SURE = "menuManager/updateMenuSure"
//修改Modal名称
export const CHANGE_MODAL_TITLE = "menuManager/changeModalTitle"
//修改Modal类型
export const CHANGE_MODAL_TYPE = "menuManager/changeModalType"
//修改Modal编码
export const CHANGE_MODAL_KEY = "menuManager/changeModalKey"
//修改Modal序号
export const CHANGE_MODAL_LEVEL = "menuManager/changeModalLevel"
//修改Modal父节点
export const CHANGE_MODAL_PARENT_KEY = "menuManager/changeModalParentKey"
//修改过滤条件
export const CHANGE_MODAL_FILTER_CONDITION = "menuManager/changeModalFilterCondition"
//修改Modal自定义功能
export const CHANGE_MODAL_CUSTOM_FUNC = "menuManager/changeModalCustomFunc"

export const find_menus = (list) => {
    return {
        type: FIND_MENUS,
        list: list
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

export const update_menu_modal_sure = () => {
    return {
        type: UPDATE_MENU_MODAL_SURE
    }
}

export const change_modal_title = (title) => {
    return {
        type: CHANGE_MODAL_TITLE,
        title: title
    }
}

export const change_modal_type = (type) => {
    return {
        type: CHANGE_MODAL_TYPE,
        menuType: type
    }
}

export const change_modal_key = (key) => {
    return {
        type: CHANGE_MODAL_KEY,
        key: key
    }
}

export const change_modal_level = (level) => {
    return {
        type: CHANGE_MODAL_LEVEL,
        level: level
    }
}

export const change_modal_parent_key = (parentKey) => {
    return {
        type: CHANGE_MODAL_PARENT_KEY,
        parentKey: parentKey
    }
}

export const change_modal_filter_condition = (filterCondition) => {
    return {
        type: CHANGE_MODAL_FILTER_CONDITION,
        filterCondition: filterCondition
    }
}

export const change_modal_custom_func = (customFunc) => {
    return {
        type: CHANGE_MODAL_CUSTOM_FUNC,
        customFunc: customFunc
    }
}

export const findMenus = () => {
    return (dispatch) => {
        axios.post(FIND_MENUS)
                .then((response) => {
                    return response.data.list
                })
                .then((list) => {
                    dispatch(find_menus(list))
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

export const addMenuSure = () => {
    return (dispatch) => {
        dispatch(add_menu_modal_sure());
    }
}

export const deleteMenu = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map((row) => ids.push(row.id))
        axios({
            method: 'post',
            url: '',
            data: ids
        }).then((res) => {
            return res.data.list
        }).then((list) => {
            dispatch(find_menus(list))
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

export const updateMenuSure = () => {
    return (dispatch) => {
        dispatch(update_menu_modal_sure());
    }
}

export const changeModalTitle = (event) => {
    return (dispatch) => {
        dispatch(change_modal_title(event.target.value))
    }
}

export const changeModalType = (event) => {
    return (dispatch) => {
        dispatch(change_modal_type(event.target.value))
    }
}

export const changeModalKey = (event) => {
    return (dispatch) => {
        dispatch(change_modal_key(event.target.value))
    }
}

export const changeModalLevel = (event) => {
    return (dispatch) => {
        dispatch(change_modal_level(event.target.value))
    }
}

export const changeModalParentKey = (event) => {
    return (dispatch) => {
        dispatch(change_modal_parent_key(event.target.value))
    }
}

export const changeModalFilterCondition = (event) => {
    return (dispatch) => {
        dispatch(change_modal_filter_condition(event.target.value))
    }
}

export const changeModalCustomFunc = (event) => {
    return (dispatch) => {
        dispatch(change_modal_custom_func(event.target.value))
    }
}