import React,{useState, useEffect} from 'react';
import $ from 'jquery';
import axios from 'axios';
import {connect} from "react-redux";
import "../SignUp/index.css";
import {languages}  from '../../utils/constants';
// import "../../assets/css/font-awesome.min.css";
// import "../../assets/css/material.indigo-pink.min.css";
// import "../../assets/css/material.min.js";

function MaterialSignUp(props) {
  const [FormError,setErrorForm] = useState(false);
  const [branch, setBranch] = useState([]);
  const [getbranch, setGetBranch] = useState("");
  const [department, setDepartment] = useState([]);
  const [getdepartment, setGetDepartment] = useState("");
  const [selectedPosition,setSelectedPosition]=useState([])
  const [selecteddepartment, setSelectedDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [surname,setSurname] = useState("");

  const [getposition, setGetPosition] = useState([]);

  async function getCategory() {
    try {
        const response = await axios({
            url: "http://172.16.1.188:8000/users/getAttributes", method: "GET", headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        const body = await response.data;
        setPosition(body.positions);
        setDepartment(body.departments);
        setBranch(body.branches);
    }
    catch (error) {
        console.log(error);
      
    }
}
  function validation(){
    let LoginRegex = /[0-9]{4,}/;
    if(username === "" && password === ""){
        return true;
    }else{
        if(LoginRegex.test(username) && LoginRegex.test(password)){
            console.log("Valid!");
            return true;
        }else{
            console.log("Invalid!");
            return false;
        }
    }   
  }
const handleChangebranch = event => {
        
  const body = {
      branch: getbranch,
  };
  axios({
      url: "http://172.16.1.188:8000/users/getBranch", method: "POST", headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }, data: body 
     
  }).then(res=>{
      setSelectedDepartment(res.data.departments)
  }).catch((e)=>{
      console.log(e);
  })
}
const handleChangeposition = event => {
    
  const body = {
      department:getdepartment,
  };
  axios({
      url: "http://172.16.1.188:8000/users/getPosition", method: "POST", headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }, data: body 
     
  }).then(res=>{
      setSelectedPosition(res.data.positions)
  }).catch((e)=>{
      console.log(e);
  })
}
  async function Submitform(e) {
    try {
        e.preventDefault();
        if(validation()){
          const body = {
            surname: surname,
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            branch: getbranch,
            department: getdepartment,
            position: getposition, 
            isActive: 1,
            isAdmin: 0
          };
          console.log(body);
          await axios({
              url: "http://172.16.1.188:8000/users/signup", method: "POST", headers: {
                  'Content-Type': "application/json",
                  'Authorization': `Bearer ${sessionStorage.getItem("token")}`
              }, data: body  
          }).catch((e)=>{
              console.log(e);
          });
      }else {
        
      }
    }
    catch (error) {
        console.log(error)
    }
  }
  
  useEffect(()=>{
    if(getdepartment <= 0 && getposition <= 0 && getbranch <=0){
        getCategory();
    }
  },[]);

  return (
<div class="container">
  <form onSubmit={Submitform}>   
      <div className="col-md-12 row mt-4 mb-4">
        <div className="col-md-6">   
            <h5 className="signUpHeader">{languages[props.language.key].Admin.UserList.Name}</h5>   
            <div className="nav justify-content-start">
              <input className="form-control" id="myInput" type="text" placeholder="Азиз" value={firstname}   onChange={e => setFirstname(e.currentTarget.value)} />
            </div>
            <h5 className="signUpHeader">{languages[props.language.key].Admin.UserList.Surname}</h5>
            <div className="nav justify-content-start">
              <input className="form-control" id="myInput" type="text" placeholder="Азизиов" value={surname}   onChange={e => setSurname(e.currentTarget.value)} />
            </div>
            <h5 className="signUpHeader">{languages[props.language.key].Admin.UserList.LastName}</h5>
            <div className="nav justify-content-start">
              <input className="form-control" id="myInput" type="text" placeholder="Азизижон ўғли" value={lastname}   onChange={e => setLastname(e.currentTarget.value)} />
            </div>
          <div class="form-group">
            <h5 className="signUpHeader">{languages[props.language.key].Admin.AdminUser.branch}</h5>
            <select className="form-control" name="branch" value={getbranch} onChange={(e)=>{ setGetBranch(e.target.value) }} onClick={handleChangebranch}>
              <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{branch.map((item,its) => (
                  <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.branch }}></option>))}
            </select>
          </div>
          
          <div class="form-group">
            <h5 className="signUpHeader">{languages[props.language.key].Admin.AdminUser.Department}</h5>
            <select className="form-control" name="department" value={getdepartment} onChange={(e)=>{ setGetDepartment(e.target.value) }}  onClick={handleChangeposition}>
              <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.ChooseDepartment}</option>{selecteddepartment.map((item,its)=> (
                  <option key={its} value={item.value} dangerouslySetInnerHTML = { {__html: item.department} }></option>))}
            </select>
          </div>
          <div class="form-group">
            <h5 className="signUpHeader">{languages[props.language.key].Admin.AdminUser.Position}</h5>
            <select className="form-control" name="position" defaultValue={getposition} onChange={(e)=>{ setGetPosition(e.target.value) }}>
              <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.ChoosePosition}</option>{selectedPosition.map((item,its) => (
                  <option key={its} value={item.value} dangerouslySetInnerHTML= { {__html: item.position }}></option>))}
            </select>
          </div>
        </div>
        
        <div className="col-md-6">
            <h5 className="signUpHeader">{languages[props.language.key].Admin.UserList.LoginName}</h5>
            <div className="nav justify-content-start">
              <input className="form-control" id="myInput" type="text" placeholder={languages[props.language.key].Admin.UserList.LoginName}  value={username}   onChange={e => setUsername(e.currentTarget.value)}  required autoFocus/>
            </div>
            <h5 className="signUpHeader">{languages[props.language.key].Admin.UserList.Password}</h5>
            <div className="nav justify-content-start">
              <input className="form-control" id="myInput" type="password"  placeholder={languages[props.language.key].Admin.UserList.Password} value={password} onChange={e => setPassword(e.currentTarget.value)} required />
          </div>
        </div>
        
    </div>
    <div className="col-md-12">
      <button type="submit" className="btn btn-outline-danger" style={{width: "50%",marginRight: "25%",marginLeft: "25%"}}>{languages[props.language.key].Admin.AdminUser.Save}</button>
    </div>
  </form>
</div>
  )
}
const mapStateToProps = ({isAdmin,router,language}) => ({isAdmin,router,language});
export default connect(mapStateToProps)(MaterialSignUp);