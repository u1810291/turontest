import {
    REQUEST_START_TEST,
    SUCCES_START_TEST,
    FAILURE_START_TEST,
} from '../actions/actionTypes';

const initialState = {
    isStarted: false,
    loading: false,
	error: "",
};

const reducerStartTest = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_START_TEST:
			return { ...state,loading: true};
		case SUCCES_START_TEST:
			return { ...state,isStarted: action.payload,error: "",loading: false};
		case FAILURE_START_TEST:
			return { ...state,isStarted: false, error: "Error while starting test...",loading: false };
		default:
			return state;
	}
};

export default reducerStartTest;