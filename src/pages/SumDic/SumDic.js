import React, {Component} from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';

class SumDic extends Component{

    render(){
        const columns = [
            {
                title: '代码',
                dataIndex: 'dic_code',
                key: 'dic_code'
            },{
                title: '名称',
                dataIndex: 'dic_name',
                key: 'dic_name'
            },{
                title: '排序',
                dataIndex: 'sort',
                key: 'sort'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time'
            },{
                title: '修改时间',
                dataIndex: 'modify_time',
                key: 'modify_time'
            },{
                title: '创建人',
                dataIndex: 'creator',
                key: 'creator'
            },{
                title: '是否禁用',
                dataIndex: 'valid',
                key: 'valid'
            },{
                title: '字典类别',
                dataIndex: 'dic_type',
                key: 'dic_type'
            },{
                title: '所属对象',
                dataIndex: 'belongs',
                key: 'belongs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        '
            },
        ]

        const data = []

        return (
            <div>
                <Table dataSource={data} columns={columns}></Table>
            </div>
        )
    }

}

export default connect((state)=> ({
    sumDic: state.sumDic
}), {})(SumDic)