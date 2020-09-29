
import axios from "axios";
import {
    REQUEST_GET_USER_DATA,
    SUCCESS_GET_USER_DATA,
    FAILURE_GET_USER_DATA
} from './actionTypes';

export const requestGetUserData = () => dispatch => {
        dispatch({ type: REQUEST_GET_USER_DATA });

      axios({url:`http://172.16.1.188:8000/user`,
            mathod:"GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res => {
                if(res.status === 200 || res.status === 201){
                    dispatch({type: SUCCESS_GET_USER_DATA, payload: res.data});
                }else if(res.status === 400 || res.status === 401){
                    dispatch({type: FAILURE_GET_USER_DATA, payload: {}});
                }else{
                    dispatch({type: FAILURE_GET_USER_DATA, payload: null});
                }
            }).catch(e => {
                dispatch({type: FAILURE_GET_USER_DATA, payload: null});
                console.log(e);
            });

}
