import axios from 'axios';

//渲染正在运行的作业数
export const LOAD_RUNNINGS = "reptileMonitor/loadRunnings";
//渲染等待运行的作业数
export const LOAD_WAITINGS = "reptileMonitor/loadWaitings";
//按平台分组
export const LOAD_PRODUCT_GROUPBY_PLATFORM = "reptileMonitor/grouping/platform"
//按产品类型分组
export const LOAD_PRODUCT_GROUPBY_TYPE = "reptileMonitor/grouping/type"

export const load_runnings = (data) => {
    return {
        type: LOAD_RUNNINGS,
        runningCard: data
    }
}

export const load_waitings = (data) => {
    return {
        type: LOAD_WAITINGS,
        waitingCard: data
    }
}

export const load_product_grouping_platform = (data) => {
    return {
        type: LOAD_PRODUCT_GROUPBY_PLATFORM,
        groupingPlatform: data
    }
}

export const load_product_grouping_type = (data) => {
    return {
        type: LOAD_PRODUCT_GROUPBY_TYPE,
        groupingType: data
    }
}

export const loadRunnings = () => {
    return (dispatch) => {
        axios.get('/api/rest/reptileService/v1/monitor/running')
                .then((response) => {
                    return response.data.data
                }).then((data) => {
                    dispatch(load_runnings(data))
                })
    }
}

export const loadWaitings = () => {
    return (dispatch) => {
        axios.get('/api/rest/reptileService/v1/monitor/waiting')
                .then((response) => {
                    return response.data.data
                }).then((data) => {
                    dispatch(load_waitings(data))
                })
    }
}

export const loadProductGroupingPlatform = () => {
    return (dispatch) => {
        axios.get('/api/rest/reptileService/v1/products/grouping/0')
                .then((response) => {
                    return response.data.data
                }).then((data) => {
                    dispatch(load_product_grouping_platform(data))
                })
    }
}

export const loadProductGroupingType = () => {
    return (dispatch) => {
        axios.get('/api/rest/reptileService/v1/products/grouping/1')
                .then((response) => {
                    return response.data.data
                }).then((data) => {
                    dispatch(load_product_grouping_type(data))
                })
    }
}