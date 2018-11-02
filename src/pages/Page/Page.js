import React, {Component} from 'react';

import './Page.css';

class Page extends Component{

    componentWillUnmount(){
        this.setState = (state,callback)=>{
        return;
      };
    }

    render(){
        return (
            <div className="page">
                Page
            </div>
        )
    }
}

export default Page