import axios from 'axios';

export const FIND_LOGS = "systemLog/findLogs";

export const find_logs = (data) => {
    return {
        type: FIND_LOGS, 
        list: data.data,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        total: data.total
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
        }).then((data) => {
            dispatch(find_logs(data))
        })
    }
}