import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DialogContentText from '@material-ui/core/DialogContentText';

import history from '../../../history';
import { languages } from "../../../utils/constants";
import { stopTimer } from "../../../store/actions/TimerAction";
import { requestGetQuestions } from "../../../store/actions/QuestionAction";
import { startTest } from '../../../store/actions/TestAction'
import { endTest } from '../../../store/actions/TestAction'
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

function Test(props){
    const classes = useStyles();
    const [checkedItems, setCheckedItems] = useState([]);
    const [answers,setAnswers] = useState({});
    const [startTime, setStartTime] = useState(Math.round(+new Date()/1000));
    const [comment, setComment] = useState("");
    const id = props.categoryId;
    const [open, setOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false)
    

    const onUnload = async (e) => {
      await submitCheckedAnswers();
      var dialogText = 'Dialog text here';
      e.returnValue = dialogText;
      return dialogText;
    };

     useEffect(()=>{
        props.requestGetQuestions(id);
        props.startTest(true);

        window.addEventListener("beforeunload", (e) => onUnload(e));
    }, []);

    useEffect(()=>{
      if(props.counter === 1) {
        submitCheckedAnswers()
      }
    }, [props.counter]);

    const submitCheckedAnswers = () => {
            let token =  sessionStorage.getItem("token"); 
            const body = {
                answers: checkedItems.checked ? checkedItems.checked : [{questionId: "", answer: ""}],
                questionCatId: props.questions.options.questionCatId,
                start_time: startTime !== null || startTime !== undefined ? startTime : "",
                comment: comment
            };
            axios({url:`http://172.16.1.188:8000/questions/answers`,
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                data: body
            }).then(res => {
                if(res.status === 200 || res.status === 201){
                    setAnswers(res.data);
                    console.log("success! Status: ",res.data);
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
            } 
    
 const handleWarning = () => {
    if(Array.isArray(checkedItems.checked) && checkedItems.checked.length === props.questions.data.length){
        submitCheckedAnswers()
        setOpen(true);
    } else {
                setWarningOpen(true)
            }
 }

const handleChange = async () => {
    var checkboxes = document.querySelectorAll("input[type=radio]");
    var checked = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checked.push({ questionId: parseInt(checkboxes[i].id), answer: checkboxes[i].value });
      } 
    }
    await setCheckedItems({
      ...checkedItems,
      checked: [...checked],
    });   
};

const handleClose = () => {
  setOpen(false);
  props.stopTimer()
  props.endTest(false)
  props.startTest(false)
  history.push('/user/archive')
};

const handleWarningClose = () => {
  setWarningOpen(false);
};

return (
    <div>
        {props.questions.loading ? 
            <LinearProgress /> 
        : <div className="container">

    {
    props.questions.data.map((question,i)=>{
    return (
      <div className="card p-4" key={i}>
        <div className="row ml-2 pb-2">
            <h6>{languages[props.language.key].User.Test.Question} {i + 1}/{props.questions.data.length}</h6>
        </div>
        
        <div className="row ml-2 mb-2 pb-2 question-text" key={question.id}>
            <h5><span>{question.question}</span> </h5>
        </div>
        <div className="d-flex flex-column mb-4">
            <label className="radiocontainer text-left mt-2 mb-2" id="label2"> 
                <span>{question.a}</span>
                <input key={question.id} type="radio"  id={question.id} name={question.id} 
                    checked={checkedItems[`{answer:"a",${question.id}}`]} onChange={handleChange}
                    value={'a'}
                />
                    <span className="checkmark"></span>
            </label>
            <label className="radiocontainer text-left mt-2 mb-2" id="label2"> 
                {question.b}
                <input key={question.id} type="radio"  id={question.id} name={question.id} 
                    checked={checkedItems[`{answer:"b",${question.id}}`]} onChange={handleChange}
                    value={'b'} />
                    <span className="checkmark"></span>
            </label>
            <label className="radiocontainer text-left mt-2 mb-2" id="label2"> 
                {question.c}
                <input key={question.id} type="radio"  id={question.id} name={question.id} 
                    checked={checkedItems[`{answer:"c",${question.id}}`]} onChange={handleChange}
                    value={'c'}  />
                    <span className="checkmark"></span>
            </label>
            <label className="radiocontainer text-left mt-2 mb-2" id="label2"> 
                {question.d}
                <input key={question.id} type="radio"  id={question.id} name={question.id} 
                    checked={checkedItems[`{answer:"d",${question.id}}`]} onChange={handleChange}
                    value={'d'}  />
                    <span className="checkmark"></span>
            </label>
        </div>
    </div>
    )
    })
    }

    <div className="row">
        <div className="col-md-12 float-right">
            <Button variant="contained" color="primary" onClick={handleWarning}>
              {languages[props.language.key].User.Test.Finish}
              </Button>
                </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  {languages[props.language.key].User.Test.Your_Score}
                </DialogTitle>
                <DialogContent>
                  <List className={classes.list}>
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.CategoryName} />
            <ListItemText className={classes.alignRight} primary={props.categoryName} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.QuestionsAmount} />
            <ListItemText className={classes.alignRight} primary={answers.total_questions} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.InCorrectAnswersAmount} />
            <ListItemText className={classes.alignRight} primary={answers.numOfIncorrect} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.CorrectAnswersAmount} />
            <ListItemText className={classes.alignRight} primary={answers.numOfCorrect} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.Score} />
            <ListItemText className={classes.alignRight} primary={parseInt(answers.score).toFixed(2)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.Status} />
            <ListItemText className={classes.alignRight} primary={answers.score <= 69 ? languages[props.language.key].User.Test.UnsatisfactoryStatus : (answers.score <= 80 ? languages[props.language.key].User.Test.SatisfactoryStatus : (answers.score <= 99 ? languages[props.language.key].User.Test.Good : languages[props.language.key].User.Test.ExcellentStatus) ) } />
          </ListItem>
        </List>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    {languages[props.language.key].User.Test.Finish}
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog onClose={handleWarningClose} aria-labelledby="customized-dialog-title" open={warningOpen} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleWarningClose}>
                  {languages[props.language.key].User.Test.Alert}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                  {languages[props.language.key].User.Test.Please_answer_to_all_questions}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleWarningClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
    </div>
    </div> 
}
</div> 
)}

const mapDispatchToProps = dispatch => ({
  requestGetQuestions: (id) => {dispatch(requestGetQuestions(id))},
  stopTimer: () => {dispatch(stopTimer())},
  startTest: (val) => {dispatch(startTest(val))},
  endTest: (val) => {dispatch(endTest(val))}
})

const mapStateToProps = ({ isAdmin, questions, timer, router, startTest,endTest,language }) => ({ isAdmin, questions, timer, router,startTest,endTest,language });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Test));