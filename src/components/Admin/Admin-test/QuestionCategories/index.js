import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import QuestionPagination from './questionPagination';
import QuestionsList from './QuestionsList';
import "./questionCategories.css";
import { languages } from "../../../../utils/constants"

const QuestionCategories = (props) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(10);
    async function getQuestionCategories(){
        try{
            setLoading(true);
            await axios({url: 'http://172.16.1.188:8000/questions/categories/all', method:"GET", headers: {
                 "Content-Type": "application/json",
                 'Authorization': `Bearer ${sessionStorage.getItem("token")}`
             }}).then(res => {
                //  console.log(res)
                 setQuestions(res.data.rows);
                 setLoading(false);
             }).catch(e => {
                //  console.log(e);
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
   
// const editQuestions = (id) => {
//     props.history.push(`/Admin/Groups/${id}`);
// }    

   
    // get curent users

    const indexOfLastUser = currentPage * questionsPerPage;
    const indexOfFirstUser = indexOfLastUser - questionsPerPage;
    const currentQuestion = questions.slice(indexOfFirstUser, indexOfLastUser);

    // change page

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
     
        <div className='container mb-4'>
            <h3>{languages[props.language.key].Admin.QuestionCategory.QuestionCategories}</h3>
         
            <QuestionsList questions={currentQuestion} loading={loading}   setQuestionsPerPage={setQuestionsPerPage} />
            <QuestionPagination questionsPerPage={questionsPerPage} totalQuestions={questions.length} paginate={paginate} />
           
        </div>
     
    );
}
const mapStateToProps = ({isAdmin,router,language}) => ({isAdmin,router,language});
export default connect(mapStateToProps)(withRouter(QuestionCategories));