import React from 'react';
import {Redirect,Route } from "react-router-dom";
import {connect} from "react-redux";
import Upload from "./Admin-test/Назначение-теста/Upload";
import GroupCreate from "./Admin-user/Группы-пользователи/GroupCreate";

import Report from "./Admin-user/Группы-пользователи/Report"
import Editemployee from '../Admin/Admin-test/Категория-группы/Editemployee';
import AdminResult from "../Admin/Result/AdminResult";
import AdminDetailResult from "../Admin/Result/AdminDetailResult";
import Kategoriya from "../Admin/Admin-test/Категория-группы/Kategoriya";
import Users from "../Admin/Admin-user/Пользователи/Users";
import './Admin.css';
import QuestionCategories from './Admin-test/QuestionCategories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers } from '@fortawesome/free-solid-svg-icons'
import { setLan,requestLan } from "../../store/actions/LangAction";
import { unAuthorized,LogOut } from "../../store/actions/AdminActions";
import {faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import {faPoll } from '@fortawesome/free-solid-svg-icons'
import {faFileDownload } from '@fortawesome/free-solid-svg-icons'
import {faUserFriends } from '@fortawesome/free-solid-svg-icons'
import {faListAlt } from '@fortawesome/free-solid-svg-icons'
import {faHome } from '@fortawesome/free-solid-svg-icons'
import {faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import {faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {faUser } from '@fortawesome/free-solid-svg-icons'
import {faGlobe } from '@fortawesome/free-solid-svg-icons'
import { lang,languages } from "../../utils/constants";
import MaterialSignUp from '../SignUp/index';
import {faTable } from '@fortawesome/free-solid-svg-icons'

const routes = [
	{
		path: "/Admin/Groups",
		exact: true,
		main: () => <Kategoriya />
    },
    {
        path: "/Admin/AddUser",
        main: () => <MaterialSignUp />
    },
    {
		path: "/Admin/Groups/:id",
		exact: true,
		main: () => <Editemployee />
    },
    {
        path: "/Admin/QuestionCategories",
        main: () => <QuestionCategories />
    },
    {
        path: "/Admin/QuestionCategories/:id",
        main: () => <QuestionCategories />
    },
	{
		path: "/Admin/edit/:id",
		main: () => <Editemployee />
    },
    {
		path: "/Admin/Upload",
		main: () => <Upload />
	},
	{
		path: "/Admin/GroupCreate",
		exact: true,
		main: () => <GroupCreate />
    },
 
    {
		path: "/Admin/Report",
		exact: true,
		main: () => <Report/>
    },
    {
        path: "/Admin/Users/Results",
        exact: true,
        main: () => <AdminResult />
    },
    {
        path: "/Admin/Users/Results/:id",
        exact: true,
        main: () => <AdminDetailResult />
    },
    {
        path: "/Admin/UsersList",
        main: () => <Users />
    },
];


const Admin = (props) => {
    function LogOut(){
        try{
            props.LogOut();
            props.history.push("/");
            sessionStorage.clear();
        }catch(e){
            console.log(e);
        }
    }
    function renderLans() {
		return lang.map(lan => {
			return (
				<li key={lan.key} onClick={() => props.setLan(lan)}>
					<span>{lan.displayName}</span>
				</li>
			);
		});
	}
    function selectedLan() {
		return lang.map(item => {
			if (item.key === props.language.key) {
				return <b key={item.key}>{item.displayName}</b>;
			} else {
				return null;
			}
		});
    }
    
    if(props.isAdmin.data){
        console.log(props.isAdmin)
    return (
        <div className="good">
        <div className="Admin">
            <div className="navbar">
                <div className="col-left">
                    <ul className="nav justify-content-start">
                        <li className="nav-item ">
                            <p>
                                <FontAwesomeIcon icon={faUser} style={{color: "#C26653",fontSize: "20px", marginRight: "1px"}}/>{props.isAdmin.data.isAdmin ? " : " : " " }</p>
                        </li>
                        <li className="nav-items ">
                            <p>{ (props.isAdmin.data.surname + " " + props.isAdmin.data.firstname + " " + props.isAdmin.data.lastname) }</p>
                        </li>
                    </ul>
                </div>
                <div className="col-right">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <h5 onClick={()=> props.history.push('/Admin')}><FontAwesomeIcon icon={faHome}  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.Main}</h5>
                        </li>
                        <li className="nav-item">
                            <h5 href="#"><FontAwesomeIcon icon={faQuestionCircle }  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.Help}</h5>
                        </li>
                        <div className="nav_wrapper">
                            <FontAwesomeIcon icon={faGlobe} style={{fontSize: "16px", marginRight: "10px"}}/>
                            <div className="sl-nav">
                                <ul>
                                    <li>{selectedLan()}
                                        <div className="triangle" />
                                        <ul>{renderLans()}</ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <li className="nav-item">
                            <h5 onClick={LogOut}><FontAwesomeIcon icon={faSignOutAlt }  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.Leave}</h5>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="parametrs">
                <div className="admin-design">
                    <div className="Admin-test">
                        <h3>{languages[props.language.key].Admin.MainAdmin.AdminTest}</h3>
                        <hr style={{width: "100%",borderWidth: "1px",borderColor: "#333"}} />
                        <h4 onClick={()=> props.history.push('/Admin/QuestionCategories')} ><FontAwesomeIcon icon={faListAlt}  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.QuestionCategories}</h4>
                        <h4 onClick={()=> props.history.push('/Admin/Groups')}><FontAwesomeIcon icon={faUserFriends}  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.Groups}</h4>
                        <h4 onClick={()=> props.history.push('/Admin/Upload')}><FontAwesomeIcon icon={faFileDownload}  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.UploadQuestions}</h4>
                        <h4 onClick={()=> props.history.push("/Admin/Users/Results")}> <FontAwesomeIcon icon={faPoll}  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.MainAdmin.Results}</h4>
                        <h4 onClick={()=> props.history.push("/Admin/AddUser")}> <FontAwesomeIcon icon={faPoll}  style={{fontSize:"16px", marginRight:"10px"}}/>{languages[props.language.key].Admin.Users.AddUserMenu}</h4>
                    </div>
                    <div className="Admin-user">
                        <h3>{languages[props.language.key].Admin.MainAdmin.AdminUsers}</h3>
                        <hr style={{width: "100%",borderWidth: "1px",borderColor: "#333"}} />
                        <h4 onClick={()=> props.history.push('/Admin/UsersList')}>  <FontAwesomeIcon icon={faUsers}  style={{fontSize:"16px", marginRight:"6px"}}/>{languages[props.language.key].Admin.MainAdmin.Users}</h4>
                        <h4 onClick={()=> props.history.push('/Admin/GroupCreate')}><FontAwesomeIcon icon={faLayerGroup}  style={{fontSize:"16px", marginRight:"6px"}}/>{languages[props.language.key].Admin.MainAdmin.GroupCreate}</h4>
   
                        <h4 onClick={()=> props.history.push('/Admin/Report')}><FontAwesomeIcon icon={faTable}  style={{fontSize:"16px", marginRight:"6px"}}/>Report</h4>
                    </div>
                </div>
                <div className="col col-md-10">
                    <div className="profile-content">{routes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact} component={route.main} />))}</div>
                </div>
            </div>
        </div>
    </div>
        )
        }else{
            props.unAuthorized();
            return (
                <Redirect to={"/"}/>
            )
        }
    
}

const mapStateToProps = ({isAdmin,router,language}) => ({isAdmin,router,language});
export default connect(mapStateToProps,{setLan,requestLan,unAuthorized,LogOut})(Admin);