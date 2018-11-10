import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {Jobs, job_monitor_analysis, 
            input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
            input_range_date, input_range_week, input_range_month, input_range_year,
            output_range_date, output_range_week, output_range_month, output_range_year,
            sum_dic_list, change_sum_dic_mysql, database_manager,menu_manager,role_manager,
            user_manager,project_manager,
            data_system_log,
            menu, deleteJobs, firstJob, job_types, add_job, add_dic, remain_dic, dic_types} from './data';

const mock = new MockAdapter(axios);

mock.onGet('/user')
    .reply(200, {
        user: {
            name: "aaa",
            age: 11
        }
        
    })

mock.onPost('/findJobs')
    .reply('200', {
        list: Jobs
    })

mock.onPost('jobMonitor/loadData')
    .reply('200', {
        list: job_monitor_analysis
    })

mock.onPost('jobMonitor/loadEcharts', { type: 'input' , datet: 'date'} )
    .reply('200', {
        list: input_date
    })

mock.onPost('jobMonitor/loadEcharts', { type: 'output' , datet: 'date'} )
    .reply('200', {
        list: output_date
    })

mock.onPost('jobMonitor/loadEcharts', { type: 'input' , datet: 'week'} )
    .reply('200', {
        list: input_week
    })

mock.onPost('jobMonitor/loadEcharts', { type: 'output' , datet: 'week'} )
.reply('200', {
    list: output_week
})

mock.onPost('jobMonitor/loadEcharts', { type: 'input' , datet: 'month'} )
    .reply('200', {
        list: input_month
    })

mock.onPost('jobMonitor/loadEcharts', { type: 'output' , datet: 'month'} )
.reply('200', {
    list: output_month
})

mock.onPost('jobMonitor/loadEcharts', { type: 'input' , datet: 'year'} )
    .reply('200', {
        list: input_year
    })

mock.onPost('jobMonitor/loadEcharts', { type: 'output' , datet: 'year'} )
    .reply('200', {
        list: output_year
})

mock.onPost('jobMonitor/showRange', {type: 'input', datet: 'date'})
    .reply('200', {
        rangeData: input_range_date
    })

mock.onPost('jobMonitor/showRange', {type: 'input', datet: 'week'})
    .reply('200', {
        rangeData: input_range_week
    })

mock.onPost('jobMonitor/showRange', {type: 'input', datet: 'month'})
    .reply('200', {
        rangeData: input_range_month
    })

mock.onPost('jobMonitor/showRange', {type: 'input', datet: 'year'})
    .reply('200', {
        rangeData: input_range_year
    })

mock.onPost('jobMonitor/showRange', {type: 'output', datet: 'date'})
    .reply('200', {
        rangeData: output_range_date
    })

mock.onPost('jobMonitor/showRange', {type: 'output', datet: 'week'})
    .reply('200', {
        rangeData: output_range_week
    })

mock.onPost('jobMonitor/showRange', {type: 'output', datet: 'month'})
    .reply('200', {
        rangeData: output_range_month
    })

mock.onPost('jobMonitor/showRange', {type: 'output', datet: 'year'})
    .reply('200', {
        rangeData: output_range_year
    })

mock.onPost('sumDic/showList',{
    dic_code: '',
    dic_name: '',
    dic_type: ''
}).reply('200', {
    list: sum_dic_list
})

mock.onPost('sumDic/changeDisabled',{
    record: ''
}).reply('200', {
    record: change_sum_dic_mysql
})
mock.onPost('databaseManager/findList').reply(
    '200', {
        list: database_manager
    }
)

mock.onPost('menuManager/findList').reply(
    '200', {
        list: menu
    }
)

mock.onPost('systemLog/findLogs', {
    operator: '',
    log_type: '',
    operate_ip: '',
    details: '',
    create_time: ''
}).reply('200', {
    list: data_system_log
})

mock.onPost('roleManager/findRoles').reply(
    '200',{
        list: role_manager
    }
)

mock.onPost('userManager/findUsers').reply(
    '200',{
        list: user_manager
    }
)

mock.onPost('projectManager/findProjects').reply(
    '200',{
        list: project_manager
    }
)

mock.onPost('homeController/loadMenu')
    .reply('200', {
        list: menu
    })

mock.onPost('jobManagerController/deleteJobById', {
    job_id: '1'
}).reply('200', {
    list: deleteJobs
})

mock.onPost('jobManagerController/findJobById/1')
    .reply('200', {
        job: firstJob
    })

mock.onPost('jobManagerController/findJobTypes')
    .reply('200', {
        list: job_types
    })

mock.onPost('jobManager/saveJob')
    .reply('200', {
        job: add_job
    })

mock.onPost('sumDic/saveDic', {
        dic_name: '',
        dic_code: '',
        dic_type: '',
        belongs: '',
    }).reply('200', {
        dic: add_dic
    })

mock.onPost('sumDic/deleteDicByIds')
    .reply('200', {
        list: remain_dic
    })

mock.onPost('sumDic/findDicTypes')
    .reply('200', {
        list: dic_types
    })
