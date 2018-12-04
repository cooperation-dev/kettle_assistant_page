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
//显示细节窗口
export const DETAILS_MODAL_SHOW = "sumDic/detailsModalShow"
//细节窗口确认
export const DETAILS_MODAL_SURE = "sumDic/detailsModalSure"
//细节窗口取消
export const DETAILS_MODAL_CANCEL = "sumDic/detailsModalCancel"

export const show_list = (data) => {
    return {
        type: SHOW_LIST,
        list: data.data,
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

export const showList = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/showList',
            data: dic
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

export const addModalSure = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/saveDic',
            data: dic
        }).then(r => {return r.data.data})
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
                return r.data.data
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