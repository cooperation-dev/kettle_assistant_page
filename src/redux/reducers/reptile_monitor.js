import {LOAD_DATA, LOAD_ECHARTS, SHOW_RANGE} from '../actions/reptile_monitor';

const initState = {
    cards: [],
    options: [],
    rangeData: {
        title: '',
        list: []
    }
}

export default function reducers(state=initState, action){
    switch(action.type){
        case LOAD_DATA:{
            return {
                ...state,
               cards: action.cards
            }
        }
        case LOAD_ECHARTS: {
            return {
                ...state,
                options: action.options
            }
        }
        case SHOW_RANGE: {
            return {
                ...state,
                rangeData: action.rangeData
            }
        }
        default:
            return state;
    }
}