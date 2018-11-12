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
            menu, jobTypes, remain_dic, dic_types} from './data';

const mock = new MockAdapter(axios);

mock.onPost('/api/jobManagerController/findJobs')
    .reply(config => {
        let {jobId, jobName, jobDesc, jobType, jobState, creator} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = Jobs
            if(jobId!=undefined && jobId!=""){
                newjob = newjob.filter(job => job.jobId==jobId)
            }
            if(jobName!=undefined && jobName!=""){
                newjob = newjob.filter(job => job.jobName==jobName)
            }
            if(jobDesc!=undefined && jobDesc!=""){
                newjob = newjob.filter(job => job.jobDesc==jobDesc)
            }
            if(jobType!=undefined && jobType!=""){
                newjob = newjob.filter(job => job.jobType==jobType)
            }
            if(jobState!=undefined && jobState!=""){
                newjob = newjob.filter(job => job.jobState==jobState)
            }
            if(creator!=undefined && creator!=""){
                newjob = newjob.filter(job => job.creator==creator)
            }
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('/api/jobMonitorController/loadData')
    .reply('200', job_monitor_analysis)

mock.onPost('/api/jobMonitorController/loadEcharts')
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

mock.onPost('/api/jobMonitorController/showRange')
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

mock.onPost('/api/sumDicController/showList')
    .reply(config => {
        let {dicCode, dicName, disabled, dicType} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list
            if(dicCode!=undefined && dicCode!=""){
                newdic = newdic.filter(dic => dic.dicCode==dicCode)
            }
            if(dicName!=undefined && dicName!=""){
                newdic = newdic.filter(dic => dic.dicName==dicName)
            }
            newdic = newdic.filter(dic => dic.isDisabled==disabled)
            if(dicType!=undefined && dicType!=""){
                newdic = newdic.filter(dic => dic.dicType==dicType)
            }
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('/api/sumDicController/changeDisabled')
    .reply(config => {
        let row = JSON.parse(config.data)
        row.isDisabled = !row.isDisabled
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

mock.onPost('/api/systemLogController/findLogs')
    .reply(config => {
        let {operator, logType, operateIp, details, createTime} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newlog = data_system_log
            if(operator!=undefined && operator!=""){
                newlog = newlog.filter(log => log.operator==operator)
            }
            if(logType!=undefined && logType!=""){
                newlog = newlog.filter(log => log.logType==logType)
            }
            if(operateIp!=undefined && operateIp!=""){
                newlog = newlog.filter(log => log.operateIp==operateIp)
            }
            if(details!=undefined && details!=""){
                newlog = newlog.filter(log => log.details==details)
            }
            if(createTime!=undefined && createTime!=""){
                newlog = newlog.filter(log => log.createTime==createTime)
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

mock.onPost('/api/homeController/loadMenu')
    .reply('200', menu)

mock.onPost('/api/jobManagerController/deleteJobByIds')
    .reply(config => {
        let ids = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = []
            for(let i=0; i<Jobs.length; i++){
                let flag = true
                for(let j=0; j<ids.length; j++){
                    if(ids[j] == Jobs[i].jobId){
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
    mock.onPost('/api/jobManagerController/findJobById/'+job.jobId)
    .reply('200', job)
}

mock.onPost('/api/jobManagerController/findJobTypes')
    .reply('200', jobTypes)

mock.onPost('/api/jobManagerController/saveJob')
    .reply(config => {
        let {jobName, jobType, jobDesc} = JSON.parse(config.data)
        let jobTypeCn = jobTypes.filter(t => t.code==jobType)[0].name
        return new Promise((resolve, reject) => {
            let maxKey = Jobs[Jobs.length-1].key+1
            let newjob = Mock.mock({
                key: "" + (maxKey),
                jobId: ""+(maxKey),
                jobName: jobName,
                jobDesc: jobDesc,
                cronSet: Mock.Random.integer(1, 10) + '分钟',
                jobType: jobTypeCn,
                jobState: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
                runState: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
                modifyTime: '2018-10-17 00:00:00',
                creator: 'adan',
                createTime: '2018-10-17 00:00:00',
                log: Mock.Random.string(2000)
            })
            // Jobs.push(newjob)
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('/api/sumDicController/saveDic')
    .reply(config => {
        let {dicName, dicCode, dicType, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let maxIndex = sum_dic_list[sum_dic_list.length-1].index+1
            let newdic = {
                index: maxIndex,
                key: 'test'+maxIndex,
                dicCode: dicCode,
                dicName: dicName,
                sort: 110,
                createTime: "2018-09-09 12:34:44",
                modifyTime: '2018-09-18 01:23:46',
                creator: 'adan',
                isDisabled: true,
                dicType: dicType,
                belongs: belongs
            }
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('/api/sumDicController/deleteDicByIds')
    .reply(config => {
        let codes = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = []
            for(let i=0; i<sum_dic_list.length; i++){
                let flag = true
                for(let j=0; j<codes.length; j++){
                    if(codes[j] == sum_dic_list[i].dicCode){
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

mock.onPost('/api/sumDicController/findDicTypes')
    .reply('200', dic_types)

mock.onPost('/api/jobManagerController/updateJob')
    .reply(config => {
        let {jobId, jobName, jobType, jobDesc} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = Jobs.filter(job => job.jobId==jobId)[0]
            if(jobName!=undefined && jobName!=''){
                newjob.jobName = jobName
            }
            if(jobType!=undefined && jobType!=''){
                newjob.jobType = jobType
            }
            if(jobDesc!=undefined && jobDesc!=''){
                newjob.jobDesc = jobDesc
            }
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('/api/sumDicController/updateDic')
    .reply(config => {
        let {dicId, dicName, dicCode, dicType, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list.filter(dic => dic.dicId==dicId)[0]
            if(dicName!=undefined && dicName!=''){
                newdic.dicName = dicName
            }
            if(dicCode!=undefined && dicCode!=''){
                newdic.dicCode = dicCode
            }
            if(dicType!=undefined && dicType!=''){
                newdic.dicType = dicType
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
    mock.onPost('/api/sumDicController/findDicById/'+dic.dicId)
    .reply('200', dic)
}