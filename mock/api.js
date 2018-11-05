import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {Jobs, job_monitor_analysis, 
            input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
            input_range_date, input_range_week, input_range_month, input_range_year,
            output_range_date, output_range_week, output_range_month, output_range_year,
            sum_dic_list, sum_dic_list_change, change_sum_dic_mysql} from './data';

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