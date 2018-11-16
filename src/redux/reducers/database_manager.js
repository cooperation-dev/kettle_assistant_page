import {FIND_DATABASES, 
        ADD_DATABASE_MODAL_SHOW, ADD_DATABASE_MODAL_CANCEL, ADD_DATABASE_MODAL_SURE, 
        UPDATE_DATABASE_MODAL_SHOW, UPDATE_DATABASE_MODAL_CANCEL, UPDATE_DATABASE_MODAL_SURE, 
        CHANGE_MODAL_NAME, CHANGE_MODAL_SORT, CHANGE_MODAL_AGENCY_NAME, CHANGE_MODAL_AGENCY_CODE, 
        CHANGE_MODAL_DB_TYPE, CHANGE_MODAL_INTERVIEW_METHOD, CHANGE_MODAL_JNDI_NAME, CHANGE_MODAL_CONNECTION_STRING} from '../actions/database_manager'

const initState = {
    list : [],
    addVisible: false,
    updateVisible: false,
    id: '',
    name: '',
    sort: '',
    agencyName: '',
    agencyCode: '',
    dbType: '',
    interviewMethod: '',
    jndiName: '',
    connectionString: '',
}

export default function reducers (state = initState, action){
    switch(action.type){
        case FIND_DATABASES:{
            return {
                ...state,
                list:action.list
            }
        }
        case ADD_DATABASE_MODAL_SHOW:{
            return {
                ...state,
                addVisible: true
            }
        }
        case ADD_DATABASE_MODAL_CANCEL:{
            return {
                ...state,
                addVisible: false
            }
        }
        case ADD_DATABASE_MODAL_SURE:{
            state.list.push(action.database);
            return {
                ...state,
                addVisible: false
            }
        }
        case UPDATE_DATABASE_MODAL_SHOW:{
            return {
                ...state,
                updateVisible: true,
                id: action.database.id,
                name: action.database.name,
                sort: action.database.sort,
                agencyName: action.database.agencyName,
                agencyCode: action.database.agencyCode,
                dbType: action.database.dbType,
                interviewMethod: action.database.interviewMethod,
                jndiName: action.database.jndiName,
                connectionString: action.database.connectionString,
            }
        }
        case UPDATE_DATABASE_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_DATABASE_MODAL_SURE:{
            let newList = state.list.map(database => {
                if(database.id == action.database.id){
                    return action.database
                }else {
                    return database
                }
            })
            return {
                ...state,
                updateVisible: false,
                list: newList,
            }
        }
        case CHANGE_MODAL_NAME:{
            return {
                ...state,
                name: action.name,
            }
        }
        case CHANGE_MODAL_SORT:{
            return {
                ...state,
                sort: action.sort,
            }
        }
        case CHANGE_MODAL_AGENCY_NAME:{
            return {
                ...state,
                agencyName: action.agencyName,
            }
        }
        case CHANGE_MODAL_AGENCY_CODE:{
            return {
                ...state,
                agencyCode: action.agencyCode,
            }
        } 
        case CHANGE_MODAL_DB_TYPE:{
            return {
                ...state,
                dbType: action.dbType,
            }
        }
        case CHANGE_MODAL_INTERVIEW_METHOD:{
            return {
                ...state,
                interviewMethod: action.interviewMethod,
            }
        }
        case CHANGE_MODAL_JNDI_NAME:{
            return {
                ...state,
                jndiName: action.jndiName,
            }
        }
        case CHANGE_MODAL_CONNECTION_STRING:{
            return {
                ...state,
                connectionString: action.connectionString,
            }
        }
        default : 
            return state
    }
}