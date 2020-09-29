import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {languages} from "../../../utils/constants";
import './AdminResult.css'
const AdminDetailResult = (props) => {
    const [detailuser, setDetailuser] = useState([]);
    const [detailuser2, setDetailuser2] = useState([]);
    const [detailuser3, setDetailuser3] = useState([]);
    const [passed, setPassed] = useState("");
    const additional = props.match.params.id;
    const [resultId, setID] = (additional);

    async function GetDataUsers() {
        try {
            // console.log(additional);
            const res = await axios({

                url: `http://172.16.1.188:8000/results/byResultId/${additional}`,
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((res)=>{
                if(res.data.rows === undefined || res.data.rows === null){
                    setDetailuser([]);
                    setDetailuser2([]);
                    setDetailuser3([]);
                    console.log(res.data);
                }else{
                    setDetailuser(res.data.rows.user);
                    setDetailuser2(res.data.rows);
                    setDetailuser3(res.data.rows.questionCategory);
                    if (res.data.rows.passed === 1) {
                        setPassed("passed");
                        // console.log('passed');
                    }
                    if (res.data.rows.passed === 0) {
                        setPassed("failed")

                    }
                    // console.log(res.data);
                }
            });
            

        }
        catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        //if(detailuser.length <= 0 || detailuser === undefined || detailuser === null){
            GetDataUsers();
        //}
    }, []);


    return (
        <div className="container mb-4">
            <div >
                <legend style={{color:"#4CAF50",textAlign:"center",fontWeight:"bold",marginBottom:"20px",marginTop:"20px",fontSize:"26px"}}>{languages[props.language.key].Admin.AdminDetailResult.PersonalInfo}</legend>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.QuestionCategories}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser3.category}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.ResultsNum}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.total_questions}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.TestTime}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser3.time}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.TimeStartTest}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.start_time}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.TimeEndTest}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.end_time}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.CorrectAnswers}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.correct_answers}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.WrongAnswers}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.wrong_answers}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.Score}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{parseInt(detailuser2.score).toFixed(2)}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.Comment}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.comment}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.Tries}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.attempted}</h4></div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row text-left mt-3 userInfoDiv">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 p-2"><h4>{languages[props.language.key].Admin.AdminDetailResult.Succespass}</h4></div>
                    <div class="col-md-4 userDetails p-2 rounded-lg"><h4>{detailuser2.passed ? languages[props.language.key].User.UserTests.Yes : languages[props.language.key].User.UserTests.No}</h4></div>
                    <div class="col-md-2"></div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(withRouter(AdminDetailResult));