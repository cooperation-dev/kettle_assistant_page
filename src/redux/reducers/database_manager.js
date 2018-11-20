import {FIND_DATABASES, 
        ADD_DATABASE_MODAL_SHOW, ADD_DATABASE_MODAL_CANCEL, ADD_DATABASE_MODAL_SURE, 
        UPDATE_DATABASE_MODAL_SHOW, UPDATE_DATABASE_MODAL_CANCEL, UPDATE_DATABASE_MODAL_SURE, 
        DELETE_DATABASES_BY_IDS} from '../actions/database_manager'

const initState = {
    list : [],
    addVisible: false,
    updateVisible: false,
    updateId: '',
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
            }
        }
        case UPDATE_DATABASE_MODAL_CANCEL:{
            return {
                ...state,
                updateVisible: false
            }
        }
        case UPDATE_DATABASE_MODAL_SURE:{
            state.list.map(database => {
                if(database.id == action.database.id){
                    return action.database
                }else {
                    return database
                }
            })
            return {
                ...state,
                updateVisible: false,
            }
        }
        case DELETE_DATABASES_BY_IDS:{
            let newList = [];
            let deleteIds = action.deleteIds;
            for(let i = 0; i < state.list.length; i ++){
                if(deleteIds.indexOf(state.list[i].id) == -1){
                    newList.push(state.list[i]);
                }
            }
            return {
                ...state,
                list: newList
            }
        }
        default : 
            return state
    }
}