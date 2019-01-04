import app from './reducers/app';
import reptileJob from './reducers/reptile_job';
import jobManager from './reducers/job_manager';
import jobMonitor from './reducers/job_monitor';
import sumDic from './reducers/sum_dic';
import databaseManager from './reducers/database_manager';
import menuManager from './reducers/menu_manager';
import systemLog from './reducers/system_log';
import userManager from './reducers/user_manager'
import roleManager from './reducers/role_manager'
import projectManager from './reducers/project_manager'
import captcha from './reducers/captcha';

export default function combineReducers(state={}, action){
    const obj_app = app(state.app, action);
    const obj_reptileJob = reptileJob(state.jobManager, action);
    const obj_jobManager = jobManager(state.jobManager, action);
    const obj_jobMonitor = jobMonitor(state.jobMonitor, action);
    const obj_sumDic = sumDic(state.sumDic, action);
    const obj_databaseManager = databaseManager(state.databaseManager, action);
    const obj_menuManager = menuManager(state.menuManager, action);
    const obj_systemLog = systemLog(state.systemLog, action);
    const obj_userManager = userManager(state.userManager, action);
    const obj_roleManager = roleManager(state.roleManager, action);
    const obj_projectManager = projectManager(state.projectManager, action);
    const obj_captcha = captcha(state.captcha, action);
    return {
        app: obj_app,
        reptileJob: obj_reptileJob,
        jobManager: obj_jobManager,
        jobMonitor: obj_jobMonitor,
        sumDic: obj_sumDic,
        databaseManager: obj_databaseManager,
        menuManager: obj_menuManager,
        systemLog: obj_systemLog,
        userManager: obj_userManager,
        roleManager: obj_roleManager,
        projectManager: obj_projectManager,
        captcha: obj_captcha,
        login: captcha(state.captcha, action)
    }
}