import {
    REQUEST_LOGIN,
    SUCCESS_LOGIN,
    FAILURE_LOGIN
} from './actionTypes';
export const requestGetAdminPermissions = (username,password) => dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    axios.post("http://172.16.1.188:8000/users/login", {
            username: username,
            password: password,
        }).then(res => {
            if(res.status === 200 || res.status === 201){
                dispatch({type: SUCCESS_LOGIN, payload: true});
                sessionStorage.setItem("token", res.data.token);
            } else{
                dispatch({type: FAILURE_LOGIN, payload: false});
                sessionStorage.clear();
            }
        }).catch(e => {
            dispatch({type: FAILURE_LOGIN,payload: false});
            console.log(e);
        })
}
