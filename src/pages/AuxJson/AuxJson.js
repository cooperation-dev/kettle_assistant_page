import React, {Component} from 'react';
import {connect} from 'react-redux';

class AuxJson extends Component{
    render(){
        return (
            <div>
                
            </div>
        )
    }
}

export default connect((state) => ({
    cron: state.cron
}), {})(AuxJson)