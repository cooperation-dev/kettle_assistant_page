import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';

import {reptiles, products, Jobs, job_monitor_analysis, 
            input_date, input_week, input_month, input_year, output_date, output_week, output_month, output_year,
            input_range_date, input_range_week, input_range_month, input_range_year,
            output_range_date, output_range_week, output_range_month, output_range_year,
            sum_dic_list, database_manager,role_manager,
            user_manager,project_manager,
            data_system_log,
            menu, jobTypes, dic_types, dic_tree} from './data';

const mock = new MockAdapter(axios);

//爬虫
mock.onGet('/reptileService/v1/jobs')
.reply(config => {
    let { pageNo, pageSize, data} = JSON.parse(config.data)
    let { name, status, platform, updateTime} = JSON.parse(JSON.stringify(data))
    return new Promise((resolve, reject) => {
        let reptileRespVO = reptiles
            if(name!=undefined && name!=""){
                reptileRespVO = reptileRespVO.filter(reptile => reptile.name==name)
            }
            if(status!=undefined && status!=""){
                reptileRespVO = reptileRespVO.filter(reptile => reptile.status==status)
            }
            if(platform!=undefined && platform!=""){
                reptileRespVO = reptileRespVO.filter(reptile => reptile.platform==platform)
            }
            if(updateTime!=undefined && updateTime!=""){
                reptileRespVO = reptileRespVO.filter(reptile => reptile.updateTime==updateTime)
            }

            let pageVO = {
                total: reptiles.length,
                pageNo: pageNo,
                pageSize: pageSize,
                data: reptileRespVO
            }
            let data = {
                code: '200',
                msg: '',
                data: pageVO,
            }
        resolve([200, data]);
    })
})
mock.onPost('/reptileService/v1/job')
.reply(config => {
    let { name, platform, type, timing} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let reptileRespVO = Mock.mock({
            reptileId: Mock.Random.id(),
            name: name,
            platform: platform,
            type: type,
            timing: timing,
            status: "未开始运行",
            updater: "test",
            updateTime: '2019-01-05 00:00:00',
        })

        let data = {
            code:'200',
            msg: '',
            data: reptileRespVO,
        }
        resolve([200, data]);
    })
})
for(let i=0; i<reptiles.length; i++){
    let reptileRespVO = reptiles[i]
    mock.onGet('/reptileService/v1/job/'+reptileRespVO.reptileId)
    .reply(() => {
        return new Promise((resolve, reject) => {
            let data = {
                code: '200',
                msg: '',
                data: reptileRespVO,
            }
            resolve([200, data])
        })
    })
}
for(let i=0; i<reptiles.length; i++){
    let reptileRespVO = reptiles[i]
    mock.onPut('/reptileService/v1/job/'+reptileRespVO.reptileId)
    .reply(config => {
        let {name, platform, type, timing} = JSON.parse(config.data)
        if(name!=undefined && name!=''){
            reptileRespVO.name = name
        }
        if(platform!=undefined && platform!=''){
            reptileRespVO.platform = platform
        }
        if(type!=undefined && type!=''){
            reptileRespVO.type = type
        }
        if(timing!=undefined && timing!=''){
            reptileRespVO.timing = timing
        }
        return new Promise((resolve, reject) => {
            let data = {
                code: '200',
                msg: '',
                data: reptileRespVO,
            }
            resolve([200, data]);
        })
    })
}
for(let i=0; i<reptiles.length; i++){
    let reptile = reptiles[i]
    mock.onDelete('/reptileService/v1/job/'+reptile.reptileId)
    .reply(() => {
        return new Promise((resolve, reject) => {
            let data = {
                code: '200',
                msg: '',
                data: reptile.reptileId,
            }
            resolve([200, data])
        })
    })
}
for(let i=0; i<reptiles.length; i++){
    let reptileRespVO = reptiles[i]
    mock.onPost('/reptileService/v1/job/'+reptileRespVO.reptileId+'/starting')
    .reply(() => {
        reptileRespVO.status = '正在运行'
        return new Promise((resolve, reject) => {
            let data = {
                code: '200',
                msg: '',
                data: reptileRespVO,
            }
            resolve([200, data]);
        })
    })
}
for(let i=0; i<reptiles.length; i++){
    let reptileRespVO = reptiles[i];
    mock.onPost('/reptileService/v1/job/'+reptileRespVO.reptileId+'/pause')
    .reply(() => {
        reptileRespVO.status = '停止';
        return new Promise((resolve, reject) => {
            let data = {
                code: '200',
                msg: '',
                data: reptileRespVO,
            }
            resolve([200, data]);
        })
    })
}
//-------------------------------------------------------------------
//产品页面
mock.onGet('/productService/v1/products')
.reply(config => {
    let { pageNo, pageSize, data} = JSON.parse(config.data)
    let { name, platform} = JSON.parse(JSON.stringify(data))
    return new Promise((resolve, reject) => {
        let productRespVO = products
            if(name!=undefined && name!=""){
                productRespVO = productRespVO.filter(product => product.name==name)
            }
            if(platform!=undefined && platform!=""){
                productRespVO = productRespVO.filter(product => product.platform==platform)
            }

            let pageVO = {
                total: products.length,
                pageNo: pageNo,
                pageSize: pageSize,
                data: productRespVO
            }
            let data = {
                code: '200',
                msg: '',
                data: pageVO,
            }
        resolve([200, data]);
    })
})
//-------------------------------------------------------------------
//作业管理
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
//------------------------------------------------------------------------
//作业监控
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
//---------------------------------------------------------------
//字典管理
mock.onGet('/dicService/v1/dics')
    .reply(config => {
        let {pageSize, pageNo, data} = JSON.parse(config.data)
        let {name, code, type, belongs} = JSON.parse(JSON.stringify(data))
        return new Promise((resolve, reject) => {
            let DicRespVO = sum_dic_list
            if(name!=undefined && name!=""){
                DicRespVO = DicRespVO.filter(dic => dic.name==name)
            }
            if(code!=undefined && code!=""){
                DicRespVO = DicRespVO.filter(dic => dic.code==code)
            }
            if(type!=undefined && type!=""){
                DicRespVO = DicRespVO.filter(dic => dic.type==type)
            }
            if(belongs!=undefined && belongs!=""){
                DicRespVO = DicRespVO.filter(dic => dic.belongs==belongs)
            }

            let pageVo = {
                total: sum_dic_list.length,
                pageNo: pageNo,
                pageSize: pageSize,
                data: DicRespVO,
            }
            let data = {
                code: '200',
                msg: '',
                data: pageVo
            }
            setTimeout(() => {
                resolve([200, data]);
            }, 500);
        })
    })
    mock.onPost('/dicService/v1/dic')
    .reply(config => {
        let {name, code, belongs} = JSON.parse(config.data)
        //dicType中文
        let belongsCN=""
        //belongs中文
        if(belongs!=undefined && ""!=belongs){
            belongsCN = sum_dic_list.filter(ele => ele.code == belongs)[0].name;
        }
        let maxId = sum_dic_list[sum_dic_list.length-1].id+1
        return new Promise((resolve, reject) => {
            let dicRespVO = {
                id: maxId,
                code: code,
                name: name,
                sort: 110,
                createTime: "2018-09-09 12:34:44",
                modifyTime: '2018-09-18 01:23:46',
                creator: 'adan',
                valid: 'Y',
                belongs: belongsCN
            }

            let data = {
                code: '200',
                msg: '',
                data: dicRespVO
            }
            setTimeout(() => {
                resolve([200, data]);
            }, 500);
        })
    })
