// import '../../../mock/api';
import axios from 'axios';
import {message} from 'antd';

export const SHOW_LIST = "sumDic/showList"
export const CHANGE_DISABLED = "sumDic/changeDisabled"
//新增字典显示
export const ADD_MODAL_SHOW = 'sumDic/addModalShow'
//新增字典确认
export const ADD_MODAL_SURE = 'sumDic/addModalSure'
//新增字典取消
export const ADD_MODAL_CANCEL = 'sumDic/addMoalCancel'
//字典类型
export const FIND_DIC_TYPES = 'sumDic/findDicTypes'
export const CHANGE_MODAL_NAME = "sumDic/changeModalName"
export const CHANGE_MODAL_CODE = "sumDic/changeModalCode"
export const CHANGE_MODAL_TYPE = "sumDic/changeModalType"
export const CHANGE_MODAL_BELONGS = "sumDic/changeModalBelongs"
export const UPDATE_MODAL_SHOW = 'sumDic/updateModalShow'
export const UPDATE_MODAL_SURE = 'sumDic/updateModalSure'
export const UPDATE_MODAL_CANCEL = 'sumDic/updateModalCancel'

export const show_list = (list) => {
    return {
        type: SHOW_LIST,
        list: list
    }
}

export const change_disabled = (row) => {
    return {
        type: CHANGE_DISABLED,
        row: row
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

export const find_dic_types = (list) => {
    return {
        type: FIND_DIC_TYPES,
        list: list
    }
}

export const change_modal_name = (dicName) => {
    return {
        type: CHANGE_MODAL_NAME,
        dicName: dicName
    }
}

export const change_modal_code = (dicCode) => {
    return {
        type: CHANGE_MODAL_CODE,
        dicCode: dicCode
    }
}

export const change_modal_type = (dicType) => {
    return {
        type: CHANGE_MODAL_TYPE,
        dicType: dicType
    }
}

export const change_modal_belongs = (belongs) => {
    return {
        type: CHANGE_MODAL_BELONGS,
        belongs: belongs
    }
}

export const update_modal_show = (dic) => {
    return {
        type: UPDATE_MODAL_SHOW,
        dic: dic
    }
}

export const update_modal_sure = (dic) => {
    return {
        type: UPDATE_MODAL_SURE,
        dic: dic
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
        }).then((response) => {
            return response.data
        }).then((data) => {
            dispatch(show_list(data))
        })
    }
}

export const changeDisabled = (row) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/changeDisabled',
            data: row
        }).then((response) => {
            return response.data
        }).then((data) => {
            return dispatch(change_disabled(data))
        }) 
    }
}

export const addModalShow = () => {
    return (dispatch) => {
        dispatch(add_modal_show())

        axios.post('/api/sumDicController/findDicTypes')
        .then((response) => {
            return response.data
        }).then((list) => {
            dispatch(find_dic_types(list))
        })

    }
}

export const addModalSure = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/saveDic',
            data: dic
        }).then((r) => {
            return r.data
        }).then((d) => {
            dispatch(add_modal_sure(d))
        })
    }
}

export const addModalCancel = () => {
    return (dispatch) => {
        dispatch(add_modal_cancel())
    }
}

export const deleteDicByIds = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行')
        }else{
            let codes = []
            selectRows.map(row => codes.push(row.dicCode))
            axios({
                method: 'post',
                url: '/api/sumDicController/deleteDicByIds',
                data: codes
            }).then((response) => {
                return response.data
            }).then((list) => {
                dispatch(show_list(list))
            })
        }

    }
}

export const findDicTypes = () => {
    return (dispatch) => {
        axios.post('/api/sumDicController/findDicTypes')
                .then((r) => {
                    return r.data
                }).then((list) => {
                    dispatch(find_dic_types(list))
                })
    }
}

export const changeModalName = (e) => {
    return (dispatch) => {
        dispatch(change_modal_name(e.target.value))
    }
}

export const changeModalCode = (e) => {
    return (dispatch) => {
        dispatch(change_modal_code(e.target.value))
    }
}

export const changeModalType = (e) => {
    return (dispatch) => {
        dispatch(change_modal_type(e.target.value))
    }
}

export const changeModalBelongs = (e) => {
    return (dispatch) => {
        dispatch(change_modal_belongs(e.target.value))
    }
}

export const updateModalShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行')
        }else{
            axios.post('/api/sumDicController/findDicById/'+selectRows[0].dicId)
                .then((response) => {
                    return response.data
                }).then((data) => {
                    dispatch(update_modal_show(data))
                })
        }
    }
}

export const updateModalSure = (dic) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/sumDicController/updateDic',
            data: dic
        }).then((res) => {
            return res.data
        }).then((dic) => {
            dispatch(update_modal_sure(dic))
        })
    }
}

export const updateModalCancel = () => {
    return (dispatch) => {
        dispatch(update_modal_cancel())
    }
}