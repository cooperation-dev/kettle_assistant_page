import '../../../mock/api';
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

export const showList = (dic_code, dic_name, dic_type) => {
    return (dispatch) => {
        axios.post('sumDic/showList', {
            dic_code: dic_code,
            dic_name: dic_name,
            dic_type: dic_type  
        }).then((response) => {
            return response.data.list
        }).then((data) => {
            dispatch(show_list(data))
        })
    }
}

export const changeDisabled = (row) => {
    return (dispatch) => {
        axios.post('sumDic/changeDisabled', {
            record: ''
        }).then((response) => {
            return response.data.record
        }).then((data) => {
            return dispatch(change_disabled(data))
        })
    }
}

export const addModalShow = () => {
    return (dispatch) => {
        dispatch(add_modal_show())

        axios.post('sumDic/findDicTypes')
        .then((response) => {
            return response.data.list
        }).then((list) => {
            dispatch(find_dic_types(list))
        })

    }
}

export const addModalSure = (dic_name, dic_code, dic_type, belongs) => {
    return (dispatch) => {
        axios.post('sumDic/saveDic', {
            dic_name: '',
            dic_code: '',
            dic_type: '',
            belongs: '',
        }).then((r) => {
            return r.data.dic
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
            axios.post('sumDic/deleteDicByIds')
                .then((r) => {
                    return r.data.list
                }).then((list) => {
                    // dispatch(delete_dic_by_ids(list))
                    dispatch(show_list(list))
                })

        }

    }
}

export const findDicTypes = () => {
    return (dispatch) => {
        axios.post('sumDic/findDicTypes')
                .then((r) => {
                    return r.data.list
                }).then((list) => {
                    dispatch(find_dic_types(list))
                })
    }
}