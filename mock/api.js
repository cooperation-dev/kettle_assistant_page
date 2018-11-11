import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';

import {Jobs, job_monitor_analysis, 
            input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
            input_range_date, input_range_week, input_range_month, input_range_year,
            output_range_date, output_range_week, output_range_month, output_range_year,
            sum_dic_list, database_manager,role_manager,
            user_manager,project_manager,
            data_system_log,
            menu, job_types, remain_dic, dic_types} from './data';

const mock = new MockAdapter(axios);

mock.onPost('jobManagerController/findJobs')
    .reply(config => {
        let {job_id, job_name, job_desc, job_type, job_state, creator} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = Jobs
            if(job_id!=undefined && job_id!=""){
                newjob = newjob.filter(job => job.job_id==job_id)
            }
            if(job_name!=undefined && job_name!=""){
                newjob = newjob.filter(job => job.job_name==job_name)
            }
            if(job_desc!=undefined && job_desc!=""){
                newjob = newjob.filter(job => job.job_desc==job_desc)
            }
            if(job_type!=undefined && job_type!=""){
                newjob = newjob.filter(job => job.job_type==job_type)
            }
            if(job_state!=undefined && job_state!=""){
                newjob = newjob.filter(job => job.job_state==job_state)
            }
            if(creator!=undefined && creator!=""){
                newjob = newjob.filter(job => job.creator==creator)
            }
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('jobMonitor/loadData')
    .reply('200', job_monitor_analysis)

mock.onPost('jobMonitorController/loadEcharts')
    .reply(config => {
        let {type, datet} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newlist
            if(type=='input' && datet=='date'){
                newlist = input_date
            }else if(type=='input' && datet=='week'){
                newlist = input_week
            }else if(type=='input' && datet=='month'){
                newlist = input_month
            }else if(type=='input' && datet=='year'){
                newlist = input_year
            }else if(type=='output' && datet=='date'){
                newlist = output_date
            }else if(type=='output' && datet=='week'){
                newlist = output_week
            }else if(type=='output' && datet=='month'){
                newlist = output_month
            }else if(type=='output' && datet=='year'){
                newlist = output_year
            }
            setTimeout(() => {
                resolve([200, newlist]);
            }, 500);
        })
    })

mock.onPost('jobMonitorController/showRange')
    .reply(config => {
        let {type, datet} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let rangeData
            if(type=='input' && datet=='date'){
                rangeData = input_range_date
            }else if(type=='input' && datet=='week'){
                rangeData = input_range_week
            }else if(type=='input' && datet=='month'){
                rangeData = input_range_month
            }else if(type=='input' && datet=='year'){
                rangeData = input_range_year
            }else if(type=='output' && datet=='date'){
                rangeData = output_range_date
            }else if(type=='output' && datet=='week'){
                rangeData = output_range_week
            }else if(type=='output' && datet=='month'){
                rangeData = output_range_month
            }else if(type=='output' && datet=='year'){
                rangeData = output_range_year
            }
            setTimeout(() => {
                resolve([200, rangeData]);
            }, 500);
        })
    })

mock.onPost('sumDicController/showList')
    .reply(config => {
        let {dic_code, dic_name, disabled, dic_type} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list
            if(dic_code!=undefined && dic_code!=""){
                newdic = newdic.filter(dic => dic.dic_code==dic_code)
            }
            if(dic_name!=undefined && dic_name!=""){
                newdic = newdic.filter(dic => dic.dic_name==dic_name)
            }
            newdic = newdic.filter(dic => dic.is_disabled==disabled)
            if(dic_type!=undefined && dic_type!=""){
                newdic = newdic.filter(dic => dic.dic_type==dic_type)
            }
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('sumDicController/changeDisabled')
    .reply(config => {
        let row = JSON.parse(config.data)
        row.is_disabled = !row.is_disabled
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, row]);
            }, 500);
        })
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
}).reply('200', data_system_log)

