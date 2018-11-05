import {SHOW_LIST, CHANGE_DISABLED} from '../actions/sum_dic';

const initState = {
    list: []
}

export default function reducers(state=initState, action){
    switch(action.type){
        case SHOW_LIST:{
            return {
                ...state,
                list: action.list
            }
        }
        case CHANGE_DISABLED: {
            let list = state.list.map(record => {
                if(record.key == action.row.key){
                    return action.row
                }else{
                    return record
                }
            })
            return {
                ...state,
                list: list
            }
        }
        default: 
            return state
    }
}