import React, { useState, useEffect } from "react";
import { FaCheck,FaTimes,FaInfo } from "react-icons/fa";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";



function QuestionResult(props){

const [answers,setAnswers] = useState([]);
const id = props.match.params.id;

async function getArchieveAnswers(i){
    try{    
        let token =  sessionStorage.getItem("token"); 
        let id = i === 0 ? i++ : i;
        const response = await axios({url:`http://172.16.1.188:8000/users/questionCategories/archive/details/${id}`,
            method: "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if(res.status === 200 || res.status === 201){
                setAnswers(res.data.rows);
                console.log("success! Status: ",res.data.rows);
            }else if(res.status === 400 || res.status === 401){
                setAnswers({});
                console.log("ERROR Status: ",res.status);
            }else{
                setAnswers({});
                console.log("ERROR Status: ",res.status);
            }
        }).catch(e => {
            console.log(e);
        });
    }catch(e){
        console.log(e);
    }
}
useEffect(()=>{
    //if(answers === null || answers === undefined){
        getArchieveAnswers(id);
    //} 
},[]);
 return(   
        <div className="container-fluid">
            {
                answers.map((answer,i)=>{
                    return (<div className="card p-4">
                        <div class="d-flex flex-column mb-4">
                            <div className="mr-4 ml-4 mt-2 mb-4 text-left"><h2>{i+1}.{answer.question}</h2></div>
                            <div className="row bg-info mr-4 ml-4" id="label2">
                                <div class="col-md-offset-1 mt-4 mb-4 markcontainer">
                                    {answer.correct === "1" ?  <FaCheck color={"white"} size={25} /> : <FaTimes color={"white"} size={25} /> }
                                </div>
                                <div className="col-md-9 mt-2 mb-2" style={{color: "white",fontSize:"20px"}}>
                                        {answer.right_answer} 
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                            <div className="row bg-secondary mr-4 ml-4" id="label2">
                                <div class="col-md-offset-1 mt-4 mb-4 markcontainer">
                                    <FaInfo color={"white"} size={25} />
                                </div>
                                <div className="col-md-9 mt-2 mb-2" style={{color: "white",fontSize:"20px"}}>
                                    {answer.user_answer}
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )

}

const mapStateToProps = ({ isAdmin,questions,router,startTest }) => ({ isAdmin,questions,router,startTest });
export default connect(mapStateToProps)(withRouter(QuestionResult));