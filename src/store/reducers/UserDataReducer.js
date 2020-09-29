import {
    REQUEST_GET_USER_DATA,
    SUCCESS_GET_USER_DATA,
    FAILURE_GET_USER_DATA
} from '../actions/actionTypes';

const initialState = {
    data: {},
    loading: false,
	error: "",
};

const reducerUserData = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_GET_USER_DATA:
			return { ...state,loading: true};
		case SUCCESS_GET_USER_DATA:
			return { ...state,data: action.payload, error: "", loading: false};
		case FAILURE_GET_USER_DATA:
			return { ...state, error: "Error while get user data...",loading: false };
		default:
			return state;
	}
};

export default reducerUserData;