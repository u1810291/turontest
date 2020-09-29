import { REQUEST_SET_LANGUAGE, SET_LANGUAGE } from '../actions/actionTypes';

const initialState = {
	key: 'uz',
	loading: false
};

const LangReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SET_LANGUAGE:
			return { ...state, loading: true, key: action.payload };
		case SET_LANGUAGE:
			return { ...state, key: action.payload.key, loading: false };
		default:
			return state;
	}
};

export default LangReducer;
