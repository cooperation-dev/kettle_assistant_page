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
            menu, jobTypes, dic_types} from './data';

const mock = new MockAdapter(axios);

mock.onPost('/api/jobManagerController/findJobs')
    .reply(config => {
        let {id, name, description, jobType, state, creator} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = Jobs
            if(id!=undefined && id!=""){
                newjob = newjob.filter(job => job.id==id)
            }
            if(name!=undefined && name!=""){
                newjob = newjob.filter(job => job.name==name)
            }
            if(description!=undefined && description!=""){
                newjob = newjob.filter(job => job.description==description)
            }
            if(jobType!=undefined && jobType!=""){
                newjob = newjob.filter(job => job.jobType==jobType)
            }
            if(state!=undefined && state!=""){
                newjob = newjob.filter(job => job.state==state)
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
        let {code, name, valid, dicType} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list
            if(code!=undefined && code!=""){
                newdic = newdic.filter(dic => dic.code==code)
            }
            if(name!=undefined && name!=""){
                newdic = newdic.filter(dic => dic.name==name)
            }
            newdic = newdic.filter(dic => dic.valid==valid)
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
        row.valid = !row.valid
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

mock.onPost('roleManager/addRoleSure')
.reply(config => {
    let {roleName, roleDescription} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = role_manager[role_manager.length-1].key+1
        let newRole = Mock.mock({
            key: "" + (max_key),
            id: ""+(max_key),
            role_name: roleName,
            role_description: roleDescription
        })
        setTimeout(() => {
            resolve([200, {
                role: newRole
            }]);
        }, 500);
    })
})

mock.onPost('roleManager/deleteRoleByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newRole = []
        for(let i=0; i<role_manager.length; i++){
            let flag = true
            for(let j=0; j<ids.length; j++){
                if(ids[j] == role_manager[i].id){
                    flag = false
                    break;
                }
            }
            if(flag){
                newRole.push(role_manager[i])
            }
        }
        setTimeout(() => {
            resolve([200, {
                list: newRole
            }]);
        }, 500);
    })
})

mock.onPost('roleManager/updateRoleSure')
.reply(config => {
    let {roleId, roleName, roleDescription} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newRole = role_manager.filter(role => role.id==roleId)[0]
        if(roleName!=undefined && roleName!=''){
            newRole.role_name = roleName
        }
        if(roleDescription!=undefined && roleDescription!=''){
            newRole.role_description = roleDescription
        }
        setTimeout(() => {
            resolve([200, {
                role: newRole
            }]);
        }, 500);
    })
})

mock.onPost('roleManager/findRoles').reply(
    '200',{
        list: role_manager
    }
)

mock.onPost('userManager/addUserSure')
.reply(config => {
    let {nickName, loginAccount, role} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = user_manager[user_manager.length-1].key+1
        let newUser = Mock.mock({
            key: "" + (max_key),
            id: ""+(max_key),
            nick_name: nickName,
            login_account: loginAccount,
            role: role
        })
        setTimeout(() => {
            resolve([200, {
                user: newUser
            }]);
        }, 500);
    })
})

mock.onPost('userManager/deleteUserByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newUser = []
        for(let i=0; i<user_manager.length; i++){
            let flag = true
            for(let j=0; j<ids.length; j++){
                if(ids[j] == user_manager[i].id){
                    flag = false
                    break;
                }
            }
            if(flag){
                newUser.push(user_manager[i])
            }
        }
        setTimeout(() => {
            resolve([200, {
                list: newUser
            }]);
        }, 500);
    })
})

mock.onPost('userManager/updateUserSure')
.reply(config => {
    let {id, nickName, role} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newUser = user_manager.filter(user => user.id==id)[0]
        if(nickName!=undefined && nickName!=''){
            newUser.nick_name = nickName
        }
        if(role!=undefined && role!=''){
            newUser.role = role
        }
        setTimeout(() => {
            resolve([200, {
                user: newUser
            }]);
        }, 500);
    })
})

mock.onPost('userManager/findUsers').reply(
    '200',{
        list: user_manager
    }
)

