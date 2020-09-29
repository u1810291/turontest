import AdminReducer from "../reducers/AdminReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {history} from "../store";

export default combineReducers({
    // questions: getAllQuestionsReducer,
    isAdmin: AdminReducer,
 
    router: connectRouter(history)
});