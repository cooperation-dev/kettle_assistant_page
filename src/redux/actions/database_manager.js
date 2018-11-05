import '../../../mock/api';
import axios from 'axios';

export const FIND_LIST = "databaseManager/findList";

export const find_list = (list) => {
    return {
        type : FIND_LIST,
        list : list
    }
}

export const findList = () => {
    return (dispatch) => {
        axios.post(FIND_LIST)
                .then((response) => {
                    return response.data.list
                })
                .then((list) => {
                    dispatch(find_list(list))
                })
    }
}