for(let i=0; i<sum_dic_list.length; i++){
    let sumDic = sum_dic_list[i]
    mock.onDelete('/dicService/v1/dic/'+sumDic.dic_id)
    .reply(() => {
        return new Promise((resolve, reject) => {
            let data = {
                code: '200',
                msg: '',
                data: sumDic.dic_id,
            }
            resolve([200, data]);
        })
    })
}
for(let i = 0; i < sum_dic_list.length; i++){
    let dicRespVo = sum_dic_list[i];
    mock.onPut('/dicService/v1/dic/'+dicRespVo.dic_id)
    .reply(config => {
        let {name, code, belongs} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            if(name!=undefined){
                dicRespVo.name = name
            }
            if(code!=undefined){
                dicRespVo.code = code
            }
            if(belongs!=undefined){
                if(belongs != ""){
                    //中文
                    let belongsCN = sum_dic_list.filter(ele => ele.code==belongs)[0].name
                    dicRespVo.belongs = belongsCN
                }else{
                    dicRespVo.belongs = ''
                }
            }
            
            let data = {
                code: '200',
                msg: '',
                data: dicRespVo
            }

            setTimeout(() => {
                resolve([200, data]);
            }, 500);

        })
    })
}
for(let i=0; i<sum_dic_list.length; i++){
    let dicRespVO = sum_dic_list[i]
    mock.onGet('/dicService/v1/dic/'+dicRespVO.dic_id)
        .reply(config => {
            let data = {
                code: '200',
                msg: '',
                data: dicRespVO
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, data]);
                }, 500);

            })
        })
}
mock.onGet('/api/sumDicController/findDicTree')
    .reply(config => {
        return new Promise((resolve, reject) => {

            let data = {
                code: '200',
                msg: '',
                data: dic_tree
            }

            setTimeout(() => {
                resolve([200, data]);
            }, 500);
        })
    })
