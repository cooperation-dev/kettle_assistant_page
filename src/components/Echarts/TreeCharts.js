import React, {Component} from 'react';
import echarts from 'echarts';

class TreeCharts extends Component{
    
    componentDidMount = () => {
        this.showCharts(this.props.data)
    }
    
    showCharts = (data) => {

        const option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
    
                    data: data,
    
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
    
                    symbolSize: 7,
    
                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 9
                        }
                    },
    
                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    }
    
                    
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

export {TreeCharts}