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