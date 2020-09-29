import React from 'react'
import {connect} from "react-redux";
import { languages } from "../../../../utils/constants";
import "./questionCategories.css";
import 'datatables';
import $ from 'jquery';
import Loader from "../../../temps/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortNumericUp } from '@fortawesome/free-solid-svg-icons'
import {faSort } from '@fortawesome/free-solid-svg-icons'
window.$ = $;
const QuestionsList = (props) => {
  const { questions, loading,editQuestions,questionsPerPage,setQuestionsPerPage } = props;
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
        setQuestionsPerPage(e.target.value);
        console.log(questionsPerPage)
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
          <div className="nav justify-content-end"> <span style={{fontSize: "16px"}}>{languages[props.language.key].Admin.QuestionCategory.TotalResult} </span>
            <select defaultValue={questionsPerPage} onChange={handleUsersPerPageChange} className="selectt">
              <option defaultValue="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="2000">All</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive table-hover table-bordered">
        <table id="example" className="table" style={{display: "table"}}>
          <thead className="table-active table-bordered">
            <tr>
              <th>
                <FontAwesomeIcon icon={faSortNumericUp } style={{fontSize: "14px", marginRight: "2px"}}/>ID</th>
              <th>
                <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.QuestionCategory.Category}</th>
              <th>
                <FontAwesomeIcon icon={faSort } style={{fontSize: "14px", marginRight: "2px"}}/>{languages[props.language.key].Admin.QuestionCategory.Time}</th>
            </tr>
          </thead>
          <tbody id="myTable">{ questions.map((data)=>{ 
            return(
            <tr key={data.id} className="table table-bordered">
              <td>{data.id}</td>
              <td dangerouslySetInnerHTML = { {__html: data.category} }></td>
              <td dangerouslySetInnerHTML = { {__html: data.time} }></td>
            </tr>);
            }) }
          </tbody>
        </table>
      </div>
    </div>
  );
}
const mapStateToProps = ({language}) => ({language});
export default connect(mapStateToProps)(QuestionsList);