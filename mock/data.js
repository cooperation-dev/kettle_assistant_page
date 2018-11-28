import Mock from 'mockjs';

//作业管理
const Jobs = []
for(let i=1; i<=11; i++){
    Jobs.push(Mock.mock({
        id: i+"",
        name: "测试作业" + i,
        description: "描述测试作业" + i,
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
    id: 1,
    code: 'dic_type',
    name: '字典类型',
    sort: 1,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    valid: 'Y',
    dicType: 'dic_type',
    dicTypeCN: '字典管理', 
    belongs: '',
    parentId: ''
})
const org_sum_dic_mysql = Mock.mock({
    id: 2,
    code: 'database_type',
    name: '数据库类型',
    sort: 2,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    valid: 'Y',
    belongs: '',
    parentId: ''
})
const org_sum_dic_sqlserver = Mock.mock({
    id: 3,
    code: 'valid',
    name: '有效性',
    sort: 11,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    valid: 'Y',
    belongs: '字典类型',
    parentId: 1
})
const org_sum_dic_success_failed = Mock.mock({
    id: 4,
    code: 'Y',
    name: '有效',
    sort: 111,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    valid: 'Y',
    belongs: '有效性',
    parentId: 3
})
const org_sum_dic_encoding = Mock.mock({
    id: 5,
    code: 'N',
    name: '无效',
    sort: 112,
    createTime: "2018-09-09 12:34:44",
    modifyTime: '2018-09-18 01:23:46',
    creator: 'adan',
    valid: 'Y',
    belongs: '有效性',
    parentId: 3
})
sum_dic_list.push(org_sum_dic_oracle)
sum_dic_list.push(org_sum_dic_mysql)
sum_dic_list.push(org_sum_dic_sqlserver)
sum_dic_list.push(org_sum_dic_success_failed)
sum_dic_list.push(org_sum_dic_encoding)

/**
 * 数据库管理
 */
const database_manager = []
for(let i=1; i<=11; i++){
    database_manager.push(Mock.mock({
        key: i+"",
        id: i+"",
        name: "测试名称" + i,
        sort: i+"",
        createTime: '2018-11-05 00:00:00',
        createName: 'Dawn',
        valid: Mock.Random.integer(0,1)==0?'Y':'N',
        agencyName: 'Dawn',
        agencyCode: 'dawn_leewp@163.com',
        dbType: '-',
        interviewMethod: 'Native',
        jndiName: '-',
        connectionString: '-'
    }))
}

/***
 * 日志管理
 */
const data_system_log = []
for(let i=0; i<=10; i++){
    data_system_log.push(Mock.mock({
        // key: i+1,
        id: i+1,
        "operateUser|1": ['adan', "zhangsan", "lisi", "wangwu"],
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
        key: i + 1,
        id: i + 1,
        nickName: 'Name' + (i + 1),
        loginAccount: i + '7' + i + '546',
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
        name: 'Name' + (i + 1),
        description: 'Description' + (i + 1)
    }))
}

/**
 * 项目管理
 */
const project_manager = []
for(let i=0; i<=10; i++){
    project_manager.push(Mock.mock({
        key: i + 1,
        id: i + 1,
        name: 'Name' + (i + 1),
        sort: i + 1,
        createTime: '2018-11-05 00:00:00',
        createName: 'CreateName' + (i + 1),
        valid:Mock.Random.integer(0,1) ==0 ? 'Y':'N',
        projectUrl: 'www.test.com',
        status: Mock.Random.integer(0,1) == 0?'成功':'失败'
    }))
}

/***
 * 菜单
 */
const menu = []
    menu.push(Mock.mock({
        key: 1,
        id: 1,
        code: "job_manager",
        name: "作业管理",
        icon: "file",
        parentId: "",
        direction: "",
        level: 0,
        type: '功能菜单',
        component: '',
        valid: 'Y',
        children: [
            {
                key: 11,
                id: 11,
                code: 'job_manager_detail',
                name: "作业管理",
                icon: "",
                parentId: "job_manager",
                direction: "/job_manager",
                level: 1,
                type: '功能菜单',
                component: 'JobManager',
                valid: 'Y',
                // component: 'bundle-loader?lazy&name=[name]!pages/JobManager/JobManager',
                // component: 'pages/JobManager/JobManager',
            },{
                key: 12,
                id: 12,
                code: 'job_monitor',
                name: '作业监控',
                icon: '',
                parentId: 'job_manager',
                direction: '/job_monitor',
                level: 1,
                type: '功能菜单',
                component: 'JobMonitor',
                valid: 'Y',
                // component: 'pages/JobMonitor/JobMonitor',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 2,
        id: 2,
        code: 'dic_manager',
        name: '字典管理',
        icon: 'tablet',
        parentId: '',
        direction: '',
        level: 0,
        type: '功能菜单',
        component: '',
        valid: 'Y',
        children: [
            {
                key: 21,
                id: 21,
                code: 'sum_dic',
                name: '统一字典',
                icon: '',
                parentId: 'dic_manager',
                direction: '/sum_dic',
                level: 1,
                type: '功能菜单',
                component: 'SumDic',
                valid: 'Y',
                // component: 'pages/SumDic/SumDic',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 3,
        id: 3,
        code: 'config_manager',
        name: '配置管理',
        icon: 'database',
        parentId: '',
        direction: '',
        component: '',
        level: 0,
        type: '功能菜单',
        valid: 'Y',
        children: [
            {
                key: 31,
                id: 31,
                code: 'database_manager',
                name: '数据库管理',
                icon: '',
                parentId: 'config_manager',
                direction: '/database_manager',
                level: 1,
                type: '功能菜单',
                component: 'DatabaseManager',
                valid: 'Y',
                // component: 'pages/DatabaseManager/DatabaseManager',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 4,
        id: 4,
        code: 'system_manager',
        name: '系统管理',
        icon: 'tool',
        parentId: '',
        direction: '',
        component: '',
        level: 0,
        type: '功能菜单',
        valid: 'Y',
        children: [
            {
                key: 41,
                id: 41,
                code: 'menu_manager',
                name: '菜单管理',
                icon: '',
                parentId: 'system_manager',
                direction: '/menu_manager',
                level: 1,
                type: '功能菜单',
                component: 'MenuManager',
                valid: 'Y',
            },{
                key: 42,
                id: 42,
                code: 'user_manager',
                name: '用户管理',
                icon: '',
                parentId: 'system_manager',
                direction: '/user_manager',
                type: '功能菜单',
                level: 1,
                component: 'UserManager',
                valid: 'Y',
            },{
                key: 43,
                id: 43,
                code: 'role_manager',
                name: '角色管理',
                icon: '',
                parentId: 'system_manager',
                type: '功能菜单',
                direction: '/role_manager',
                level: 1,
                component: 'RoleManager',
                valid: 'Y',
            },{
                key: 44,
                id: 44,
                code: 'project_manager',
                name: '项目管理',
                icon: '',
                parentId: 'system_manager',
                type: '功能菜单',
                direction: '/project_manager',
                level: 1,
                component: 'ProjectManager',
                valid: 'Y',
            },{
                key: 45,
                id: 45,
                code: 'system_log',
                name: '系统日志',
                icon: '',
                type: '功能菜单',
                parentId: 'system_manager',
                direction: '/system_log',
                level: 1,
                component: 'SystemLog',
                valid: 'Y',
            },
        ]
    }))
    menu.push(Mock.mock({
        key: 5,
        id: 5,
        code: 'assistant_tool',
        name: '辅助工具',
        icon: 'tag-o',
        parentId: '',
        direction: '',
        level: 0,
        component: '',
        type: '功能菜单',
        valid: 'Y',
        children: [
            {
                key: 51,
                id: 51,
                code: 'database_pool',
                name: 'druid',
                icon: '',
                parentId: 'assistant_tool',
                direction: '/database_tool',
                type: '功能菜单',
                level: 1,
                component: '',
                valid: 'Y',
            },{
                key: 52,
                id: 52,
                code: 'interval',
                name: 'cron',
                icon: '',
                parentId: 'assistant_manager',
                direction: '/interval',
                type: '功能菜单',
                level: 1,
                component: 'AuxCron',
                valid: 'Y',
            },{
                key: 53,
                id: 53,
                code: 'json',
                name: 'json',
                icon: '',
                parentId: 'assistant_manager',
                direction: '/json',
                type: '功能菜单',
                level: 1,
                component: 'AuxJson',
                valid: 'Y',
            },
        ]
    }))

//作业类型
const jobTypes = []
jobTypes.push(Mock.mock({
    id: 1,
    name: '脚本作业',
    code: 'script'
}))
jobTypes.push(Mock.mock({
    id: 2,
    name: '配置作业',
    code: 'config'
}))
jobTypes.push(Mock.mock({
    id: 3,
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

const dic_tree = [
    {
        title: '字典类型',
        name: '字典类型',
        key: 'dic_type',
        value: 'dic_type',
        children: [
            {
                title: '有效性',
                name: '有效性',
                key: 'valid', 
                value: 'valid',
                children: [
                    {
                        title: '有效',
                        name: '有效',
                        key: 'Y',
                        value: 'Y'
                    },{
                        title: '无效',
                        name: '无效',
                        key: 'N',
                        value: 'N'
                    }
                ]
            }
        ]
    },
    {
        title: '数据库类型',
        name: '数据库类型',
        key: 'database_type', 
        value: 'database_type', 
    }
]

export {Jobs, job_monitor_analysis, 
    input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
    input_range_date, input_range_week, input_range_month, input_range_year, output_range_date, output_range_week, output_range_month, output_range_year,
    sum_dic_list, 
    database_manager,role_manager,user_manager,project_manager,
    data_system_log, menu,
    jobTypes,
    dic_types, dic_tree}
