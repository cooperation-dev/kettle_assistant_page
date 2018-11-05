import '../../../mock/api';
import axios from 'axios';

export const SHOW_LIST = "sumDic/showList"
export const CHANGE_DISABLED = "sumDic/changeDisabled"

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