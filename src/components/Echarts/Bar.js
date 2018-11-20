import React, {Component} from 'react';
import echarts from 'echarts';

class Bar extends Component{

    componentDidUpdate = () => {
        this.showCharts(this.props.data)
    }

    showCharts = (data) => {
        const xAxisData = [];
        const yAxisData = [];
        for(let i=0; i<data.length; i++){
            let d = data[i];
            xAxisData.push(d.key);
            yAxisData.push(d.value);
        }

        const option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:yAxisData
                }
            ]
        };
        const myCharts = echarts.init(document.getElementById('main'))
        myCharts.setOption(option)
    }

    render(){
        return (
            <div id="main" style={{width: "800px", height: "280px"}}>
                
            </div>
        )
    }
}

export {Bar}