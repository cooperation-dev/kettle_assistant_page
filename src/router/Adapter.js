import axios from 'axios';

import history from './history';

import {message} from 'antd';

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
    }
)

axios.interceptors.response.use(
    response => {
        if(response.data){
            switch(response.data.code){
                case "500":{
                    // message.error('服务器内部错误!');
                    history.push('/app/error');
                    return Promise.reject(response);
                }
                default:{
                    return response;
                }
            }
        }
    },
    error => {
        history.push('/app/error');
    }
)

export default axios;