mock.onPost('/api/sumDicController/changeDisabled')
    .reply(config => {
        let row = JSON.parse(config.data)
        row.valid = row.valid=='Y'?'N':'Y'

        let data = {
            code: '200',
            msg: '',
            data: row
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, data]);
            }, 500);
        })
    })
//-----------------------------------------------------------------
    mock.onPost('databaseManager/addDatabasetSure')
    .reply(config => {
        let {name, sort, agencyName, valid, agencyCode, dbType, interviewMethod, jndiName, connectionString} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let max_key = database_manager[database_manager.length-1].key+1
            let newDatabase = Mock.mock({
                key: "" + (max_key),
                id: ""+(max_key),
                name: name,
                sort: sort,
                createTime: '2018-11-16 00:00:00',
                createName: 'Dawn',
                valid: valid,
                agencyName: agencyName,
                agencyCode: agencyCode,
                dbType: dbType,
                interviewMethod: interviewMethod,
                jndiName: jndiName,
                connectionString: connectionString,
            })
            setTimeout(() => {
                resolve([200, newDatabase]);
            }, 500);
        })
    })
    
    mock.onPost('databaseManager/deleteDatabasesByIds')
    .reply(config => {
        let ids = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, ids]);
            }, 500);
        })
    })
    
    mock.onPost('databaseManager/updateDatabasetSure')
    .reply(config => {
        let {id, name, sort, agencyName, agencyCode, dbType, interviewMethod, jndiName, connectionString} = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            let newDatabase = database_manager.filter(database => database.id==id)[0]
            if(name!=undefined && name!=''){
                newDatabase.name = name
            }
            if(sort!=undefined && sort!=''){
                newDatabase.sort = sort
            }
            if(agencyName!=undefined && agencyName!=''){
                newDatabase.agencyName = agencyName
            }
            if(agencyCode!=undefined && agencyCode!=''){
                newDatabase.agencyCode = agencyCode
            }
            if(dbType!=undefined && dbType!=''){
                newDatabase.dbType = dbType
            }
            if(interviewMethod!=undefined && interviewMethod!=''){
                newDatabase.interviewMethod = interviewMethod
            }
            if(jndiName!=undefined && jndiName!=''){
                newDatabase.jndiName = jndiName
            }
            if(connectionString!=undefined && connectionString!=''){
                newDatabase.connectionString = connectionString
            }
            setTimeout(() => {
                resolve([200, {
                    database: newDatabase
                }]);
            }, 500);
        })
    })

