import React from 'react'
import {connect } from "react-redux";
import {withRouter}  from "react-router-dom";
import {faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import 'datatables';
import { languages } from "../../../../utils/constants";
import Loader from "../../../temps/Loader";
import '../../AdminResult.css';
window.$ = $;
const UserDetailed = (props) => {
    const { users, loading,edituser,usersPerPage,setUsersPerPage} = props;
    $(document).ready(function() {
        $.fn.dataTable.ext.errMode = 'none';
        $('#example').DataTable({
        
          "ordering": true,
          "paging":false,
          "searching":false,
          "info":false,
          columnDefs: [{
            orderable: false,
            targets: "no-sort"
          }]
      
    
        });
      });


    function handleUsersPerPageChange(e) {
        setUsersPerPage(e.target.value);
        console.log(usersPerPage)
    }

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
      function printData(tableId){
        var divToPrint=document.getElementById(tableId);
        let newWin= window.open("http://172.16.1.188:3000/Admin/UsersList/print");
        newWin.document.write(divToPrint.outerHTML);
        //newWin.print();
       // newWin.close();
      }
    if (loading) {
        return (<div className="align-self-center"><Loader /></div>);
    }
    return (
      <div className="container">
      <div className="row ">
        <div className="col-left">
          <div className="nav justify-content-start">
            <input className="form-control" id="myInput" type="text" placeholder={languages[props.language.key].Admin.CategoryUsers.Search} />
          </div>
        </div>
        <div className="col-right" style={{marginTop: "20px",marginLeft: "60%"}}>
          <div className="nav justify-content-end"> <span style={{fontSize: "16px"}}>{languages[props.language.key].Admin.UserList.ResultsNum}: </span>
            <select defaultValue={usersPerPage} onChange={handleUsersPerPageChange} className="selectt">
              <option defaultValue="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="2000">All</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive table-hover table-bordered" id="dataTable">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <table id="example" className="table-responsive" style={{display: "table"}}>
            <thead className="table-active table-bordered">
              <tr style={{padding: "5px"}}>
                <th>№</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.branch}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Department}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Postion}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Surname}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Name}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.LastName}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Login}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Аctive}</th>
                {/* <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.UserList.Group}</th> */}
              </tr>
            </thead>
            <tbody id="myTable">{users.map((user, i) => (
              <tr key={user.id} className="table table-bordered">
                <td>{i+1}</td>
                {/* <td dangerouslySetInnerHTML = { {__html: user.branch.toLowerCase()} }></td>
                <td>{user.branch.charAt(0).toUpperCase() + user.branch.slice(1).toLowerCase()}</td> */}
                <td dangerouslySetInnerHTML = { {__html: user.branch} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.department} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.position} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.surname} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.firstname} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.lastname} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.username} }></td>
                <td dangerouslySetInnerHTML = { {__html: user.isActive} }></td>
                {/* <td dangerouslySetInnerHTML = { {__html: user.groupName} }></td> */}
              </tr>) ) }
            </tbody>
          </table>
          {/* <button onClick={()=> printData("dataTable")}>Print!</button> */}
        </div>
      </div>
    </div>
  );
}
const mapStatetoProps = ({language}) => ({language});
export default connect(mapStatetoProps)(withRouter(UserDetailed));

