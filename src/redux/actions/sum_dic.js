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
//显示修改窗口
export const UPDATE_MODAL_SHOW = "sumDic/updateModalShow"
//修改窗口确认按钮
export const UPADTE_MODAL_SURE = "sumDic/updateModalSure"
//修改窗口取消按钮
export const UPDATE_MODAL_CANCEL = "sumDic/updateModalCancel"

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

export const add_modal_sure = (dic) => {
    return {
        type: ADD_MODAL_SURE,
        dic: dic
    }
}

export const add_modal_cancel = () => {
    return {
        type: ADD_MODAL_CANCEL
    }
}

export const update_modal_show = (id) => {
    return {
        type: UPDATE_MODAL_SHOW,
        updateId: id
    }
}

export const update_modal_sure = () => {
    return {
        type: UPADTE_MODAL_SURE
    }
}

export const update_modal_cancel = () => {
    return {
        type: UPDATE_MODAL_CANCEL
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

export const addModalSure = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/saveDic',
            data: dic
        }).then(r => {return r.data})
            .then(dic => dispatch(add_modal_sure(dic)))

    }
}

export const addModalCancel = () => {
    return (dispatch) => {
        dispatch(add_modal_cancel())
    }
}

export const updateModalShow = (selectRows) => {
    return (dispatch) => {
        dispatch(update_modal_show(selectRows[0].id))
    }
}

export const updateModalSure = () => {
    return (dispatch) => {
        dispatch(update_modal_sure())
    }
}

export const updateModalCancel = () => {
    return (dispatch) => {
        dispatch(update_modal_cancel())
    }
}