import React, {Component} from 'react';
import echarts from 'echarts';

const dic_tree = [
    {
        title: '字典类型',
        key: 'dic_type',
        value: 'dic_type',
        children: [
            {
                title: '有效性',
                key: 'valid', 
                value: 'valid',
                children: [
                    {
                        title: '有效',
                        key: 'Y',
                        value: 'Y'
                    },{
                        title: '无效',
                        key: 'N',
                        value: 'N'
                    }
                ]
            }
        ]
    },
    {
        title: '数据库类型',
        key: 'database_type', 
        value: 'database_type', 
    }
]

class TreeCharts extends Component{
    
    componentDidUpdate = () => {
        this.showCharts(dic_tree)
    }
    
    showCharts = (data) => {
        
        echarts.util.each(data.children, function (datum, index) {
            index % 2 === 0 && (datum.collapsed = true);
        });
        
        const myCharts = echarts.init(document.getElementById('main'))
        myCharts.setOption(option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
    
                    data: [data],
    
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
                    },
    
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        });

    }

    render(){
        return (
            <div id="main" style={{width: "800px", height: "280px"}}>
                
            </div>
        )
    }

}

export {TreeCharts}