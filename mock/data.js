import Mock from 'mockjs';

//作业管理
const Jobs = []
for(let i=1; i<=11; i++){
    Jobs.push(Mock.mock({
        key: i+"",
        id: i+"",
        name: "测试作业" + i,
        desc: "描述测试作业" + i,
        cronSet: Mock.Random.integer(1, 10) + '分钟',
        "jobType|1": ['脚本作业', '配置作业', 'Shell作业'],
        state: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
        runState: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
        modifyTime: '2018-10-17 00:00:00',
        creator: 'adan',
        createTime: '2018-10-17 00:00:00',
        log: Mock.Random.string(2000)
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
    wYoy: 0.12,    //周同比
    dYoy: 0.11,    //日同比
    dTitle: '日转换量',
    dQuantity: 12345  //日转换量
})
//输入量
const input = Mock.mock({
    key: "2",
    title: '总输入量',
    quantity: 88888,
    wYoy: 0.34,   
    dYoy: 0.57,    
    dTitle: '日输入量',
    dQuantity: 3212
})
//输出量
const output = Mock.mock({
    key: "3",
    title: '总输出量',
    quantity: 37672,
    wYoy: 0.23,   
    dYoy: 0.14,    
    dTitle: '日转出量',
    dQuantity: 3212
})
//转换率
const trans_rate = Mock.mock({
    key: "4",
    title: '总转换率',
    quantity: 0.4238,
    wYoy: 0.12,   
    dYoy: 0.13,   
    dTitle: '日转换率',
    dQuantity: 0.3125
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

/***
 * 统一字典
 */
const sum_dic_list = []
const org_sum_dic_oracle = Mock.mock({
    index: 1,
    dicId: 1,
    key: 'oracle',
    dicCode: 'oracle',
    dicName: 'oracle',
    sort: 10,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    isDisabled: false,
    dicType: '数据库类型',
    belongs: ''
})
const org_sum_dic_mysql = Mock.mock({
    index: 2,
    dicId: 2,
    key: 'mysql',
    dicCode: 'mysql',
    dicName: 'mysql',
    sort: 11,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    isDisabled: true,
    dicType: '数据库类型',
    belongs: ''
})
const org_sum_dic_sqlserver = Mock.mock({
    index: 3,
    dicId: 3,
    key: 'sqlserver',
    dicCode: 'sqlserver',
    dicName: 'sqlserver',
    sort: 12,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    isDisabled: true,
    dicType: '数据库类型',
    belongs: ''
})
const org_sum_dic_success_failed = Mock.mock({
    index: 4,
    dicId: 4,
    key: 'SUCCESS_FAILED',
    dicCode: 'SUCCESS_FAILED',
    dicName: '成功失败',
    sort: 20,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    isDisabled: false,
    dicType: '字典类型',
    belongs: ''
})
const org_sum_dic_encoding = Mock.mock({
    index: 5,
    dicId: 5,
    key: 'ENCODING',
    dicCode: 'ENCODING',
    dicName: '编码',
    sort: 21,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    isDisabled: false,
    dicType: '字典类型',
    belongs: ''
})
sum_dic_list.push(org_sum_dic_oracle)
sum_dic_list.push(org_sum_dic_mysql)
sum_dic_list.push(org_sum_dic_sqlserver)
sum_dic_list.push(org_sum_dic_success_failed)
sum_dic_list.push(org_sum_dic_encoding)

const sum_dic_list_change = []
sum_dic_list_change.push(org_sum_dic_oracle)
sum_dic_list_change.push(org_sum_dic_sqlserver)
sum_dic_list_change.push(org_sum_dic_success_failed)
sum_dic_list_change.push(org_sum_dic_encoding)

/**
 * 数据库管理
 */
const database_manager = []
for(let i=1; i<=11; i++){
    database_manager.push(Mock.mock({
        key: i+"",
        obj_id: i+"",
        obj_name: "测试名称" + i,
        obj_sort: i+"",
        create_time: '2018-11-05 00:00:00',
        create_name: 'Dawn',
        whether_to_disable: Mock.Random.integer(0,1)==0?true:false,
        agency_name: 'Dawn',
        agency_code: 'dawn_leewp@163.com',
        db_type: '',
        interview_method: 'Native',
        jndi_name: '',
        connection_string: ''
    }))
}

/***
 * 日志管理
 */
const data_system_log = []
for(let i=0; i<=10; i++){
    data_system_log.push(Mock.mock({
        key: i+1,
        id: i+1,
        "operator|1": ['adan', "zhangsan", "lisi", "wangwu"],
        "logType|1": ['普通日志', '登陆日志', '系统日志'],
        "operateIp|1": ['122.334.43.123', '124.56.46.35', '23.142.34.14', '32.142.134.1'],
        "details": Mock.Random.string(20),
        createTime: '2018-11-05 00:00:00'
    }))
}

/**
 * 用户管理
 */
const user_manager = []
for(let i=0; i<=10; i++){
    user_manager.push(Mock.mock({
        id: i + 1,
        key: i + 1,
        nick_name: 'Name' + (i + 1),
        login_account: i + '7' + i + '546',
        role: 'Role' + (i + 1)
    }))
}

/**
 * 角色管理
 */
const role_manager = []
for(let i=0; i<=10; i++){
    role_manager.push(Mock.mock({
        id: i + 1,
        key: i + 1,
        role_name: 'Name' + (i + 1),
        role_description: 'Description' + (i + 1)
    }))
}

/**
 * 项目管理
 */
const project_manager = []
for(let i=0; i<=10; i++){
    project_manager.push(Mock.mock({
        obj_code: i + 1,
        key: i + 1,
        obj_name: 'Name' + (i + 1),
        obj_sort: i + 1,
        create_time: '2018-11-05 00:00:00',
        create_name: 'CreateName' + (i + 1),
        whether_to_disable:Mock.Random.integer(0,1) ==0 ? true:false,
        project_url: 'www.test.com',
        status: Mock.Random.integer(0,1) == 0?'成功':'失败'
    }))
}

/***
 * 菜单
 */
const menu = []
    menu.push(Mock.mock({
        key: "job_manager",
        title: "作业管理",
        icon: "file",
        parent_key: "",
        to: "",
        level: 0,
        type: '功能菜单',
        component: '',
        children: [
            {
                key: "job_manager_detail",
                title: "作业管理",
                icon: "",
                parent_key: "job_manager",
                to: "/job_manager",
                level: 1,
                type: '功能菜单',
                component: 'JobManager',
                // component: 'bundle-loader?lazy&name=[name]!pages/JobManager/JobManager',
                // component: 'pages/JobManager/JobManager',
            },{
                key: 'job_monitor',
                title: '作业监控',
                icon: '',
                parent_key: 'job_manager',
                to: '/job_monitor',
                level: 1,
                type: '功能菜单',
                component: 'JobMonitor',
                // component: 'pages/JobMonitor/JobMonitor',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 'dic_manager',
        title: '字典管理',
        icon: 'tablet',
        parent_key: '',
        to: '',
        level: 0,
        type: '功能菜单',
        component: '',
        children: [
            {
                key: 'sum_dic',
                title: '统一字典',
                icon: '',
                parent_key: 'dic_manager',
                to: '/sum_dic',
                level: 1,
                type: '功能菜单',
                component: 'SumDic',
                // component: 'pages/SumDic/SumDic',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 'config_manager',
        title: '配置管理',
        icon: 'database',
        parent_key: '',
        to: '',
        component: '',
        level: 0,
        type: '功能菜单',
        children: [
            {
                key: 'database_manager',
                title: '数据库管理',
                icon: '',
                parent_key: 'config_manager',
                to: '/database_manager',
                level: 1,
                type: '功能菜单',
                component: 'DatabaseManager',
                // component: 'pages/DatabaseManager/DatabaseManager',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 'system_manager',
        title: '系统管理',
        icon: 'tool',
        parent_key: '',
        to: '',
        component: '',
        level: 0,
        type: '功能菜单',
        children: [
            {
                key: 'menu_manager',
                title: '菜单管理',
                icon: '',
                parent_key: 'system_manager',
                to: '/menu_manager',
                level: 1,
                type: '功能菜单',
                component: 'MenuManager',
            },{
                key: 'user_manager',
                title: '用户管理',
                icon: '',
                parent_key: 'system_manager',
                to: '/user_manager',
                type: '功能菜单',
                level: 1,
                component: 'UserManager',
            },{
                key: 'role_manager',
                title: '角色管理',
                icon: '',
                parent_key: 'system_manager',
                type: '功能菜单',
                to: '/role_manager',
                level: 1,
                component: 'RoleManager',
            },{
                key: 'project_manager',
                title: '项目管理',
                icon: '',
                parent_key: 'system_manager',
                type: '功能菜单',
                to: '/project_manager',
                level: 1,
                component: 'ProjectManager',
            },{
                key: 'system_log',
                title: '系统日志',
                icon: '',
                type: '功能菜单',
                parent_key: 'system_manager',
                to: '/system_log',
                level: 1,
                component: 'SystemLog',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 'assistant_manager',
        title: '辅助工具',
        icon: 'tag-o',
        parent_key: '',
        to: '',
        level: 0,
        component: '',
        type: '功能菜单',
        children: [
            {
                key: 'database_pool',
                title: 'druid',
                icon: '',
                parent_key: 'assistant_manager',
                to: '/database_tool',
                type: '功能菜单',
                level: 1,
                component: '',
            },{
                key: 'interval',
                title: 'cron',
                icon: '',
                parent_key: 'assistant_manager',
                to: '/interval',
                type: '功能菜单',
                level: 1,
                component: 'AuxCron',
            },{
                key: 'json',
                title: 'json',
                icon: '',
                parent_key: 'assistant_manager',
                to: '/json',
                type: '功能菜单',
                level: 1,
                component: 'AuxJson',
            },
        ]
    }))

//作业类型
const jobTypes = []
jobTypes.push(Mock.mock({
    name: '脚本作业',
    code: 'script'
}))
jobTypes.push(Mock.mock({
    name: '配置作业',
    code: 'config'
}))
jobTypes.push(Mock.mock({
    name: 'Shell作业',
    code: 'shell'
}))

//字典类型
const dic_types = []
dic_types.push(Mock.mock({
    name: '数据库类型',
    code: 'database'
}))
dic_types.push(Mock.mock({
    name: '字典类型',
    code: 'normal_dic'
}))

export {Jobs, job_monitor_analysis, 
    input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
    input_range_date, input_range_week, input_range_month, input_range_year, output_range_date, output_range_week, output_range_month, output_range_year,
    sum_dic_list, sum_dic_list_change,
    database_manager,role_manager,user_manager,project_manager,
    data_system_log, menu,
    jobTypes,
    dic_types}
