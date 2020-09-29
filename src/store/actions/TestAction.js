
import {
    START_TEST,
    END_TEST
} from './actionTypes';

export const startTest = (val) => dispatch => {
    dispatch({ type: START_TEST, start: val });
}

export const endTest = (val) => dispatch => {
    dispatch({ type: END_TEST, end: val });
}
