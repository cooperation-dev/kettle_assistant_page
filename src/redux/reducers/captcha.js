import {CHANGE_CAPTCHA, CLICK_CAPTCHA, RESET_CAPTCHA} from '../actions/captcha';

const initState = {
    captcha: '',
    source: ''
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
                source: '/api/loginController/produceValidateCode?d='+new Date()
            }
        }
        case RESET_CAPTCHA: {
            return {
                ...state,
                captcha: ''
            }
        }
        default: 
            return state
    }
}