import '../../../mock/api';
import axios from 'axios';

export const FIND_LOGS = "systemLog/findLogs";

export const find_logs = (list) => {
    return {
        type: FIND_LOGS, 
        list: list
    }
}

export const findLogs = (log) => {//包含操作用户、日志类型、操作IP、详情、创建时间
    return (dispatch) => {
        /* let _obj = {
            operator: operator,
            log_type: log_type,
            operate_ip: operate_ip,
            details: details,
            create_time: create_time
        }
        axios.post('systemLog/findLogs', _obj).then((response) => {
            return response.data.list
        }).then((list) => {
            dispatch(find_logs(list))
        }) */
        axios({
            method: 'post',
            url: 'systemLogController/findLogs',
            data: log
        }).then((response) => {
            return response.data.list
        }).then((list) => {
            dispatch(find_logs(list))
        })
    }
}