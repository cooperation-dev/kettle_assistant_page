import axios from 'axios';
import '../../../mock/api';

export const REQUEST = "request";
export const SUCCESS = "success";
export const FAIL = "fail";

export function request(){
    return {
        type: REQUEST
    }
}

export function success(userInfo){
    return {
        type: SUCCESS,
        userInfo: userInfo
    }
}

export function fail(){
    return {
        type: FAIL
    }
}

/* export function getUserInfo(){
    return function(dispatch){
        dispatch(request())
        fetch('http://localhost:8081/api/user.json')
            .then((response) => {
                return response.json()
            }).then((json) => {
                dispatch(success(json))
            })
    }
} */
/* export const getUserInfo = () => {
    return function(dispatch){
        axios.get('http://localhost:8081/api/user.json')
            .then((response) => {
                return response.data
            }).then((data) => {
                dispatch(success(data))
            })
    }
} */
export const getUserInfo = () => {
    return (dispatch) => {
        axios.get('/user')
                .then((response) => {
                    return response.data.user
                }).then((userInfo) => {
                    dispatch(success(userInfo))
                })
    }
}

export function getRequest(){
    return function(dispatch){
        dispatch(request())
    }
}