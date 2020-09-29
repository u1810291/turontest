
import React from 'react'
import './Result.css'
 const Result=({result,result1,result2,result3})=>{

   return (
     
  <div className="hi">
  
     <p>Your Results</p>
  
    <p> {'Total answers: ' +result+' '} </p>  
    <p> {'Number of Correct answers:'+result1+' '} </p> 
    <p> {'Number of Incorrect answers: '+result2+' '} </p>  
    <p> {'Result: '+result3+' '} </p> 
   
  </div> )
}
export default Result;
