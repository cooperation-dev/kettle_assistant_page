import '../../../mock/api';
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
        axios.post('jobMonitor/loadData')
                .then((response) => {
                    let cards = response.data.list
                    return cards.map(card => {
                        return {
                            ...card,
                            w_yoy: parseFloat(card.w_yoy*100).toFixed(2) + '%',
                            d_yoy: parseFloat(card.d_yoy*100).toFixed(2) + '%',
                            quantity: card.key=="4"?parseFloat(card.quantity*100).toFixed(2)+'%':card.quantity,
                            d_quantity: card.key=="4"?parseFloat(card.d_quantity*100).toFixed(2)+'%':card.d_quantity,
                        }
                    })
                    // return response.data.list
                }).then((data) => {
                    dispatch(load_data(data))
                })
    }
}

export const loadEcharts = (type, datet) => {
    return (dispatch) => {
        axios.post('jobMonitor/loadEcharts', {
            type: type,
            datet: datet
        }).then((response) => {
            return response.data.list
        }).then((data) => {
            dispatch(load_echarts(data))
        })
    }
}

export const showRange = (type, datet) => {
    return (dispatch) => {
        axios.post('jobMonitor/showRange', {
            type: type,
            datet: datet
        }).then((response) => {
            return response.data.rangeData
        }).then((data) => {
            dispatch(show_range(data))
        })
    }
}