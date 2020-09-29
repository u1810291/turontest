import {
    REQUEST_TIMER,
    TIMER_START,
    TIMER_STOP
} from '../actions/actionTypes';

const initialState = {
    counter: 10,
    loading: false,
	error: ""
};

const reducerTimer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_TIMER:
			return { ...state, loading: true};
		case TIMER_START:
			return { counter: action.counter, loading: false};
		case TIMER_STOP:
			return { counter: 0, loading: false };
		default:
			return state;
	}
};

export default reducerTimer;