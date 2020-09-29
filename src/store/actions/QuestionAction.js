
import axios from "axios";
import {
    REQUEST_GET_QUESTION_ACTION,
    SUCCESS_GET_QUESTION_ACTION,
    FAILURE_GET_QUESTION_ACTION,
    SUCCESS_GET_QUESTION_OPTIONS_ACTION,
    FAILURE_GET_QUESTION_OPTIONS_ACTION
} from './actionTypes';

export const requestGetQuestions = (i) => dispatch => {
        dispatch({ type: REQUEST_GET_QUESTION_ACTION });
        let id = i === 0 ? i++ : i;
        axios({url:`http://172.16.1.188:8000/users/questionsByCat/${id}`,
            mathod:"GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res => {
                if(res.status === 200 || res.status === 201){
                    dispatch({type: SUCCESS_GET_QUESTION_ACTION,payload: res.data.rows});
                    dispatch({type: SUCCESS_GET_QUESTION_OPTIONS_ACTION,payload: {
                        time: res.data.time,
                        questionCat: res.data.questionCat,
                        questionCatId: res.data.questionCatId
                    }});
                }else if(res.status === 400 || res.status === 401){
                    dispatch({type: FAILURE_GET_QUESTION_ACTION,payload: []});
                    dispatch({type: FAILURE_GET_QUESTION_OPTIONS_ACTION,payload: {}});
                }else{
                    dispatch({type: FAILURE_GET_QUESTION_ACTION,payload: null});
                    dispatch({type: FAILURE_GET_QUESTION_OPTIONS_ACTION,payload: null});
                }
            }).catch(e => {
                dispatch({type: FAILURE_GET_QUESTION_ACTION,payload: null});
                dispatch({type: FAILURE_GET_QUESTION_OPTIONS_ACTION,payload: null});
                console.log(e);
            });
            // Testing response
            // console.log("DATA:",response);

}
