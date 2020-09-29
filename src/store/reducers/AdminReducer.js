import {
    REQUEST_GET_PERMISSIONS,
    SUCCESS_GET_ADMIN_PERMISSIONS,
    FAILURE_GET_ADMIN_PERMISSIONS,
	SUCCESS_LOGIN,
	FAILURE_LOGIN
} from '../actions/actionTypes';

const initialState = {
	data: null,
	LoggedIn: false,
	error: "",
};

const reducerAdminPermission = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_GET_PERMISSIONS:
			return { ...state };
		case SUCCESS_GET_ADMIN_PERMISSIONS:
			return { ...state,data: action.payload,error: ""};
		case FAILURE_GET_ADMIN_PERMISSIONS:
			return { ...state, error: "", data: action.payload, LoggedIn: true };
		case SUCCESS_LOGIN: 
			return { ...state, error: "", LoggedIn: true, data: action.payload };
		case FAILURE_LOGIN: 
			return { ...state, error: "", LoggedIn: false, data: null};
		default:
			return state;
	}
};

export default reducerAdminPermission;