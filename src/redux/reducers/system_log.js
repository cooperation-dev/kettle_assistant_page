import {FIND_LOGS} from '../actions/system_log';

const init = {
    list: [],
    //分页
    total: 0, //数据总数
    pageSize: 10, //默认一页10条
    pageNo: 1 //当前显示数

}

export default function reducers (state=init, action){
    switch(action.type){
        case FIND_LOGS: {
            return {
                ...state,
                list: action.list,
                total: action.total,
                pageSize: action.pageSize,
                pageNo: action.pageNo
            }
        }
        default:
            return state
    }
}