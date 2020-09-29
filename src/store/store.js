import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AdminReducer from "../store/reducers/AdminReducer";
import QuestionsReducer from "../store/reducers/QuestionReducer";
import StartTestReducer from "../store/reducers/StartTestReducer";
import UserDataReducer from "../store/reducers/UserDataReducer";
import TimerReducer from "../store/reducers/TimerReducer";
import { logger } from "redux-logger";
import LangReducer from "../store/reducers/LangReducer";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import testReducer from './reducers/TestReducer';
const createBrowserHistory = require('history').createBrowserHistory;

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [thunk,routerMiddleware(history)];
const rootReducer =  combineReducers({
    language: LangReducer,
    isAdmin: AdminReducer,
    questions: QuestionsReducer,
    startTest: StartTestReducer,
    timer: TimerReducer,
    testState: testReducer,
    router: connectRouter(history),
});
const composedEnhancers = composeWithDevTools(
	applyMiddleware(...middleware),
	...enhancers
);

export default createStore(connectRouter(history)(rootReducer),composedEnhancers);

