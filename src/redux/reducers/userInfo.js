import {REQUEST, SUCCESS, FAIL} from '../actions/userInfo';

const initState = {
    isLoading: false,
    userInfo: {},
    errorMsg: ''
}

export default function reducer(state=initState, action){
    switch(action.type){
        case REQUEST:
            return{
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: ''
                
            }
        case SUCCESS:
            return{
                ...state,
                isLoading: false,
                userInfo: action.userInfo,
                errorMsg: ''
            }
        case FAIL:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg: 'error'
            }
        default:
            return state
    }
}