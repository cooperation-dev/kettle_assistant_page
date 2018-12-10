import React from 'react'
import { Button } from 'antd';

import config from './typeConfig';
import './Exception.css'

class Exception extends React.PureComponent{
    render() {
        const {
            type,
            backText = "返回首页",
        } = this.props;
        const pageType = type in config ? type : '404';
        return(
            <div className="exception">
                <div className="imgBlock">
                    <div
                        className="imgEle"
                        style={{ backgroundImage: `url(${config[pageType].img})` }}
                    />
                </div>
                <div className="content">
                    <h1>{config[pageType].title}</h1>
                    <div className="desc">{config[pageType].desc}</div>
                    <div>
                        <Button type="primary">{backText}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Exception;