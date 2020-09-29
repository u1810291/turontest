import React from 'react';
import {connect} from "react-redux";

import './userInfo.css';


function UserInfo(props){
    return (
        <div class="Container">
            {/* <div class="Card">
                            <legend style={{textAlign:"center",fontWeight:"bold",marginBottom:"20px"}}>Персональные данные</legend>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Логин:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.username}</h4></div>
                                <div class="col-md-2 "></div>
                            </div>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Имя:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.firstname}</h4></div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Фамилия:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.surname}</h4></div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Отчество:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.lastname}</h4></div>
                                <div class="col-md-2"></div>
                                
                            </div>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Филиал:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.branch}</h4></div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Департамент:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.department}</h4></div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row text-left mt-3 userInfoDiv">
                                <div class="col-md-2"></div>
                                <div class="col-md-4 p-2"><h4>Должность:</h4></div>
                                <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{props.isAdmin.data.position}</h4></div>
                                <div class="col-md-2"></div>
                            </div>
                        </div> */}
        </div>
    )
}
const mapStateToProps = ({ isAdmin,router }) => ({ isAdmin,router});
export default connect(mapStateToProps)(UserInfo);