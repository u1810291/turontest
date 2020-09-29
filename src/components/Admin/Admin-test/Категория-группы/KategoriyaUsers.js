import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from "react-redux";
import { withRouter} from "react-router-dom";
import {faSort } from '@fortawesome/free-solid-svg-icons'
import './Kategoriya.css'
import 'datatables';
import $ from 'jquery';
import {languages } from "../../../../utils/constants";
import { Loader } from "../../../temps/Loader";
window.$ = $;

const KategoriyaUsers = (props) => {
  const { users, loading,editemployee,usersPerPage,setUsersPerPage } = props;
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
   
  if (loading) {
      return <div className="align-self-center"><Loader /></div>
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
        <div className="nav justify-content-end"> <span style={{fontSize: "16px"}}>{languages[props.language.key].Admin.CategoryUsers.ResultsNum} </span>
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
      <table id="example" style={{display: "table"}}>
        <thead className="table-active table-bordered">
          <tr style={{padding: "5px"}}>
            <th>№</th>
            <th>
              <FontAwesomeIcon icon={faSort} style={{fontSize: "16px", marginRight: "0px"}}/>{languages[props.language.key].Admin.CategoryUsers.NameofGroup}</th>
            <th>{languages[props.language.key].Admin.CategoryUsers.DeadlineStart}</th>
            <th>{languages[props.language.key].Admin.CategoryUsers.DeadlineEnd}</th>
            <th>
              <FontAwesomeIcon icon={faSort} style={{fontSize: "16px", marginRight: "0px"}}/>{languages[props.language.key].Admin.CategoryUsers.branch}</th>
            <th>
              <FontAwesomeIcon icon={faSort} style={{fontSize: "16px", marginRight: "0px"}}/>{languages[props.language.key].Admin.CategoryUsers.Department}</th>
            <th>
              <FontAwesomeIcon icon={faSort} style={{fontSize: "16px", marginRight: "0px"}}/>{languages[props.language.key].Admin.CategoryUsers.Postion}</th>
            <th>{languages[props.language.key].Admin.Editemployee.AssignedQuestions}</th>
            <th>{languages[props.language.key].Admin.Editemployee.AssignedQuestions2}</th>
            <th>{languages[props.language.key].Admin.Editemployee.AssignedQuestions3}</th>
            <th>{languages[props.language.key].Admin.CategoryUsers.Act}</th>
          </tr>
        </thead>
        <tbody id="myTable">{users.map((user,i) => (
          <tr key={user.id} className="table table-bordered">
            <td>{i+1}</td>
            <td dangerouslySetInnerHTML = { {__html: user.groupname} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.deadline_start} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.deadline_end} }></td>
            <td style={{ display: "block",
           width:"200px",
    textOverflow: "ellipsis", wordWrap: "break-all"}} dangerouslySetInnerHTML = { {__html: user.branch.charAt(0).toUpperCase() + user.branch.slice(1).toLowerCase()} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.department} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.position} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.questionCat1} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.questionCat2} }></td>
            <td dangerouslySetInnerHTML = { {__html: user.questionCat3} }></td>
            <td>
              <div className="btn-group">
                <button className="mainbutton" onClick={()=>{ editemployee(user.id) }}>{languages[props.language.key].Admin.CategoryUsers.Edit}</button>
              </div>
            </td>
          </tr>) ) }</tbody>
      </table>
     
    </div>
    
  </div>
  );
}
const mapStateToProps = ({language}) => ({language});
export default connect(mapStateToProps)(withRouter(KategoriyaUsers));




