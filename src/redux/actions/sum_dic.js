import axios from 'axios';
import {message} from 'antd';

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
//删除行
export const DELETE_DIC_BY_IDS = "sumDic/deleteDicByIds"
export const CHANGE_DISABLED = "sumDic/changeDisabled";

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

export const update_modal_sure = (dic) => {
    return {
        type: UPADTE_MODAL_SURE,
        dic
    }
}

export const update_modal_cancel = () => {
    return {
        type: UPDATE_MODAL_CANCEL
    }
}

export const delete_dic_by_ids = (deleteDics) => {
    return {
        type: DELETE_DIC_BY_IDS,
        deleteDics: deleteDics
    }
}

export const change_disabled = (row) => {
    return {
        type: CHANGE_DISABLED,
        row: row
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
        if(selectRows.length == 0){
            message.error('请选择行')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行')
        }else{
            dispatch(update_modal_show(selectRows[0].id))
        }
    }
}

export const updateModalSure = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/updateDic',
            data: dic
        }).then((response) => {
            return response.data
        }).then((data) => {
            dispatch(update_modal_sure(data))
        })
    }
}

export const updateModalCancel = () => {
    return (dispatch) => {
        dispatch(update_modal_cancel())
    }
}

export const deleteDicByIds = (selectRows) => { 
    if(selectRows.length == 0){
        message.error('请选择行')
    }else{
        return (dispatch) => {
            let ids = []
            selectRows.map(row => ids.push(row.id))
            axios({
                method: 'post',
                url: '/api/sumDicController/deleteDicByIds',
                data: ids
            }).then((r) => {
                return r.data
            }).then((list) => {
                dispatch(delete_dic_by_ids(list))
            })
        }
    }
}

export const changeDisabled = (row) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/changeDisabled',
            data: row
        }).then((r) => {
            return r.data
        }).then(d => {
            dispatch(change_disabled(d))
        }) 
    }
}