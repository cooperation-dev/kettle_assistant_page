import '../../../mock/api';
import axios from 'axios';


export const FIND_USERS = "userManager/findUsers";

export const find_users = (list) => {
    return {
        type: FIND_USERS,
        list: list
    }
}

export const findUsers = () => {
    return (dispatch) => {
        axios.post(FIND_USERS)
        .then((response) => {
            return response.data.list
        })
        .then((list) => {
            dispatch(find_users(list))
        })
    }
}