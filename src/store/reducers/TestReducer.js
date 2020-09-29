import {
    START_TEST,
    END_TEST
} from '../actions/actionTypes';

const initialState = {
    start: false,
    end: false
};

const testReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_TEST:
			return { ...state, start: action.start};
		case END_TEST:
			return { ...state, end: action.end};
		default:
			return state;
	}
};

export default testReducer;