mock.onPost('projectManager/addProjectSure')
.reply(config => {
    let {name, projectUrl, sort, whetherToDisable} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = project_manager[project_manager.length-1].key+1
        let newProject = Mock.mock({
            key: "" + (max_key),
            obj_code: ""+(max_key),
            obj_name: name,
            create_time: '2018-11-14 00:00:00',
            create_name: 'Dawn',
            project_url: projectUrl,
            obj_sort: sort,
            whether_to_disable: whetherToDisable,
            status: Mock.Random.integer(0,1)==0?'成功':'失败'
        })
        setTimeout(() => {
            resolve([200, {
                project: newProject
            }]);
        }, 500);
    })
})

mock.onPost('projectManager/deleteProjectByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newProject = []
        for(let i=0; i<project_manager.length; i++){
            let flag = true
            for(let j=0; j<ids.length; j++){
                if(ids[j] == project_manager[i].obj_code){
                    flag = false
                    break;
                }
            }
            if(flag){
                newProject.push(project_manager[i])
            }
        }
        setTimeout(() => {
            resolve([200, {
                list: newProject
            }]);
        }, 500);
    })
})

mock.onPost('projectManager/updateProjectSure')
.reply(config => {
    let {id, name, projectUrl, sort} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newProject = project_manager.filter(project => project.obj_code==id)[0]
        if(name!=undefined && name!=''){
            newProject.obj_name = name
        }
        if(projectUrl!=undefined && projectUrl!=''){
            newProject.project_url = projectUrl
        }
        if(sort!=undefined && sort!=''){
            newProject.obj_sort = sort
        }
        setTimeout(() => {
            resolve([200, {
                project: newProject
            }]);
        }, 500);
    })
})

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
                    if(ids[j] == Jobs[i].id){
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
    mock.onPost('/api/jobManagerController/findJobById/'+job.id)
    .reply('200', job)
}

mock.onPost('/api/jobManagerController/findJobTypes')
    .reply('200', jobTypes)

mock.onPost('/api/jobManagerController/saveJob')
    .reply(config => {
        let {name, jobType, description} = JSON.parse(config.data)
        let jobTypeCn = jobTypes.filter(t => t.code==jobType)[0].name
        return new Promise((resolve, reject) => {
            let maxKey = Jobs[Jobs.length-1].key+1
            let newjob = Mock.mock({
                id: ""+(maxKey),
                name: name,
                description: description,
                cronSet: Mock.Random.integer(1, 10) + '分钟',
                jobType: jobTypeCn,
                state: Mock.Random.integer(0,1)==0?'正在运行':'运行完成',
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
        let {name, code, dicType, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = {
                code: code,
                name: name,
                sort: 110,
                createTime: "2018-09-09 12:34:44",
                modifyTime: '2018-09-18 01:23:46',
                creator: 'adan',
                valid: 'N',
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
        let ids = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = []
            for(let i=0; i<sum_dic_list.length; i++){
                let flag = true
                for(let j=0; j<ids.length; j++){
                    if(ids[j] == sum_dic_list[i].id){
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
    .reply(config => {
        let code = config.data
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list
            if(code!=undefined && code!=""){
                let newdicone = sum_dic_list.filter(dic => dic.code==code)[0]
                newdic = newdic.filter(dic => {
                    return dic.sort.toString().charAt(0)==newdicone.id
                })
            }
            
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('/api/sumDicController/findRootDicTypes')
    .reply(() => {
        let newdic = sum_dic_list.filter(dic => dic.parentId==undefined||dic.parentId=="")
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, newdic]);
            }, 500);
        })
    })

mock.onPost('/api/jobManagerController/updateJob')
    .reply(config => {
        let {id, name, jobType, description} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newjob = Jobs.filter(job => job.id==id)[0]
            if(name!=undefined && name!=''){
                newjob.name = name
            }
            if(jobType!=undefined && jobType!=''){
                newjob.jobType = jobType
            }
            if(description!=undefined && description!=''){
                newjob.description = description
            }
            setTimeout(() => {
                resolve([200, newjob]);
            }, 500);
        })
    })

mock.onPost('/api/sumDicController/updateDic')
    .reply(config => {
        let {id, name, code, dicType, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newdic = sum_dic_list.filter(dic => dic.id==id)[0]
            if(name!=undefined && name!=''){
                newdic.name = name
            }
            if(code!=undefined && code!=''){
                newdic.code = code
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
    mock.onPost('/api/sumDicController/findDicById/'+dic.id)
    .reply('200', dic)
}

mock.onPost('/api/sumDicController/findName')
    .reply('200', 'aaa')