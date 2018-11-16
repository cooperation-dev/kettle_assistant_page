import '../../../mock/api';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//渲染字典列表
export const SHOW_LIST = "sumDic/showList"
//显示新增窗口
export const ADD_MODAL_SHOW = "sumDic/addModalShow"
//新增窗口确认按钮
export const ADD_MODAL_SURE = "sumDic/addModalSure"
//新增窗口取消按钮
export const ADD_MODAL_CANCEL = "sumDic/addModalCancel"

export const show_list = (list) => {
    return {
        type: SHOW_LIST,
        list: list
    }
}

export const add_modal_show = () => {
    return {
        type: ADD_MODAL_SHOW
    }
}

export const add_modal_sure = () => {
    return {
        type: ADD_MODAL_SURE
    }
}

export const add_modal_cancel = () => {
    return {
        type: ADD_MODAL_CANCEL
    }
}

export const showList = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/showList',
            data: dic
        }).then((r) => {
            return r.data
        }).then((l) => {
            dispatch(show_list(l))
        })
    }
}

export const addModalShow = () => {
    return (dispatch) => {
        dispatch(add_modal_show())
    }
}

export const addModalSure = () => {
    return (dispatch) => {
        dispatch(add_modal_sure())
    }
}

export const addModalCancel = () => {
    return (dispatch) => {
        dispatch(add_modal_cancel())
    }
}


