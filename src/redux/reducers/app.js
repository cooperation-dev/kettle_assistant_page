import {TOGGLE_MENU, CHANGE_MENU, LOAD_MENU} from '../actions/app';

const initState = {
    collapsed: false,
    selectKeys: ['reptile_job'],
    openKeys: ['reptile_job'],
    list: [],
    sub_list: []
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
        case LOAD_MENU: {
            let sub = []
            action.list.map(l => {
                sub = sub.concat(l.children)
            })
            return {
                ...state, 
                list: action.list,
                sub_list: sub
            }
        }
        default:
            return state
    }
}