mock.onPost('databaseManager/findList')
.reply(config => {
    let {id, name, agencyName, agencyCode, connectionString, createName, valid} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newDatabase = database_manager;
        if(id != undefined && id != ''){
            newDatabase = newDatabase.filter(database => database.id == id);
        }
        if(name != undefined && name != ''){
            newDatabase = newDatabase.filter(database => database.name == name);
        }
        if(agencyName != undefined && agencyName != ''){
            newDatabase = newDatabase.filter(database => database.agencyName == agencyName);
        }
        if(agencyCode != undefined && agencyCode != ''){
            newDatabase = newDatabase.filter(database => database.agencyCode == agencyCode);
        }
        if(connectionString != undefined && connectionString != ''){
            newDatabase = newDatabase.filter(database => database.connectionString == connectionString);
        }
        if(createName != undefined && createName != ''){
            newDatabase = newDatabase.filter(database => database.createName == createName);
        }
        if(valid != undefined && valid != ''){
            newDatabase = newDatabase.filter(database => database.valid == valid);
        }
        setTimeout(() => {
            resolve(['200',newDatabase])
        }, 500);
    })
})

for(let i = 0; i < database_manager.length; i++){
    let database = database_manager[i];
    mock.onGet('databaseManager/findDatabaseById/'+database.id)
    .reply(200, database);
}

mock.onPost('menuManager/addMenuSure')
.reply(config => {
    let {name, type, code, level, parentId, icon, direction, component, filterCondition, customFunc, valid} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = menu[menu.length-1].key+1
        let newMenu = Mock.mock({
            key: "" + (max_key),
            id: ""+(max_key),
            name: name,
            type: type,
            code: code,
            level: level,
            parentId: parentId,
            icon: icon,
            direction: direction,
            component: component,
            filterCondition: filterCondition,
            customFunc: customFunc,
            valid: valid,
        })
        let newMenuChildren;
        if(parentId != null && parentId != ''){
            newMenuChildren = menu.filter(m => m.code==parentId)[0];
            newMenu.id=newMenuChildren.id + '' + (newMenuChildren.children.length + 1)
            newMenuChildren.children.push(newMenu)
        }else {
            newMenuChildren = newMenu;
        }
        setTimeout(() => {
            resolve([200, newMenuChildren]);
        }, 500);
    })
})

mock.onPost('menuManager/deleteMenusByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, ids]);
        }, 500);
    })
})

mock.onPost('menuManager/updateMenuSure')
.reply(config => {
    let {id, name, type, code, level, parentId, icon, direction, component, filterCondition, customFunc} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newMenu = menu.filter(m => m.id==id)[0]
        if(name!=undefined && name!=''){
            newMenu.name = name
        }
        if(type!=undefined && type!=''){
            newMenu.type = type
        }
        if(code!=undefined && code!=''){
            newMenu.code = code
        }
        if(level!=undefined && level!=''){
            newMenu.level = level
        }
        if(parentId!=undefined && parentId!=''){
            newMenu.parentId = parentId
        }
        if(icon!=undefined && icon!=''){
            newMenu.icon = icon
        }
        if(direction!=undefined && direction!=''){
            newMenu.direction = direction
        }
        if(component!=undefined && component!=''){
            newMenu.component = component
        }
        if(filterCondition!=undefined && filterCondition!=''){
            newMenu.filterCondition = filterCondition
        }
        if(customFunc!=undefined && customFunc!=''){
            newMenu.customFunc = customFunc
        }
        setTimeout(() => {
            resolve([200, newMenu]);
        }, 500);
    })
})

mock.onPost('menuManager/findList').reply(
    '200', menu
)
let list = [];
for(let i = 0; i<menu.length; i++){
    list = list.concat(menu[i].children);
    list.push(menu[i]);
}

for(let i=0; i<list.length; i++){
    let m = list[i]
    mock.onGet('menuManager/findMenuById/'+m.id)
    .reply('200', m)
}

mock.onPost('menuManager/findParents')
.reply('200', menu)

