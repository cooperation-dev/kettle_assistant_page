// import '../../../mock/api';
import axios from 'axios';
// import axios from '../../router/Adapter'

export const TOGGLE_MENU = "toggle/menu";
export const CHANGE_MENU = "change/menu";
export const LOAD_MENU = "load/menu";

export function toggleMenu() {
    return {
        type: TOGGLE_MENU
    }
}

export function changeMenu(e){
    return {
        type: CHANGE_MENU
    }
}

export function load_menu(list){
    return {
        type: LOAD_MENU,
        list: list
    }
}

export function toggleCollapsed(){
    return function(dispatch){
        dispatch(toggleMenu())
    }
}

export function selectMenu(e){
    return function(dispatch){
        dispatch(changeMenu(e))
    }
}

export function loadMenu(){
    return (dispatch) => {
        axios({
            method: 'get', 
            url: '/api/rest/menuService/v1/menus'
        }).then((reponse) => {
            return reponse.data.data
        }).then((list) => {
            dispatch(load_menu(list))
        })
        // .catch((error) => {
        //     this.history.push('/user/login')
        // })
    }
}