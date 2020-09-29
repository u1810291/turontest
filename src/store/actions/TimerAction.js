import {
    REQUEST_TIMER,
    TIMER_START,
    TIMER_STOP
} from './actionTypes';

export const stopTimer = () => dispatch => {
        dispatch({type: TIMER_STOP, payload: {counter: 0}})    
}

export const startTimer = (counter) => dispatch => {
        dispatch({type: TIMER_START, counter: counter})    
}
