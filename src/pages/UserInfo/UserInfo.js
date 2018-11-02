import React, {Component} from 'react';
import {getRequest, getUserInfo} from '../../redux/actions/userInfo';
import {connect} from 'react-redux';

class UserInfo extends Component{

    render(){
        return (
            <div >
                等待请求: {this.props.userInfo.isLoading?'正在请求':'请求完成'}
                <button onClick={()=>{this.props.getUserInfo()}}>请求</button>
                <div>姓名: {this.props.userInfo.userInfo.name}</div>
                <div>年龄: {this.props.userInfo.userInfo.age}</div>
            </div>
        )
    }
}

export default connect((state) => ({userInfo: state.userInfo}), {getRequest, getUserInfo})(UserInfo)