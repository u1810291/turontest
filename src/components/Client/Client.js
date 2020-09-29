import React, { useEffect, useState } from 'react'

import {useHistory} from 'react-router-dom';
import axios from 'axios'
import Result from './Result';

import './Client.css';

function TestContainer({id}) {
   const [loading, setLoading] = useState(false);
   const [checkedItems, setCheckedItems] = useState([]);
   let history=useHistory();
   const [questiondata,setQuestiondata]=useState([]);
   const [result, setResults] = useState("");
   const [time,setTime]=useState();
   const [result1, setResults1] = useState("");
   const [result2, setResults2] = useState("");
   const [result3, setResults3] = useState("");
 
useEffect(() => {
    setLoading(true);
      axios({url: 'http://localhost:5000/users/questions', method:"GET", headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  }}).then(res => {
      console.log(res);
      setQuestiondata(res.data.rows);
      setTime(res.data.test_time);
      setLoading(false);
  }).catch(e => {
      console.log(e);
  });
}, [setQuestiondata,setTime]);

useEffect(() => {
  time> 0 && setTimeout(() => setTime(time - 1), 1000)
  if (time===0){
    alert("time is up")
    history.push("/");
  }

}, [time]);

function formatTime(time){
  let minutes = Math.floor(time / 60).toString();
  if(minutes.length === 1){
      minutes = "0"+minutes
  }
  let seconds = (time - minutes * 60).toString();
  if(seconds.length === 1){
      seconds = "0"+seconds
  }
  return `${minutes+' min '} ${seconds+' sec '}`
}
  
async function Submitform() {
    try {
      const body = {
        "answers": checkedItems.checked
      };

      const response = await axios({
        url: "http://localhost:5000/questions/answers", method: "POST", headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }, data: body
      });

      const results = await response;
     
      setResults(results.data.total_questions);
      setResults1(results.data.numOfCorrect);
      setResults2(results.data.numOfIncorrect);
     
      if(results.data.passed===1){
        setResults3("passed");
      }
      if(results.data.passed===0){
        setResults3("failed")
      }
    }

    catch (error) {
      console.log(error)
    }
  }
 
  

  const handleChange = (e) => {
    var checkboxes = document.querySelectorAll("input[type=radio]")

    var checked = [];

    for (var i = 0; i < checkboxes.length; i++) {

      var checkbox = checkboxes[i];

      if (checkbox.checked) (checked.push({ questionId: parseInt(checkbox.id), answer: checkbox.value }));

    }
    setCheckedItems({
      ...checkedItems,
      checked: [...checked, id],
    
    });

    console.log(checkedItems, id);

  };
 


  return loading ? (
    <h2>Loading</h2>
  ) : (
    <form onSubmit={Submitform}>
     
    <div className="good">
    <div className="Client">
    <div className="clientnavbar">
                    <h3>Client</h3>
                    <div className="clientnav">
                        <p>Главная</p>
                        <p>Помошь</p>
                        <p>Выход</p>
                    </div>
    </div>
    <div className="clientparametrs">
       <div className="col col-md-12">
      
      <div className="profile-content" >
      <div className="test">
      <div className="flex">
      <h2>Clients Test</h2>
    
      <h4> Time: <span id="time-left">{formatTime(time)}</span></h4> 
      </div>
       </div> 
        {
          // questiondata !== undefined || questiondata !== null ?    
          questiondata.map((user) => (
           
            <div key={user.id} className="mainquestions">
              <div className="categoryid">
              <div className="category">
             <h3> Category :<span>{user.questionCat.category}</span></h3>
                </div>
                {user.questions.map((question, i) => (

                  <div key={question.id} className="question">
                    <div className="quest">
                      <h3><div>{i + 1}</div><span>{question.question}</span></h3>
                    </div>
                    <div className="variant">
                      <p> <label> <input key={question.id} type='radio' id={question.id} name={question.id} value={'a'} checked={checkedItems[`{answer:"a",${question.id}}`]} onChange={handleChange} /><span> a: {question.a}</span></label></p>
                      <p> <label> <input key={question.id} type='radio' id={question.id} name={question.id} value={'b'} checked={checkedItems[`{answer:"b",${question.id}}`]} onChange={handleChange} /><span> b: {question.b}</span></label></p>
                      <p> <label> <input key={question.id} type='radio' id={question.id} name={question.id} value={'c'} checked={checkedItems[`{answer:"c",${question.id}}`]} onChange={handleChange} /><span> c: {question.c}</span></label></p>
                      <p> <label> <input key={question.id} type='radio' id={question.id} name={question.id} value={'d'} checked={checkedItems[`{answer:"d",${question.id}}`]} onChange={handleChange} /><span> d: {question.d}</span></label></p>
                      
                     
                    </div><hr/>
                  </div>
                ))}
              </div>
            
            </div>
          ))
        // : null
        }
      
  
         <div>
      
         <input type="button" className="submitform" value="Result" onClick={Submitform} />
        <div className="Resul">
         <Result result={result} result1={result1} result2={result2} result3={result3}/> 
        </div>
      
        </div>
        
      </div> 
      
      </div>
      </div>
    </div>
    </div>
  </form>
    
      )
   

}

export default TestContainer;