mock.onPost('systemLogController/findLogs')
    .reply(config => {
        let {operator, log_type, operate_ip, details, create_time} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newlog = data_system_log
            if(operator!=undefined && operator!=""){
                newlog = newlog.filter(log => log.operator==operator)
            }
            if(log_type!=undefined && log_type!=""){
                newlog = newlog.filter(log => log.log_type==log_type)
            }
            if(operate_ip!=undefined && operate_ip!=""){
                newlog = newlog.filter(log => log.operate_ip==operate_ip)
            }
            if(details!=undefined && details!=""){
                newlog = newlog.filter(log => log.details==details)
            }
            if(create_time!=undefined && create_time!=""){
                newlog = newlog.filter(log => log.create_time==create_time)
            }
            setTimeout(() => {
                resolve([200, newlog]);
            }, 500);
        })
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
    .reply('200', menu)

mock.onPost('jobManagerController/deleteJobByIds')
    .reply(config => {
        let ids = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = []
            for(let i=0; i<Jobs.length; i++){
                let flag = true
                for(let j=0; j<ids.length; j++){
                    if(ids[j] == Jobs[i].job_id){
                        flag = false
                        break;
                    }
                }
                if(flag){
                    newjob.push(Jobs[i])
                }
            }
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

for(let i=0; i<Jobs.length; i++){
    let job = Jobs[i]
    mock.onPost('jobManagerController/findJobById/'+job.job_id)
    .reply('200', job)
}

mock.onPost('jobManagerController/findJobTypes')
    .reply('200', job_types)

mock.onPost('jobManager/saveJob')
    .reply(config => {
        let {job_name, job_type, job_desc} = JSON.parse(config.data)
        let job_type_cn = job_types.filter(t => t.code==job_type)[0].name
        return new Promise((resolve, reject) => {
            let max_key = Jobs[Jobs.length-1].key+1
            let newjob = Mock.mock({
                key: "" + (max_key),
                job_id: ""+(max_key),
                job_name: job_name,
                job_desc: job_desc,
                cron_set: Mock.Random.integer(1, 10) + '分钟',
                job_type: job_type_cn,
                job_state: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
                run_state: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
                modify_time: '2018-10-17 00:00:00',
                creator: 'adan',
                create_time: '2018-10-17 00:00:00',
                log: Mock.Random.string(2000)
            })
            // Jobs.push(newjob)
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('sumDicController/saveDic')
    .reply(config => {
        let {dic_name, dic_code, dic_type, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let max_index = sum_dic_list[sum_dic_list.length-1].index+1
            let newdic = {
                index: max_index,
                key: 'test'+max_index,
                dic_code: dic_code,
                dic_name: dic_name,
                sort: 110,
                create_time: "2018-09-09 12:34:44",
                modify_time: '2018-09-18 01:23:46',
                creator: 'adan',
                is_disabled: true,
                dic_type: dic_type,
                belongs: belongs
            }
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('sumDicController/deleteDicByIds')
    .reply(config => {
        let codes = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = []
            for(let i=0; i<sum_dic_list.length; i++){
                let flag = true
                for(let j=0; j<codes.length; j++){
                    if(codes[j] == sum_dic_list[i].dic_code){
                        flag = false
                        break;
                    }
                }
                if(flag){
                    newdic.push(sum_dic_list[i])
                }
            }
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('sumDic/findDicTypes')
    .reply('200', dic_types)

mock.onPost('jobManagerController/updateJob')
    .reply(config => {
        let {job_id, job_name, job_type, job_desc} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = Jobs.filter(job => job.job_id==job_id)[0]
            if(job_name!=undefined && job_name!=''){
                newjob.job_name = job_name
            }
            if(job_type!=undefined && job_type!=''){
                newjob.job_type = job_type
            }
            if(job_desc!=undefined && job_desc!=''){
                newjob.job_desc = job_desc
            }
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('sumDicController/updateDic')
    .reply(config => {
        let {dic_id, dic_name, dic_code, dic_type, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list.filter(dic => dic.dic_id==dic_id)[0]
            if(dic_name!=undefined && dic_name!=''){
                newdic.dic_name = dic_name
            }
            if(dic_code!=undefined && dic_code!=''){
                newdic.dic_code = dic_code
            }
            if(dic_type!=undefined && dic_type!=''){
                newdic.dic_type = dic_type
            }
            if(belongs!=undefined && belongs!=''){
                newdic.belongs = belongs
            }
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

for(let i=0; i<sum_dic_list.length; i++){
    let dic = sum_dic_list[i]
    mock.onPost('sumDicController/findDicById/'+dic.dic_id)
    .reply('200', dic)
}