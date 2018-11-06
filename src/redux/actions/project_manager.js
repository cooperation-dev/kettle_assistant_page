import '../../../mock/api';
import axios from 'axios';

export const FIND_PROJECTS = "projectManager/findProjects";

export const find_projects = (list) => {
    return {
        type: FIND_PROJECTS,
        list: list
    }
}

export const findProjects = () => {
    return (dispatch) => {
        axios.post(FIND_PROJECTS)
            .then((response) => {
                return response.data.list
            })
            .then((list) => {
                dispatch(find_projects(list))
            })
    }
}