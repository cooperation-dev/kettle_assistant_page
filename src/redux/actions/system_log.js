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
        axios({
            method: 'post',
            url: '/api/systemLogController/findLogs',
            data: log
        }).then((response) => {
            return response.data.data
        }).then((list) => {
            dispatch(find_logs(list))
        })
    }
}