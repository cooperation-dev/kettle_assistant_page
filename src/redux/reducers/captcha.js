import {CHANGE_CAPTCHA, CLICK_CAPTCHA} from '../actions/captcha';

const initState = {
    captcha: '',
    source: '/api/loginController/produceValidateCode'
}

export default function reducers(state=initState, action){
    switch(action.type){
        case CHANGE_CAPTCHA: {
            return {
                ...state,
                captcha: action.captcha
            }
        }
        case CLICK_CAPTCHA: {
            return {
                ...state,
                source: '/api/loginController/produceValidateCode'
            }
        }
        default: 
            return state
    }
}