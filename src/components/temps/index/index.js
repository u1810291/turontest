import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {FaCheck,FaWpforms,FaUserTie} from "react-icons/fa";

import "./index.css";

function UserPageIndex(props){
    return (
            <div class="row d-flex align-self-center">
                <div class="pl-4 flex-fill">
                    <Link to={"/User/TestArchieve"}>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front d-flex">
                                    <div class="align-self-center"><h2>Архив Сотрудника</h2></div>
                                </div>
                                <div class="flip-card-back d-flex">
                                    <div class="align-self-center"><h3>Завершенные Тесты</h3><span><FaCheck size={30}/></span></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="flex-grow-1 flex-fill">
                    <Link to={"/User/AssignedTests"}>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front d-flex">
                                    <div class="align-self-center"><h2>Назначенные тесты</h2></div>
                                </div>
                                <div class="flip-card-back d-flex">
                                    <div class="align-self-center"><h3>Категории тестов</h3><span><FaWpforms size={30}/></span></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="pr-2 flex-fill">
                    <Link to={"/User/Info"}>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front d-flex">
                                    <div class="align-self-center"><h2>Мои Данные</h2></div>
                                </div>
                                <div class="flip-card-back d-flex">
                                    <div class="align-self-center"><h3>Персональные Данные</h3><span><FaUserTie size={30}/></span></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>       
    )
}
const mapStateToProps = ({router}) => ({router});
export default connect(mapStateToProps)(UserPageIndex);