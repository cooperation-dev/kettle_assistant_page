import {FIND_DATABASES, 
        ADD_DATABASE_MODAL_SHOW, ADD_DATABASE_MODAL_CANCEL, ADD_DATABASE_MODAL_SURE, 
        UPDATE_DATABASE_MODAL_SHOW, UPDATE_DATABASE_MODAL_CANCEL, UPDATE_DATABASE_MODAL_SURE} from '../actions/database_manager'

const initState = {
    list : [],
    add_visible: false,
    update_visible: false,
    database:{
        obj_name: '',
        obj_sort: '',
        agency_name: '',
        agency_code: '',
        db_type: '',
        interview_method: '',
        jndi_name: '',
        connection_string: '',
    }
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
                add_visible: true
            }
        }
        case ADD_DATABASE_MODAL_CANCEL:{
            return {
                ...state,
                add_visible: false
            }
        }
        case ADD_DATABASE_MODAL_SURE:{
            return {
                ...state,
                add_visible: false
            }
        }
        case UPDATE_DATABASE_MODAL_SHOW:{
            return {
                ...state,
                update_visible: true,
                database: action.database
            }
        }
        case UPDATE_DATABASE_MODAL_CANCEL:{
            return {
                ...state,
                update_visible: false
            }
        }
        case UPDATE_DATABASE_MODAL_SURE:{
            return {
                ...state,
                update_visible: false
            }
        }
        default : 
            return state
    }
}