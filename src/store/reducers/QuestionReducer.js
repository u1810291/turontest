import {
    REQUEST_GET_QUESTION_ACTION,
    SUCCESS_GET_QUESTION_ACTION,
    FAILURE_GET_QUESTION_ACTION,
    SUCCESS_GET_QUESTION_OPTIONS_ACTION,
    FAILURE_GET_QUESTION_OPTIONS_ACTION
} from '../actions/actionTypes';

const initialState = {
    data: [],
    options: {
		time: "",
		questionCat: "",
		questionCatId: 0
	},
    loading: false,
	error: "",
};

const reducerQuestions = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_GET_QUESTION_ACTION:
			return { ...state,loading: true};
		case SUCCESS_GET_QUESTION_ACTION:
			return { ...state,data: action.payload,error: "",loading: false};
		case FAILURE_GET_QUESTION_ACTION:
			return { ...state, error: "Error while get questions list...",loading: true };
		case SUCCESS_GET_QUESTION_OPTIONS_ACTION: 
			return { ...state, error: "",options: action.payload };
		case FAILURE_GET_QUESTION_OPTIONS_ACTION: 
			return { ...state, error: "Error while get questions list options...",loading: true};
		default:
			return state;
	}
};

export default reducerQuestions;