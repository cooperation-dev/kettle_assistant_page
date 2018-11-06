import '../../../mock/api';
import axios from 'axios';

export const FIND_ROLES = "roleManager/findRoles";

export const find_roles = (list) => {
    return {
        type: FIND_ROLES,
        list: list
    }
}

export const findRoles = () => {
    return(dispatch) => {
        axios.post(FIND_ROLES)
            .then((response) => {
                return response.data.list
            })
            .then((list) => {
                dispatch(find_roles(list))
            })
    }
}