import axios from 'axios';

export const LOAD_DATA = "jobMonitor/loadData";
export const LOAD_ECHARTS = "jobMonitor/loadEcharts";
export const SHOW_RANGE = "jobMonitor/showRange";

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
        axios.post('/api/jobMonitorController/loadData')
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
            url: '/api/jobMonitorController/loadEcharts',
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
            url: '/api/jobMonitorController/showRange',
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