export const TOGGLE_MENU = "toggle/menu";
export const CHANGE_MENU = "change/menu";

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

