import React, {Component} from 'react';
import {Row, Col, Card, Divider, Tabs, DatePicker, List} from 'antd';

import {loadData, loadEcharts, showRange} from '../../redux/actions/job_monitor';
import {Bar} from 'components/Echarts/Bar';
import {connect} from 'react-redux';

import './JobMonitor.css';

const {TabPane}  = Tabs
const {RangePicker} = DatePicker

class JobMonitor extends Component{
    constructor(props){
        super(props)

        this.state = {
            activeKey: 'input',
            datet: 'date'
        }

    }

    componentDidMount = () =>{
        this.props.loadData()
        this.props.loadEcharts(this.state.activeKey, this.state.datet)
        this.props.showRange(this.state.activeKey, this.state.datet)
    }

    changeTab = (e) => {
        this.setState({
            activeKey: e
        })
        this.props.loadEcharts(e, this.state.datet)
        this.props.showRange(e, this.state.datet)
    }

    changeEchartsDate = () => {
        this.setState({
            datet: 'date'
        })
        this.props.loadEcharts(this.state.activeKey, 'date')
        this.props.showRange(this.state.activeKey, 'date')
    }

    changeEchartsWeek = () => {
        this.setState({
            datet: 'week'
        })
        this.props.loadEcharts(this.state.activeKey, 'week')
        this.props.showRange(this.state.activeKey, 'week')
    }

    changeEchartsMonth = () => {
        this.setState({
            datet: 'month'
        })
        this.props.loadEcharts(this.state.activeKey, 'month')
        this.props.showRange(this.state.activeKey, 'month')
    }

    changeEchartsYear = () => {
        this.setState({
            datet: 'year'
        })
        this.props.loadEcharts(this.state.activeKey, 'year')
        this.props.showRange(this.state.activeKey, 'year')
    }

    render(){
        return (
            <div>
                <Row gutter={16} className="job_monitor_row">
                    {
                        this.props.jobMonitor.cards.map(card => {
                            return (
                                <Col key={card.key} className="gutter-row" span={6}>
                                    <Card bordered={false} className="gutter-box">
                                        <p className="title">{card.title}</p>
                                        <p className="quantity">{card.quantity}</p>
                                        <Row>
                                            <Col span={6}>周同比</Col>
                                            <Col span={6}>{card.wYoy}</Col>
                                            <Col span={6}>日同比</Col>
                                            <Col span={6}>{card.dYoy}</Col>
                                        </Row>
                                        <Divider></Divider>
                                        <Row>
                                            <Col span={8} className="real">{card.dTitle}</Col>
                                            <Col span={16} className="real">{card.dQuantity}</Col>
                                        </Row>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row gutter={16} style={{padding: "14px"}}>
                    <Col className="gutter-box" span={24}>
                        <Card>
                            <Row>
                                <Tabs defaultActiveKey="input" 
                                    onChange={this.changeTab}
                                    activeKey={"input"}
                                    activeKey={this.state.activeKey}
                                    tabBarExtraContent={
                                        <span>
                                            <span className={this.state.datet=="date"?"picker click":"picker"} onClick={this.changeEchartsDate}>今日</span>
                                            <span className={this.state.datet=="week"?"picker click":"picker"} onClick={this.changeEchartsWeek}>本周</span>
                                            <span className={this.state.datet=="month"?"picker click":"picker"} onClick={this.changeEchartsMonth}>本月</span>
                                            <span className={this.state.datet=="year"?"picker click":"picker"} onClick={this.changeEchartsYear}>全年</span>
                                            <RangePicker></RangePicker>
                                        </span>
                                    }
                                >
                                    <TabPane tab="输入量" key="input"></TabPane>
                                    <TabPane tab="输出量" key="output"></TabPane>
                                </Tabs>
                            </Row>
                            <Row>
                                <Col span={18}>
                                    <Bar data={this.props.jobMonitor.options}></Bar>
                                </Col>
                                <Col span={6}>
                                    <List
                                        header={this.props.jobMonitor.rangeData.title}
                                        dataSource = {this.props.jobMonitor.rangeData.list.map(ele => {
                                            return (
                                                <Row style={{width: "100%"}}>
                                                    <Col span={2}>{ele.range}</Col>
                                                    <Col span={16}>{ele.name}</Col>
                                                    <Col span={6}>{ele.quantity}</Col>
                                                </Row>
                                            )
                                        })
                                        }
                                        split={false}
                                        renderItem={item => (<List.Item>{item}</List.Item>)}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

// export default JobMonitor
// export default connect((state) => ({jobMonitor: state.JobMonitor}), {loadData})(JobMonitor)
export default connect((state) => ({
    jobMonitor: state.jobMonitor
}), {loadData, loadEcharts, showRange})(JobMonitor)