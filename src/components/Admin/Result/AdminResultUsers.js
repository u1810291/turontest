import React from 'react';
import {connect} from "react-redux";
import './AdminResult.css';
import 'datatables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faSort } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import { languages } from "../../../utils/constants";
import { Loader } from "../../temps/Loader";

window.$ = $;

 const AdminResultUsers = (props) => {
   const {adminresults, detailemployee,loading,usersPerPage,setUsersPerPage} = props;
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
        // console.log(usersPerPage)
    }

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

     
    
    return loading ? (
      <div className="align-self-center"><Loader /></div>
      ) : (
        <div className="container">
        <div className="row ">
          <div className="col-left">
            <div className="nav justify-content-start">
              <input className="form-control" id="myInput" type="text" placeholder={languages[props.language.key].Admin.CategoryUsers.Search} />
            </div>
          </div>
          <div className="col-right" style={{marginTop: "20px",marginLeft: "60%"}}>
            <div className="nav justify-content-end"> <span style={{fontSize: "16px"}}>{languages[props.language.key].Admin.AdminResultsUsers.ResultsNum}</span>
              <select defaultValue={usersPerPage} onChange={handleUsersPerPageChange} className="selectt">
                <option defaultValue="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="2000">All</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table-responsive table-hover table-bordered">
          <table id="example" className="table-responsive" style={{display: "table"}}>
            <thead className="table-active">
              <tr>
                <th>№</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Surname}</th>
                <th>
                  <FontAwesomeIcon icon={faSort} style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Name}</th>
                <th>
                  <FontAwesomeIcon icon={faSort} style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.LastName}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.branch}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Department}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Position}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Category}</th>
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Date}</th>
                {/* <th>{languages[props.language.key].Admin.AdminResultsUsers.Finished}</th> */}
                <th>
                  <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.AdminResultsUsers.Act}</th>
              </tr>
            </thead>
            <tbody id="myTable">{adminresults !== null || adminresults !== undefined ? adminresults.map((adminresult,i)=>(
              <tr key={adminresult.id} className="">
                <td>{i+1}</td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.user.surname} }></td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.user.firstname} }></td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.user.lastname} }></td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.user.branch.charAt(0).toUpperCase() + adminresult.user.branch.slice(1).toLowerCase()} }></td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.user.department} }></td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.user.position} }></td>
                <td dangerouslySetInnerHTML = { {__html: adminresult.questionCategory.category} }></td>
                <td>{adminresult.end_time}</td>
                {/* <td>{adminresult.passed === 1 ? ('Да') :( 'Нет' )}</td> */}
                <td>
                  <div>
                    <button className="material-button" style={{height: "20px",lineHeight: "20px",margin: "10px"}} onClick={()=>{detailemployee(adminresult.id) }}>{languages[props.language.key].Admin.AdminResultsUsers.Info}</button>
                  </div>
                </td>
              </tr>)): null}</tbody>
          </table>
        </div>
      </div>
    );
}
const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(AdminResultUsers);