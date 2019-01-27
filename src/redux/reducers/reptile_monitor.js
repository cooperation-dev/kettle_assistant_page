import {LOAD_RUNNINGS, LOAD_WAITINGS, LOAD_PRODUCT_GROUPBY_PLATFORM, LOAD_PRODUCT_GROUPBY_TYPE} from '../actions/reptile_monitor';

const initState = {
    runningTotal: 0,
    runningData: [],
    waitingTotal: 0,
    waitingData: [],
    groupingPlatform: [],
    groupingType: []
}

export default function reducers(state=initState, action){
    switch(action.type){
        case LOAD_RUNNINGS: {
            return {
                ...state,
                runningTotal: action.runningCard.total,
                runningData: action.runningCard.data
            }
        }
        case LOAD_WAITINGS: {
            return {
                ...state,
                waitingTotal: action.waitingCard.total,
                waitingData: action.waitingCard.data
            }
        }
        case LOAD_PRODUCT_GROUPBY_PLATFORM: {
            return {
                ...state,
                groupingPlatform: action.groupingPlatform
            }
        }
        case LOAD_PRODUCT_GROUPBY_TYPE: {
            return {
                ...state,
                groupingType: action.groupingType
            }
        }
        default:
            return state;
    }
}