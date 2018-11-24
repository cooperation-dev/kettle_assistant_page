import axios from 'axios'
import {message} from 'antd'
import {Redirect} from 'react-router-dom'


axios.interceptors.response.use(
    error => {
        if(error.data){
            switch(error.status){
                case 200:{
                    window.location = 'http://localhost:8081/kab'
                    return error;
                }
                case 404:{
                    message.error('找不到页面!');
                }
                case 500:{
                    message.error('服务器内部错误!');
                }
            }
        }
    }
)

export default axios;