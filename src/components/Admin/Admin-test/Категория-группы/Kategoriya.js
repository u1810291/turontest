import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


import KategoriyaPagination from './KategoriyaPagination';
import KategoriyaUsers from './KategoriyaUsers';
import './Kategoriya.css';
import { languages } from "../../../../utils/constants";

const Kategoriya = (props) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);

    useEffect(() => {
            setLoading(true);
           axios({url: 'http://172.16.1.188:8000/groups/all', method:"GET", headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }}).then(res => {
                // console.log(res)
                setUsers(res.data.rows);
                setLoading(false);
            }).catch(e => {
                console.log(e);
           
            });
}, []);
   
const editemployee = (id) => {
    props.history.push(`/Admin/Groups/${id}`);
}    

   
    // get curent users

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // change page

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
     
        <div className='container mb-4'>
            <h3>{languages[props.language.key].Admin.MainAdmin.Groups}</h3>
         
            <KategoriyaUsers users={currentUsers}  loading={loading}  editemployee={editemployee} setUsersPerPage={setUsersPerPage} />
            <KategoriyaPagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
           
        </div>
     
    );
}
const mapStateToProps = ({isAdmin,router,language}) => ({isAdmin,router,language});
export default connect(mapStateToProps)(withRouter(Kategoriya));



