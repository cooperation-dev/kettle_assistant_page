import {TOGGLE_MENU, CHANGE_MENU} from '../actions/app';

const initState = {
    collapsed: false,
    selectKeys: ['job_manager'],
    openKeys: ['job_manager'],
}

export default function reducers(state=initState, action){
    switch(action.type){
        case TOGGLE_MENU: {
            return {
                ...state,
                collapsed: !state.collapsed
            }
        }
        case CHANGE_MENU: {
            return {
                ...state,
                selectKeys: [],
                openKeys: [],
            }
        }
        default:
            return state
    }
}