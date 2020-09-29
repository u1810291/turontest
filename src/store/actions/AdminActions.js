
import axios from "axios";

import {
    REQUEST_GET_PERMISSIONS,
    SUCCESS_GET_ADMIN_PERMISSIONS,
    FAILURE_GET_ADMIN_PERMISSIONS,
    SUCCESS_LOGIN,
    FAILURE_LOGIN
} from './actionTypes';
export const requestGetAdminPermissions = (username,password,props,setErrorForm) => dispatch => {
    dispatch({ type: REQUEST_GET_PERMISSIONS });
    axios.post("http://172.16.1.188:8000/users/login", {
            username: username,
            password: password,
           
        }).then(res => {
            if(res.status === 200 || res.status === 201){
                //console.log("TOKEN: ",res.data.token);
                dispatch({type: SUCCESS_LOGIN,payload: res.data.user});
                sessionStorage.setItem("token", res.data.token);
                
                if(res.data.user.isAdmin === 1){
                    dispatch({type: SUCCESS_GET_ADMIN_PERMISSIONS,payload: res.data.user});  
                    props.history.push("/admin");
                }else{
                    dispatch({type: FAILURE_GET_ADMIN_PERMISSIONS,payload: res.data.user});
                    props.history.push("/user/assignedtests");
                }
            }else{
                dispatch({type: FAILURE_LOGIN,payload: false});
                setErrorForm(false);
                props.history.push('/');
            }
        }).catch(e => {
            dispatch({type: FAILURE_GET_ADMIN_PERMISSIONS,payload: false});
            dispatch({type: FAILURE_LOGIN,payload: false});
            console.log(e);
        })
}

export const unAuthorized = () => dispatch => {
    dispatch({type: FAILURE_LOGIN,payload: false});
    sessionStorage.clear();
}
export const LogOut = () => dispatch => {
    dispatch({type: FAILURE_LOGIN,payload: false});
    dispatch({type: FAILURE_GET_ADMIN_PERMISSIONS,payload: false});
    sessionStorage.clear();
}
