import counter from './reducers/counter';
import userInfo from './reducers/userInfo';
import app from './reducers/app';
import jobManager from './reducers/job_manager';
import jobMonitor from './reducers/job_monitor';

export default function combineReducers(state={}, action){
    const obj_counter = counter(state.counter, action);
    const obj_userInfo = userInfo(state.userInfo, action);
    const obj_app = app(state.app, action);
    const obj_jobManager = jobManager(state.jobManager, action);
    const obj_jobMonitor = jobMonitor(state.jobMonitor, action);
    return {
        counter: obj_counter,
        userInfo: obj_userInfo,
        app: obj_app,
        jobManager: obj_jobManager,
        jobMonitor: obj_jobMonitor,
    }
}