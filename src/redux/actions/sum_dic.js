import axios from 'axios';
import {message} from 'antd';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//渲染字典列表
export const SHOW_LIST = "sumDic/showList"
//新增窗口
export const ADD_MODAL_SHOW = "sumDic/addModalShow"
export const ADD_MODAL_SURE = "sumDic/addModalSure"
export const ADD_MODAL_CANCEL = "sumDic/addModalCancel"

//修改窗口
export const UPDATE_MODAL_SHOW = "sumDic/updateModalShow"
export const UPADTE_MODAL_SURE = "sumDic/updateModalSure"
export const UPDATE_MODAL_CANCEL = "sumDic/updateModalCancel"

//删除行
export const DELETE_DIC_BY_IDS = "sumDic/deleteByIds"
export const CHANGE_DISABLED = "sumDic/changeDisabled";

//显示细节窗口
export const DETAILS_MODAL_SHOW = "sumDic/detailsModalShow"
//细节窗口确认
export const DETAILS_MODAL_SURE = "sumDic/detailsModalSure"
//细节窗口取消
export const DETAILS_MODAL_CANCEL = "sumDic/detailsModalCancel"

export const show_list = (data) => {
    return {
        type: SHOW_LIST,
        list: data,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        total: data.total
    }
}

export const add_modal_show = () => {
    return {
        type: ADD_MODAL_SHOW
    }
}

export const add_modal_sure = (data) => {
    return {
        type: ADD_MODAL_SURE,
        dic: data
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

export const delete_dic_by_ids = (id) => {
    return {
        type: DELETE_DIC_BY_IDS,
        id: id
    }
}

export const change_disabled = (row) => {
    return {
        type: CHANGE_DISABLED,
        row: row
    }
}

export const details_modal_show = (data) => {
    return {
        type: DETAILS_MODAL_SHOW,
        data: data
    }
}

export const details_modal_sure = () => {
    return {
        type: DETAILS_MODAL_SURE
    }
}

export const details_modal_cancel = () => {
    return {
        type: DETAILS_MODAL_CANCEL
    }
}

export const showList = (dicReqVO) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/dicService/v1/dics',
            data: dicReqVO
        }).then((r) => {
            return r.data.data
        }).then((data) => {
            dispatch(show_list(data))
        })
    }
}

export const addModalShow = () => {
    return (dispatch) => {
        dispatch(add_modal_show())
    }
}

export const addModalSure = (dicReqVO) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/dicService/v1/dic',
            data: dicReqVO
        }).then(response => {return response.data.data})
            .then(data => dispatch(add_modal_sure(data)))

    }
}

export const addModalCancel = () => {
    return (dispatch) => {
        dispatch(add_modal_cancel())
    }
}

export const updateModalShow = (id) => {
    return (dispatch) => {
        dispatch(update_modal_show(id))
    }
}

export const updateModalSure = (dicReqVO, dic_id) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: '/dicService/v1/dic/'+dic_id,
            data: dicReqVO
        }).then((response) => {
            return response.data.data
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

export const deleteDicByIds = (id) => { 
    return (dispatch) => {
        axios({
            method: 'delete',
            url: '/dicService/v1/dic/'+id,
        }).then((r) => {
            return r.data.data
        }).then((id) => {
            dispatch(delete_dic_by_ids(id))
        })
    }
}

export const changeDisabled = (row) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/changeDisabled',
            data: row
        }).then((r) => {
            return r.data.data
        }).then(d => {
            dispatch(change_disabled(d))
        }) 
    }
}

export const detailsModalShow = () => {
    return (dispatch) => {
        axios.get('/api/sumDicController/findDicTypes')
                .then(r => 
                    {
                        let children = []
                        r.data.data.map(d => children.push(d))
                        let data = {
                            children: children
                        }
                        return [data]
                    })
                .then(data => {
                    dispatch(details_modal_show(data))
                })

    }
}

export const detailsModalSure = () => {
    return (dispatch) => {
        dispatch(details_modal_sure())
    }
}

export const detailsModalCancel = () => {
    return (dispatch) => {
        dispatch(details_modal_cancel())
    }
}