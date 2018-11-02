import '../../../mock/api';
import axios from 'axios';

export const FIND_JOBS = "jobManager/findJobs";

export const find_jobs = (list) => {
    return {
        type: FIND_JOBS,
        list: list
    }
}

export const findJobs = () => {
    return (dispatch) => {
        axios.post('findJobs')
                .then((response) => {
                    return response.data.list
                })
                .then((list) => {
                    dispatch(find_jobs(list))
                })
    }
}