mock.onPost('systemLog/findLogs', {
    operator: '',
    log_type: '',
    operate_ip: '',
    details: '',
    create_time: ''
}).reply('200', data_system_log)

mock.onPost('roleManager/addRoleSure')
.reply(config => {
    let {name, description} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = role_manager[role_manager.length-1].key+1
        let newRole = Mock.mock({
            key: "" + (max_key),
            id: ""+(max_key),
            name: name,
            description: description
        })
        setTimeout(() => {
            resolve([200, newRole]);
        }, 500);
    })
})

mock.onPost('roleManager/deleteRolesByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, ids]);
        }, 500);
    })
})

mock.onPost('roleManager/updateRoleSure')
.reply(config => {
    let {id, name, description} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newRole = role_manager.filter(role => role.id==id)[0]
        if(name!=undefined && name!=''){
            newRole.name = name
        }
        if(description!=undefined && description!=''){
            newRole.description = description
        }
        setTimeout(() => {
            resolve([200, newRole]);
        }, 500);
    })
})

mock.onPost('roleManager/findRoles')
.reply(config => {
    let {name} = JSON.parse(config.data);
    return new Promise((resolve, reject) => {
        let newRole = role_manager;
        if(name != undefined && name != ''){
            newRole = newRole.filter(role => role.name == name)
        }
        setTimeout(() => {
            resolve(['200', newRole])
        }, 500);
    })
})

for(let i=0; i<role_manager.length; i++){
    let role = role_manager[i]
    mock.onGet('roleManager/findRoleById/'+role.id)
    .reply('200', role)
}

mock.onPost('userManager/addUserSure')
.reply(config => {
    let {nickName, loginAccount, role} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = user_manager[user_manager.length-1].key+1
        let newUser = Mock.mock({
            key: "" + (max_key),
            id: ""+(max_key),
            nickName: nickName,
            loginAccount: loginAccount,
            role: role
        })
        setTimeout(() => {
            resolve([200, newUser]);
        }, 500);
    })
})

mock.onPost('userManager/deleteUsersByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, ids]);
        }, 500);
    })
})

mock.onPost('userManager/updateUserSure')
.reply(config => {
    let {id, nickName, role} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newUser = user_manager.filter(user => user.id==id)[0]
        if(nickName!=undefined && nickName!=''){
            newUser.nickName = nickName
        }
        if(role!=undefined && role!=''){
            newUser.role = role
        }
        setTimeout(() => {
            resolve([200, newUser]);
        }, 500);
    })
})

mock.onPost('userManager/findUsers')
.reply(config => {
    let {nickName, loginAccount, role} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newUser = user_manager;
        if(nickName != undefined && nickName != ''){
            newUser = newUser.filter(user => user.nickName == nickName)
        }
        if(loginAccount != undefined && loginAccount != ''){
            newUser = newUser.filter(user => user.loginAccount == loginAccount)
        }
        if(role != undefined && role != ''){
            newUser = newUser.filter(user => user.role == role)
        }
        setTimeout(() => {
            resolve(['200',newUser])
        }, 500);
    })
})


for(let i=0; i<user_manager.length; i++){
    let user = user_manager[i]
    mock.onGet('userManager/findUserById/'+user.id)
    .reply('200', user)
}

mock.onPost('projectManager/addProjectSure')
.reply(config => {
    let {name, projectUrl, sort, valid} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let max_key = project_manager[project_manager.length-1].key+1
        let newProject = Mock.mock({
            key: "" + (max_key),
            id: ""+(max_key),
            name: name,
            sort: sort,
            createTime: '2018-11-14 00:00:00',
            createName: 'Dawn',
            projectUrl: projectUrl,
            valid: valid,
            status: Mock.Random.integer(0,1)==0?'成功':'失败'
        })
        setTimeout(() => {
            resolve([200, newProject]);
        }, 500);
    })
})

mock.onPost('projectManager/deleteProjectsByIds')
.reply(config => {
    let ids = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, ids]);
        }, 500);
    })
})

