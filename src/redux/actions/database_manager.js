import '../../../mock/api';
import axios from 'axios';
import {message} from 'antd';

//请求数据
export const FIND_DATABASES = "databaseManager/findList";
//新增显示
export const ADD_DATABASE_MODAL_SHOW = "databaseManager/addDatabaseShow"
//新增取消
export const ADD_DATABASE_MODAL_CANCEL = "databaseManager/addDatabaseCancel"
//新增确认
export const ADD_DATABASE_MODAL_SURE = "databaseManager/addDatabasetSure"
//修改显示
export const UPDATE_DATABASE_MODAL_SHOW = "databaseManager/updateDatabaseShow"
//修改取消
export const UPDATE_DATABASE_MODAL_CANCEL = "databaseManager/updateDatabaseCancel"
//修改确认
export const UPDATE_DATABASE_MODAL_SURE = "databaseManager/updateDatabasetSure"

export const find_databases = (list) => {
    return {
        type : FIND_DATABASES,
        list : list
    }
}

export const add_database_modal_show = () => {
    return {
        type: ADD_DATABASE_MODAL_SHOW
    }
}

export const add_database_modal_cancel = () => {
    return {
        type: ADD_DATABASE_MODAL_CANCEL
    }
}

export const add_database_modal_sure = (database) => {
    return {
        type: ADD_DATABASE_MODAL_SURE,
        database: database
    }
}

export const update_database_modal_show = (row) => {
    return {
        type: UPDATE_DATABASE_MODAL_SHOW,
        database: row
    }
}

export const update_database_modal_cancel = () => {
    return {
        type: UPDATE_DATABASE_MODAL_CANCEL
    }
}

export const update_database_modal_sure = () => {
    return {
        type: UPDATE_DATABASE_MODAL_SURE
    }
}

export const findDatabases = () => {
    return (dispatch) => {
        axios.post(FIND_DATABASES)
                .then((response) => {
                    return response.data.list
                })
                .then((list) => {
                    dispatch(find_databases(list))
                })
    }
}

export const addDatabaseShow = () => {
    return (dispatch) => {
        dispatch(add_database_modal_show());
    }
}

export const addDatabaseCancel = () => {
    return (dispatch) => {
        dispatch(add_database_modal_cancel());
    }
}

export const addDatabaseSure = () => {
    return (dispatch) => {
        dispatch(add_database_modal_sure());
    }
}

export const updateDatabaseShow = (selectRows) => {
    return (dispatch) => {
        if(selectRows.length == 0){
            message.error('请选择行!')
        }else if(selectRows.length > 1){
            message.error('选中纪录超过一行!')
        }else {
            dispatch(update_database_modal_show(selectRows[0]));
        }
    }
}

export const updateDatabaseCancel = () => {
    return (dispatch) => {
        dispatch(update_database_modal_cancel());
    }
}

export const updateDatabaseSure = () => {
    return (dispatch) => {
        dispatch(update_database_modal_sure());
    }
}