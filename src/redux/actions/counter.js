export const INCREMENT = "counter/increment";
export const DECREMENT = "counter/decrement";
export const RESET = "counter/reset";

export function increment(){
    return {
        type: INCREMENT
    }
}

export function decrement(){
    return {
        type: DECREMENT
    }
}

export function reset(){
    return {
        type: RESET
    }
}