mock.onPost('projectManager/updateProjectSure')
.reply(config => {
    let {id, name, projectUrl, sort} = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
        let newProject = project_manager.filter(project => project.id==id)[0]
        if(name!=undefined && name!=''){
            newProject.name = name
        }
        if(projectUrl!=undefined && projectUrl!=''){
            newProject.projectUrl = projectUrl
        }
        if(sort!=undefined && sort!=''){
            newProject.sort = sort
        }
        setTimeout(() => {
            resolve([200, newProject]);
        }, 500);
    })
})

mock.onPost('projectManager/findProjects')
.reply(config => {
    let {id, name, status, valid} = JSON.parse(config.data);
    return new Promise((resolve, reject) => {
        let newProject = project_manager;
        if(id != undefined && id != ''){
            newProject = newProject.filter(project => project.id == id)
        }
        if(name != undefined && name != ''){
            newProject = newProject.filter(project => project.name == name)
        }
        if(status != undefined && status != ''){
            newProject = newProject.filter(project => project.status == status)
        }
        if(valid != undefined && valid != ''){
            newProject = newProject.filter(project => project.valid == valid)
        }
        setTimeout(() => {
            resolve(['200', newProject])
        }, 500);
    })
})

for(let i=0; i<project_manager.length; i++){
    let project = project_manager[i]
    mock.onGet('projectManager/findProjectById/'+project.id)
    .reply('200', project)
}

mock.onGet('/api/homeController/loadMenu')
    .reply(config => {
        return new Promise((resolve, reject) => {
            
            let data = {
                code: '200',
                msg: '',
                data: menu
            }

            setTimeout(() => {
                resolve([200, data]);
            }, 500);
        })
    })

mock.onPost('/api/jobManagerController/deleteJobByIds')
    .reply(config => {
        let ids = JSON.parse(config.data)
        return new Promise((resolve, reject) => {
            
            setTimeout(() => {
                resolve([200, ids]);
            }, 500);
        })
    })

for(let i=0; i<Jobs.length; i++){
    let job = Jobs[i]
    mock.onPost('/api/jobManagerController/findJobById/'+job.id)
    .reply('200', job)
}

mock.onGet('/api/jobManagerController/findJobTypes')
    .reply('200', jobTypes)

mock.onPost('/api/jobManagerController/saveJob')
    .reply(config => {
        let {name, jobType, description} = JSON.parse(config.data)
        let jobTypeCn = jobTypes.filter(t => t.code==jobType)[0].name
        return new Promise((resolve, reject) => {
            let maxKey = Jobs[Jobs.length-1].id+1
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

mock.onGet('/api/sumDicController/findDicTypes')
    .reply(config => {
        return new Promise((resolve, reject) => {

            let data = {
                code: '200',
                msg: '',
                data: dic_tree
            }

            setTimeout(() => {
                resolve([200, data]);
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
//-------------------------------------------------------------
//系统日志
mock.onPost('/systemlogService/v1/logs')
.reply(config => {
    let {pageSize, pageNo, data} = JSON.parse(config.data);
    let {operator, type, operateIp, recordTime} = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
        let SystemLogRespVO = data_system_log
        if(operator!=undefined && operator!=""){
            SystemLogRespVO = SystemLogRespVO.filter(log => log.operator==operator)
        }
        if(type!=undefined && type!=""){
            SystemLogRespVO = SystemLogRespVO.filter(log => log.type==type)
        }
        if(operateIp!=undefined && operateIp!=""){
            SystemLogRespVO = SystemLogRespVO.filter(log => log.operateIp==operateIp)
        }
        if(recordTime!=undefined && recordTime!=""){
            SystemLogRespVO = SystemLogRespVO.filter(log => log.recordTime==recordTime)
        }

        let pageVO = {
            total: data_system_log.length,
            pageNo: pageNo,
            pageSize: pageSize,
            data: SystemLogRespVO
        }
        let data = {
            code: "200",
            msg: '',
            data: pageVO
        }
        setTimeout(() => {
            resolve([200, data]);
        }, 500);
    })
})