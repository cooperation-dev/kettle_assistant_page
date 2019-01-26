import axios from 'axios';

export const LOAD_DATA = "reptileMonitor/loadData";
export const LOAD_ECHARTS = "reptileMonitor/loadEcharts";
export const SHOW_RANGE = "reptileMonitor/showRange";

export const load_data = (list) => {
    return {
        type: LOAD_DATA,
        cards: list
    }
}

export const load_echarts = (list) => {
    return {
        type: LOAD_ECHARTS,
        options: list
    }
}

export const show_range = (rangeData) => {
    return {
        type: SHOW_RANGE,
        rangeData: rangeData
    }
}

export const loadData = () => {
    return (dispatch) => {
        axios.post('/api/reptileMonitorController/loadData')
                .then((response) => {
                    let cards = response.data
                    return cards.map(card => {
                        return {
                            ...card,
                            wYoy: parseFloat(card.wYoy*100).toFixed(2) + '%',
                            dYoy: parseFloat(card.dYoy*100).toFixed(2) + '%',
                            quantity: card.key=="4"?parseFloat(card.quantity*100).toFixed(2)+'%':card.quantity,
                            dQuantity: card.key=="4"?parseFloat(card.dQuantity*100).toFixed(2)+'%':card.dQuantity,
                        }
                    })
                }).then((data) => {
                    dispatch(load_data(data))
                })
    }
}

export const loadEcharts = (type, datet) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/reptileMonitorController/loadEcharts',
            data: {
                type: type,
                datet: datet
            }
        }).then((response) => {
            return response.data
        }).then((data) => {
            dispatch(load_echarts(data))
        })
    }
}

export const showRange = (type, datet) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/reptileMonitorController/showRange',
            data: {
                type: type,
                datet: datet
            }
        }).then((response) => {
            return response.data
        }).then((data) => {
            dispatch(show_range(data))
        })
    }
}