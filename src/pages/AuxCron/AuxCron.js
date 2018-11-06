import React, {Component} from 'react';
import {connect} from 'react-redux';

class AuxCron extends Component{
    render(){
        return (
            <div>

            </div>
        )
    }
}

export default connect((state) => ({
    cron: state.cron
}), {})(AuxCron)