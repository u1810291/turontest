import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import {languages}  from "../../../utils/constants";
import AdminResultPagination from './AdminResultPagination';
import AdminResultUsers from './AdminResultUsers';
import './AdminResult.css';

function AdminResult(props){
     const [loading,setLoading]=useState(false);
     const [adminresults,setAdminresults]=useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [usersPerPage, setUsersPerPage] = useState(10);
     function detailemployee(id){
        //console.log(props);
        props.history.push(`/Admin/Users/Results/${id}`);
    }

     useEffect(() => {
        setLoading(true);
       axios({url: 'http://172.16.1.188:8000/results/all', method:"GET", headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }}).then(res => {
           
            setAdminresults(res.data.rows);
            // console.log(res.data.rows);
            setLoading(false);
           
        }).catch(e => {

            console.log(e);
       
        });
}, []);





const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = adminresults.slice(indexOfFirstUser, indexOfLastUser);

// change page


const paginate = pageNumber => setCurrentPage(pageNumber);
return (
    <div className="container mb-4">
       <h3>{languages[props.language.key].Admin.MainAdmin.Results}</h3>
        <AdminResultUsers adminresults={currentUsers} loading={loading} detailemployee={detailemployee} setUsersPerPage={setUsersPerPage} />
        <AdminResultPagination usersPerPage={usersPerPage} totalUsers={adminresults.length} paginate={paginate} /> 
    </div>

);
}
const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(withRouter(AdminResult));
