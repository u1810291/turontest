import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import './Editemployee.css';
import { languages } from "../../../../utils/constants";
import $ from 'jquery';
window.$ = $;
const Editemployee = (props) => {
    const [questioncat1,setQuestioncat1]=useState("")
    const [questioncat2,setQuestioncat2]=useState("")
    const [questioncat3,setQuestioncat3]=useState("")
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [employee, setEmployee] = useState({ groupname:'', questionCat1: '',questionCat2:'',questionCat3:''});
    const id = props.match.params.id;
    const onChange = (e) => {
        e.persist();
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const [questions, setQuestions] = useState([]);
  
    async function getQuestionCategories(){
        try{
        
            await axios({url: 'http://172.16.1.188:8000/questions/categories/all', method:"GET", headers: {
                 "Content-Type": "application/json",
                 'Authorization': `Bearer ${sessionStorage.getItem("token")}`
             }}).then(res => {
                 console.log(res)
                 setQuestions(res.data.rows);
               
             }).catch(e => {
                 console.log(e);
             });
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        //if(questions === null || questions === undefined || questions === []){
            getQuestionCategories();
        //}
    }, []);
    
    
    async function GetData() {
        try {
            const res = await axios({
                url: `http://172.16.1.188:8000/group/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            const body = await (res.data);
            setEmployee(body);
            setQuestioncat1(body.questionCategory1.category)
            setQuestioncat2(body.questionCategory2.category)
            setQuestioncat3(body.questionCategory3.category)
          

            console.log(res.data);
            console.log(res.data.deadline_end)
            
        }
        catch (error) {
            console.log(error);
        }
    }
  
    useEffect(() => {
        // if(employee.groupname === undefined || employee.groupname === null){
            GetData();
            
        //}
    }, []);


     async function GetUpdatedData(){
       
        try{
            const data = { groupname: employee.groupname,   deadline_start:startDate,
                deadline_end:endDate,questionCategories:[employee.questionCat1,employee.questionCat2,employee.questionCat3,]};
           await axios({
                url: `http://172.16.1.188:8000/group/edit/${id}`, method: "PATCH", headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },data:await data} );
                console.log(data);
           
                    if(props.isAdmin.data.isAdmin){
                   
                       
                        props.history.push('/Admin/Groups/');
                    } else{
                        props.history.push('/user/assignedtests');
                    }  
              
        }catch(error){
            console.log(error)
        }
       
    };
    const starthandle=event=>{
        $('[name="date_start"]').on('change',function() {
            var dataEnd = $(this).val();
          
            setStartDate(((new Date(dataEnd)).getTime())/1000)
            
          })
    }
    const endhandle=event=>{
        $('[name="date_end"]').on('change',function() {
            var dataEnd = $(this).val();
            setEndDate(((new Date(dataEnd)).getTime())/1000)
          })
    }

    return (
        <div className='container mb-4'>
            <form onSubmit={GetUpdatedData}>
                <div class="align-selft-center mt-4 mb-4">
                    <h3> {languages[props.language.key].Admin.Editemployee.Group} {employee.groupname}</h3>
                </div>
                <div class="row">
                    <div className="container ">
                        <div className="mb-5 inputdes col-md-5 first"> <span>{languages[props.language.key].Admin.Editemployee.AssignedQuestions}</span>
                            <select className="groupname" className="form-control" name="questionCat1" id="questionCat1" value={employee.questionCat1} onChange={onChange}>
                                <option value={questioncat1}>{questioncat1}</option>{questions.map((question,i) => (
                                <option key={question.value} value={question.value}>{question.category}</option>) ) }</select>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <div className="container Inputt">
                    <div class="row">
                        <div className="col-md-1"></div>
                        <div className="mb-5 inputdes col-md-5"> <span>{languages[props.language.key].Admin.Editemployee.AssignedQuestions2}</span>
                            <select className="form-control" name="questionCat2" id="questionCat2" value={employee.questionCat2} onChange={onChange}>
                                <option value={questioncat2}>{questioncat2}</option>{questions.map((question,i) => (
                                <option key={question.value} value={question.value}>{question.category}</option>) ) }</select>
                        </div>
                        <div className="mb-5 inputdes col-md-5"> <span>{languages[props.language.key].Admin.Editemployee.AssignedQuestions3}</span>
                            <select className="groupname" className="form-control" name="questionCat3" id="questionCat3" value={employee.questionCat3} onChange={onChange}>
                                <option value={questioncat3}>{questioncat3}</option>{questions.map((question,i) => (
                                <option key={question.value} value={question.value}>{question.category}</option>) ) }</select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="container ">
                        <div className="mb-5 inputdes col-md-5 first"> <span>{languages[props.language.key].Admin.AdminUser.Teststart}</span>
                        <input className="groupname " name="date_start" type="datetime-local" onChange={starthandle} />
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <div class="row">
                    <div className="container ">
                        <div className="mb-5 inputdes col-md-5 first"> <span>{languages[props.language.key].Admin.AdminUser.TestEnd}</span>
                        <input className="groupname" name="date_end" type="datetime-local" onChange={endhandle} />
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                
    
            </form>
            <button type="submit" style={{marginLeft: "45%"}} className="btn btn-success" block="true" onClick={GetUpdatedData}> <span>{languages[props.language.key].Admin.Editemployee.Save}</span>
            </button>
        </div>
    )
}
const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(withRouter(Editemployee));