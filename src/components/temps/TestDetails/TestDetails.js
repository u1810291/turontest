import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

import { languages } from "../../../utils/constants";
import { requestGetQuestions } from "../../../store/actions/QuestionAction";

import "./test.css";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  
  divider: {
    width: '100%'
  },
  alignRight: {
    textAlign: 'right'
  },
  list: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 0,
    marginTop: 0
  }
}));

function TestDetails(props){
    
    const [answers,setAnswers] = useState([]);

  useEffect(()=>{
    axios({url:`http://172.16.1.188:8000/users/questionCategories/archive/details/${props.categoryId}`,
    method: "GET",
    headers : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    }
}).then(res => {
}).catch(e => {
    // console.log(e);
});
    axios({url:`http://172.16.1.188:8000/users/questionCategories/archive/details/${props.categoryId}`,
            method: "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res => {
            if(res.status === 200 || res.status === 201){
                setAnswers(res.data.rows);
                // console.log("success! Status: ",res.data.rows);
            }else if(res.status === 400 || res.status === 401){
                setAnswers({});
                // console.log("ERROR Status: ",res.status);
            }else{
                setAnswers({});
                // console.log("ERROR Status: ",res.status);
            }
        }).catch(e => {
            // console.log(e);
        });
}, []);

    return (
        <div>
            {!Array.isArray(answers) ? 
                <LinearProgress /> 
            : <div className="container">

        {
        answers.map((answer,i)=>{
        return (<div className="card pt-4 pl-4 pr-4" key={i}>
            <div className="row ml-2 pb-2">
                <h6>{languages[props.language.key].User.Test.Question} {i + 1}/{answers.length}</h6>
            </div>
            
            <div className="row ml-2 mb-2 pb-2 question-text" key={answer.id}>
                <h5><span>{answer.question}</span> </h5>
            </div>
            <div className="d-flex flex-column mb-4">
            
                <label className={(answer.correct === "0" ? "red-container" : "green-container") + " text-left" + " mt-2" + " mb-2"}> 
                <div className="row">
                
                  <div className="col-md-10">
                    {answer.correct !== "0" ?
                      <IoMdCheckmark color="green" className="correctIcon" size={25} />
                    :
                    <IoMdClose color="red" className="wrongIcon" size={25} />
                    }
                    {answer.user_answer !== "" ? answer.user_answer : languages[props.language.key].User.TestDetails.Your_answer }
                </div> 
                <div className="col-md-2">
                    <span className="answercomment">{languages[props.language.key].User.TestDetails.Your_answer}</span>
                </div>
                </div>
                </label>
                
                {answer.correct === "0" ?
                
                <label className="green-container text-left mt-2 mb-2"> 
                    <div className="row">
                    
                  <div className="col-md-10">
                  <IoMdCheckmark color="green" className="correctIcon" size={25} />
                    {answer.right_answer}
                    </div> 
                    <div className="col-md-2">
                    <span className="answercomment">{languages[props.language.key].User.TestDetails.Correct}</span>
                    </div>
                    </div>
                </label>                 
                : null }   
            </div>
        </div>)
        })
        }
        </div> 
}
    </div> 
    )
}

const mapStateToProps = ({ isAdmin,questions,router,startTest,language }) => ({ isAdmin,questions,router,startTest,language });
export default connect(mapStateToProps, { requestGetQuestions })(withRouter(TestDetails));