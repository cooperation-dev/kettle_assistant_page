import counter from './reducers/counter';
import userInfo from './reducers/userInfo';
import app from './reducers/app';
import jobManager from './reducers/job_manager';
import jobMonitor from './reducers/job_monitor';
import sumDic from './reducers/sum_dic';
import databaseManager from './reducers/database_manager';
import menuManager from './reducers/menu_manager';
import systemLog from './reducers/system_log';

export default function combineReducers(state={}, action){
    const obj_counter = counter(state.counter, action);
    const obj_userInfo = userInfo(state.userInfo, action);
    const obj_app = app(state.app, action);
    const obj_jobManager = jobManager(state.jobManager, action);
    const obj_jobMonitor = jobMonitor(state.jobMonitor, action);
    const obj_sumDic = sumDic(state.sumDic, action);
    const obj_databaseManager = databaseManager(state.databaseManager, action);
    const obj_menuManager = menuManager(state.menuManager, action);
    const obj_systemLog = systemLog(state.systemLog, action);
    return {
        counter: obj_counter,
        userInfo: obj_userInfo,
        app: obj_app,
        jobManager: obj_jobManager,
        jobMonitor: obj_jobMonitor,
        sumDic: obj_sumDic,
        databaseManager: obj_databaseManager,
        menuManager: obj_menuManager,
        systemLog: obj_systemLog,
    }
}