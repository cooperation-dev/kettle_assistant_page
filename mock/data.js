import Mock from 'mockjs';

//作业管理
const Jobs = []
for(let i=1; i<=11; i++){
    Jobs.push(Mock.mock({
        key: i+"",
        job_id: i+"",
        job_name: "测试作业" + i,
        job_desc: "描述测试作业" + i,
        cron_set: Mock.Random.integer(1, 10) + '分钟',
        job_type: Mock.Random.integer(0,1)==0?'Ktr作业':'Kjb作业',
        job_state: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
        run_state: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
        modify_time: '2018-10-17 00:00:00',
        creator: 'adan',
        create_time: '2018-10-17 00:00:00'
    }))
}

/***
 * 作业监控
 * 分析
 */
const job_monitor_analysis = []
//转换量
const trans = Mock.mock({
    key: "1",
    title: '总转换量',
    quantity: 126560,
    w_yoy: 0.12,    //周同比
    d_yoy: 0.11,    //日同比
    d_title: '日转换量',
    d_quantity: 12345  //日转换量
})
//输入量
const input = Mock.mock({
    key: "2",
    title: '总输入量',
    quantity: 88888,
    w_yoy: 0.34,   
    d_yoy: 0.57,    
    d_title: '日输入量',
    d_quantity: 3212
})
//输出量
const output = Mock.mock({
    key: "3",
    title: '总输出量',
    quantity: 37672,
    w_yoy: 0.23,   
    d_yoy: 0.14,    
    d_title: '日转出量',
    d_quantity: 3212
})
//转换率
const trans_rate = Mock.mock({
    key: "4",
    title: '总转换率',
    quantity: 0.4238,
    w_yoy: 0.12,   
    d_yoy: 0.13,   
    d_title: '日转换率',
    d_quantity: 0.3125
})
job_monitor_analysis.push(trans)
job_monitor_analysis.push(input)
job_monitor_analysis.push(output)
job_monitor_analysis.push(trans_rate)

/***
 * 日输入量
 */
const input_date = []
for(let i=1; i<=24; i++){
    input_date.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(123, 342)
    }))
}
/***
 * 周输入量
 */
const input_week = []
for(let i=1; i<=7; i++){
    input_week.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(123, 342)
    }))
}
/***
 * 月输入量
 */
const input_month = []
for(let i=1; i<=31; i++){
    input_month.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(12345, 34253)
    }))
}
/***
 * 年输入量
 */
const input_year = []
for(let i=1; i<=12; i++){
    input_year.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(123453, 342534)
    }))
}
/***
 * 日输出量
 */
const output_date = []
for(let i=1; i<=24; i++){
    output_date.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(12345, 34253)
    }))
}
/***
 * 周输出量
 */
const output_week = []
for(let i=1; i<=7; i++){
    output_week.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(12345, 34253)
    }))
}
/***
 * 月输出量
 */
const output_month = []
for(let i=1; i<=31; i++){
    output_month.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(12345, 34253)
    }))
}
/***
 * 年输出量
 */
const output_year = []
for(let i=1; i<=12; i++){
    output_year.push(Mock.mock({
        key: i,
        value: Mock.Random.integer(123453, 342534)
    }))
}

/***
 * 日输入前五
 */
const input_range_date_data = []
for(let i=0; i<5; i++){
    input_range_date_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(100, 500)
    }))
}
const input_range_week_data = []
for(let i=0; i<5; i++){
    input_range_week_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(300, 700)
    }))
}
const input_range_month_data = []
for(let i=0; i<5; i++){
    input_range_month_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(2000, 3000)
    }))
}
const input_range_year_data = []
for(let i=0; i<5; i++){
    input_range_year_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(10000, 50000)
    }))
}

const output_range_date_data = []
for(let i=0; i<5; i++){
    output_range_date_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(100, 500)
    }))
}
const output_range_week_data = []
for(let i=0; i<5; i++){
    output_range_week_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(300, 700)
    }))
}
const output_range_month_data = []
for(let i=0; i<5; i++){
    output_range_month_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(2000, 3000)
    }))
}
const output_range_year_data = []
for(let i=0; i<5; i++){
    output_range_year_data.push(Mock.mock({
        range: i+1,
        name: Mock.Random.string(10),
        quantity: Mock.Random.integer(10000, 50000)
    }))
}

const input_range_date = {
    title: '今日输入量',
    list: input_range_date_data
}
const input_range_week = {
    title: '本周输入量',
    list: input_range_week_data
}
const input_range_month = {
    title: '本月输入量',
    list: input_range_month_data
}
const input_range_year = {
    title: '全年输入量',
    list: input_range_year_data
}
const output_range_date = {
    title: '今日输出量',
    list: output_range_date_data
}
const output_range_week = {
    title: '本周输出量',
    list: output_range_week_data
}
const output_range_month = {
    title: '本月输出量',
    list: output_range_month_data
}
const output_range_year = {
    title: '全年输出量',
    list: output_range_year_data
}

export {Jobs, job_monitor_analysis, 
    input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
    input_range_date, input_range_week, input_range_month, input_range_year, output_range_date, output_range_week, output_range_month, output_range_year}