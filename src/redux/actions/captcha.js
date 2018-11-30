//输入验证码
export const CHANGE_CAPTCHA = "captcha/change";
//修改验证码
export const CLICK_CAPTCHA = "captcha/click";
//验证验证码
export const VERIFY_CAPTCHA = "captcha/verify";
//重置验证码框内容
export const RESET_CAPTCHA = "captcha/reset"

export const change_captcha = (value) => {
    return {
        type: CHANGE_CAPTCHA,
        captcha: value
    }
}

export const click_captcha = () => {
    return {
        type: CLICK_CAPTCHA
    }
}

export const reset_captcha = () => {
    return {
        type: RESET_CAPTCHA
    }
}

export const changeCaptcha = (e) => {
    return (dispatch) => {
        dispatch(change_captcha(e.target.value))
    }
}

export const clickCaptcha = () => {
    return (dispatch) => {
        dispatch(click_captcha())
    }
}

export const resetCaptcha = () => {
    return (dispatch) => {
        dispatch(reset_captcha())
    }
}