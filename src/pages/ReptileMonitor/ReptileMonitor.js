import React, {Component} from 'react';
import {Row, Col, Card, Divider, Tabs, DatePicker, List} from 'antd';

import {loadRunnings, loadWaitings, loadProductGroupingPlatform, loadProductGroupingType} from '../../redux/actions/reptile_monitor';
import {Bar} from 'components/Echarts/Bar';
import {connect} from 'react-redux';

import './reptileMonitor.css';

const {TabPane}  = Tabs
const {RangePicker} = DatePicker

class reptileMonitor extends Component{
    constructor(props){
        super(props)

        this.state = {
            activeKey: 'input',
            datet: 'date'
        }

    }

    componentDidMount = () => {
        this.props.loadRunnings()
        this.props.loadWaitings()
        this.props.loadProductGroupingPlatform()
        this.props.loadProductGroupingType()
    }

    render(){
        return (
            <div>
                <Row gutter={16} className="reptile_monitor_row">
                    <Col key={"正在运行"} className="gutter-row" span={6}>
                        <Card bordered={false} className="gutter-box">
                            <p className="title">正在运行</p>
                            <p className="quantity">{this.props.reptileMonitor.runningTotal}</p>
                            {
                                this.props.reptileMonitor.runningData.map(data => {
                                    return <p className="title">{data.name}</p>
                                })
                            }
                            <Divider></Divider>
                        </Card>
                    </Col>
                    <Col key={"等待运行"} className="gutter-row" span={6}>
                        <Card bordered={false} className="gutter-box">
                            <p className="title">等待运行</p>
                            <p className="quantity">{this.props.reptileMonitor.waitingTotal}</p>
                            {
                                this.props.reptileMonitor.waitingData.map(data => {
                            <p className="quantity">{this.props.reptileMonitor.waitingTotal}</p>
                                    return <p className="title">{data.name}</p>
                                })
                            }
                            <Divider></Divider>
                        </Card>
                    </Col>
                    <Col key={"按平台分组"} className="gutter-row" span={6}>
                        <Card bordered={false} className="gutter-box">
                            <p className="title">按平台分组</p>
                            {
                                this.props.reptileMonitor.groupingPlatform.map(data => {
                                    return <p className="quantity" key={data.key}>{data.key}: {data.value}</p>
                                })
                            }
                            <Divider></Divider>
                        </Card>
                    </Col>
                    <Col key={"按产品类型分组"} className="gutter-row" span={6}>
                        <Card bordered={false} className="gutter-box">
                            <p className="title">按产品类型分组</p>
                            {
                                this.props.reptileMonitor.groupingType.map(data => {
                                    return <p className="quantity" key={data.key}>{data.key}: {data.value}</p>
                                })
                            }
                            <Divider></Divider>
                        </Card>
                    </Col>
                    {/* {
                        this.props.reptileMonitor.cards.map(card => {
                            return (
                                <Col key={card.key} className="gutter-row" span={6}>
                                    <Card bordered={false} className="gutter-box">
                                        <p className="title">{card.title}</p>
                                        <p className="quantity">{card.quantity}</p>
                                        <Divider></Divider>
                                    </Card>
                                </Col>
                            )
                        })
                    } */}
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({
    reptileMonitor: state.reptileMonitor
}), {loadRunnings, loadWaitings, loadProductGroupingPlatform, loadProductGroupingType})(reptileMonitor)