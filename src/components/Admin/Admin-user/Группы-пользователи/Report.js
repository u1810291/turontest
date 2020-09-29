import React, { useState, useEffect, createElement } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import './GroupCreate.css';
import "react-datepicker/dist/react-datepicker.css";
import {languages } from "../../../../utils/constants";

window.$ = $;

const Report = (props) => {
  
    const [branch, setBranch] = useState([]);
 
    const [getbranch, setGetBranch] = useState([]);
    const [getbranch2, setBranchByReportMultiple] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [getquestions, setGetQuestions] = useState([]);
 
    const [multiSelect, setMultiSelect] = useState([]);

    const [data,setData]=useState([]);
    const [datamultiple,setDataMultiple]=useState([]);
    const [reportName,setReportName] = useState("report");
 
    useEffect(() => {
        async function getCategory() {
            try {
                const response = await axios({
                    url: "http://172.16.1.188:8000/users/getAttributes", method: "GET", headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
                const body = await response.data;
             
                setBranch(body.branches);
                setBranchByReportMultiple(body.branches);
            }
            catch (error) {
                console.log(error);
            }
        }
     
        getCategory()
     
    }, []);

    function getQuestionCategories(){
           
            axios({url: 'http://172.16.1.188:8000/questions/categories/all', method:"GET", headers: {
                 "Content-Type": "application/json",
                 'Authorization': `Bearer ${sessionStorage.getItem("token")}`
             }}).then(res => {
                 console.log(res)
                 setQuestions(res.data.rows);
               
                
             }).catch(e => {
                 console.log(e);
             });

    }
    useEffect(() => {
        //if(questions === null || questions === undefined || questions === []){
            getQuestionCategories();
            console.log()
        //}
    }, []);
      
    const Submit=(e)=> {
        e.preventDefault();      
            const body = {
                branch: getbranch,
                category:getquestions,
                isDownload:false
            };
           axios({
                 url: "http://172.16.1.188:8000/report/QuestionCategory", method: "POST", headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }, data: body 
            })
            .then(res => {
                
                console.log(res.data);
                setData(res.data.rows);
                setReportName(res.data.rows[0].questionCategory.category);
            }).catch((error)=>{
                console.log(error);
            })
    
        }
        const SubmitMultipleReport=(e)=> {
            e.preventDefault();      
                const body = {
                    branch: getbranch2,
                    categories:multiSelect,
                
                };
               axios({
                     url: "http://172.16.1.188:8000/report/ByPosition", method: "POST", headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }, data: body 
                })
                .then(res => {
                    
                    console.log(res.data.results);
                    setDataMultiple(res.data.results);
                    console.log(res.data);
                }).catch((error)=>{
                    console.log(error);
                })
        
            }
        function MultiSelect(e) {
            // const selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value)
            const selectedOptions = [...e.target.selectedOptions].map((o) => o.value);
            // setGetQuestionsMultiple(selectedOptions);
            setMultiSelect(selectedOptions)
          }
         
    return (
        <div className="container mb-4">
       

        <form  >
            <div className="head">
                <div className="form-group">
                <h4>{languages[props.language.key].Admin.Report.ReportByOne}</h4>
                    <div className="flex1">
                   
                        <div className="group2-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.branch}</h5>
                            <select className="groupname " name="branch" value={getbranch}  
                    onChange={(e)=>{setGetBranch(e.target.value)} }>
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{branch.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.branch }}></option>))}</select>
                            <br/>
                          
                          
                        </div>
                        <br/>
                        <div className="group2-flexbox">
                        <h5>{languages[props.language.key].Admin.Report.QuestionCategory}</h5>
                            <select className="groupname " name="branch" value={getquestions}  
                    onChange={(e)=>{setGetQuestions(e.target.value)} }>
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{questions.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.category }}></option>))}</select>
                            <br/>
                          
                          
                        </div>
                    </div>
                    <br/>
                 
                  
                </div>
                <button  style={{marginLeft: "45%"}} className="btn btn-success"  onClick={(e) => {Submit(e)}}>{languages[props.language.key].Admin.AdminUser.Save}</button>
            </div>
        </form>
        <div className="card-body" style={{ width: "100%" }}>
                
                    <table id="example1" className="table table-bordered table-striped table-responsive">
                        <thead className="headers">
                            <tr>
                                <th>#</th>
                                <th>Фамилия</th>
                                <th>Исм</th>
                                <th>Шариф</th>
                                <th>Лавозим</th>
                                <th>Йуналиш</th>
                                <th>Бахо</th>
                                <th>Балл</th>
                                <th>Тугри Жавоблар</th>
                                <th>Нотугри Жавоблар</th>
                          
                            </tr>
                        </thead>
                        <tbody id="myTable">
                        {data.map((item, id) => ( 
                        <tr> 
                        <td>{id+1}</td>
                        <td dangerouslySetInnerHTML = { {__html: item.user.firstname} }></td>
                        <td dangerouslySetInnerHTML = { {__html: item.user.surname} }></td>
                        <td dangerouslySetInnerHTML = { {__html: item.user.lastname} }></td>
                        <td dangerouslySetInnerHTML = { {__html: item.user.position} }></td>
                        <td dangerouslySetInnerHTML = { {__html: item.user.department} }></td>
                        <td>{item.score <= 69 ? languages[props.language.key].User.Test.UnsatisfactoryStatus : (item.score <= 80 ? languages[props.language.key].User.Test.SatisfactoryStatus : (item.score <= 99 ? languages[props.language.key].User.Test.Good : languages[props.language.key].User.Test.ExcellentStatus) ) }</td>
                        <td>{item.score}</td>
                        <td>{item.correct_answers}</td>
                        <td>{item.wrong_answers}</td>
                        </tr>
                           ))}
                        </tbody>
                    </table>
                    <ReactHTMLTableToExcel 
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="example1"
                            filename={reportName}
                            sheet="report"
                            buttonText={languages[props.language.key].Admin.Report.UploadReport}/>
                </div>
                <form  >
            <div className="head">
                <div className="form-group">
                <h4>{languages[props.language.key].Admin.Report.ReportByMany}</h4>
                    <div className="flex1">
                   
                        <div className="group2-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.branch}</h5>
                            <select className="groupname " name="branch" value={getbranch2}  
                  
                     onChange={(e)=>{setBranchByReportMultiple(e.target.value)} }> 
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{branch.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.branch }}></option>))}</select>
                            <br/>
                        </div>
                        <br/>
                        <div className="group2-flexbox">
                        <h5>{languages[props.language.key].Admin.Report.QuestionCategory}</h5>
                            <select className="groupname " name="branch" value={multiSelect} multiple={true}
                    onChange={(e) => MultiSelect(e)} >
                
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{questions.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.category }}></option>))}</select>
                            <br/>
                          
                          
                        </div>
                    </div>
                    <br/>
                 
                  
                </div>
                <button  style={{marginLeft: "45%"}} className="btn btn-success"  onClick={(e) => {SubmitMultipleReport(e)}}>{languages[props.language.key].Admin.AdminUser.Save}</button>
            </div>
        </form>
        <div className="card-body" style={{ width: "100%" }}>
                
                <table id="example2" className="table table-bordered table-striped table-responsive">
                    <thead className="headers">
                        <tr>
                            <th>#</th>
                            <th>Ф.И.Ш</th>
                            <th>Лавозим</th>
                            <th>Bo'lim</th>
                            {multiSelect.map((item,id)=>(
                    
                               <th>{item}</th>
                            ))}
                            
                        </tr>
                    </thead>
                    <tbody id="myTable">
                    {datamultiple.map((item, id) => ( 
                    <tr> 
                    <td>{id+1}</td>
                    <td dangerouslySetInnerHTML = { {__html: `${item.surname} ${item.firstname} ${item.lastname}`} }></td>
                    <td dangerouslySetInnerHTML = { {__html: item.position} }></td>
                    <td dangerouslySetInnerHTML = { {__html: item.department} }></td>
                    {item.results.map((item,id)=>(
                        <td>{item.score}</td>
                    ))}

                    </tr>
                       ))}
                    </tbody>
                </table>
                <ReactHTMLTableToExcel 
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="example2"
                        filename=""
                        sheet="report"
                        buttonText={languages[props.language.key].Admin.Report.UploadReport}/>
            </div>
    </div>
    )

}

const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(withRouter(Report));