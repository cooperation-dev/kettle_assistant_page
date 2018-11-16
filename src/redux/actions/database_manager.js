// import '../../../mock/api';
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
//修改Modal名称
export const CHANGE_MODAL_NAME = "databaseManager/changeModalName"
//修改Modal排序
export const CHANGE_MODAL_SORT = "databaseManager/changeModalSort"
//修改Modal机构名称
export const CHANGE_MODAL_AGENCY_NAME = "databaseManager/changeModalAgencyName"
//修改Modal机构代码
export const CHANGE_MODAL_AGENCY_CODE = "databaseManager/changeModalAgencyCode"
//修改Modal数据库类型
export const CHANGE_MODAL_DB_TYPE = "databaseManager/changeModalDbType"
//修改Modal访问方式
export const CHANGE_MODAL_INTERVIEW_METHOD = "databaseManager/changeModalInterviewMethod"
//修改ModalJNDI名称
export const CHANGE_MODAL_JNDI_NAME = "databaseManager/changeModalJndiName"
//修改Modal连接串
export const CHANGE_MODAL_CONNECTION_STRING = "databaseManager/changeModalConnectionString"

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

export const update_database_modal_sure = (database) => {
    return {
        type: UPDATE_DATABASE_MODAL_SURE,
        database: database
    }
}

export const change_modal_name = (name) => {
    return {
        type: CHANGE_MODAL_NAME,
        name: name
    }
}

export const change_modal_sort = (sort) => {
    return {
        type: CHANGE_MODAL_SORT,
        sort: sort
    }
}

export const change_modal_agency_name = (agencyName) => {
    return {
        type: CHANGE_MODAL_AGENCY_NAME,
        agencyName: agencyName
    }
}

export const change_modal_agency_code = (agencyCode) => {
    return {
        type: CHANGE_MODAL_AGENCY_CODE,
        agencyCode: agencyCode
    }
}

export const change_modal_db_type = (dbType) => {
    return {
        type: CHANGE_MODAL_DB_TYPE,
        dbType: dbType
    }
}

export const change_modal_interview_method = (interviewMethod) => {
    return {
        type: CHANGE_MODAL_INTERVIEW_METHOD,
        interviewMethod: interviewMethod
    }
}

export const change_modal_jndi_name = (jndiName) => {
    return {
        type: CHANGE_MODAL_JNDI_NAME,
        jndiName: jndiName
    }
}

export const change_modal_connection_string = (connectionString) => {
    return {
        type: CHANGE_MODAL_CONNECTION_STRING,
        connectionString: connectionString
    }
}

export const findDatabases = (database) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: FIND_DATABASES,
            data: database,
        }).then((res) => {
            return res.data
        }).then((list) => {
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

export const addDatabaseSure = (database) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: ADD_DATABASE_MODAL_SURE,
            data: database,
        }).then((res) => {
            return res.data.database;
        }).then((database) => {
            dispatch(add_database_modal_sure(database));  
        })
    }
}

export const deleteDatabase = (selectRows) => {
    return (dispatch) => {
        let ids = [];
        selectRows.map(row => ids.push(row.id));
        axios({
            method: 'post',
            url: 'databaseManager/deleteDatabaseByIds',
            data: ids,
        }).then((res) => {
            return res.data.list;
        }).then((list) => {
            dispatch(find_databases(list));
        })
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

export const updateDatabaseSure = (database) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: UPDATE_DATABASE_MODAL_SURE,
            data: database,
        }).then((res) => {
            return res.data.database
        }).then((database) => {
            dispatch(update_database_modal_sure(database));
        })
    }
}

export const changeModalName = (event) => {
    return (dispatch) => {
        dispatch(change_modal_name(event.target.value))
    }
}

export const changeModalSort = (event) => {
    return (dispatch) => {
        dispatch(change_modal_sort(event.target.value))
    }
}

export const changeModalAgencyName = (event) => {
    return (dispatch) => {
        dispatch(change_modal_agency_name(event.target.value))
    }
}

export const changeModalAgencyCode = (event) => {
    return (dispatch) => {
        dispatch(change_modal_agency_code(event.target.value))
    }
}

export const changeModalDbType = (event) => {
    return (dispatch) => {
        dispatch(change_modal_db_type(event.target.value))
    }
}

export const changeModalInterviewMethod = (event) => {
    return (dispatch) => {
        dispatch(change_modal_interview_method(event.target.value))
    }
}

export const changeModalJndiName = (event) => {
    return (dispatch) => {
        dispatch(change_modal_jndi_name(event.target.value))
    }
}

export const changeModalConnectionString = (event) => {
    return (dispatch) => {
        dispatch(change_modal_connection_string(event.target.value))
    }
}