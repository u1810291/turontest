import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import $ from 'jquery';

import './GroupCreate.css';
import "react-datepicker/dist/react-datepicker.css";
import {languages } from "../../../../utils/constants";

window.$ = $;


const GroupCreate = (props) => {
  

    const [selectedPosition,setSelectedPosition]=useState([])
    const [selecteddepartment, setSelectedDepartment] = useState([]);
    const [branch, setBranch] = useState([]);
    const [getbranch, setGetBranch] = useState("");
    const [getbranchmulti, setGetBranchmulti] = useState([]);
    const [getdepartmentmulti, setGetDepartmentmulti] = useState([]);
    // const [getMultiplebranch, setGetMultipleBranch] = useState([]);
    const [groupname, setgroupname] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState();
    const [department, setDepartment] = useState([]);
    const [getdepartment, setGetDepartment] = useState("");
    const [position, setPosition] = useState([]);

    const [getposition, setGetPosition] = useState([]);

    const [checkbox, setCheckbox] = useState([]);

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
                setPosition(body.positions);
                setDepartment(body.departments);
                setBranch(body.branches);
            }
            catch (error) {
                console.log(error);
              
            }
        }
        if(getdepartment <= 0 && getposition <= 0 && getbranch <=0){
            getCategory();
        }

        async function getCheckbox() {
            try {
                const response = await axios({
                    url: "http://172.16.1.188:8000/questions/categories", method: "GET", headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
                const body = await response.data.categories;
                setCheckbox(body);
            }
            catch (error) {
                console.log(error)
            }
        }
        if(checkbox.length <= 0){
            getCheckbox();
        }
    }, []);

    const [checkedItems, setCheckedItems] = useState([]);

    const handleChangebranch = event => {
        
        const body = {
            branch: getbranch,
        };
       
        // console.log(body);
        axios({
            url: "http://172.16.1.188:8000/users/getBranch", method: "POST", headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }, data: body 
           
        }).then(res=>{
            setSelectedDepartment(res.data.departments)
            // console.log(res.data.departments[0].department)
            // console.log(selecteddepartment[0].department)
            // console.log(res);
        }).catch((e)=>{
            console.log(e);
        })
   
   
        // props.history.push(  <button className="material-button" onClick={()=> props.history.push('/Admin')}>Главная</button>)
    }
  
const handleChangeposition = event => {
    
    const body = {
        department:getdepartment,
    };
   
    // console.log(body);
    axios({
        url: "http://172.16.1.188:8000/users/getPosition", method: "POST", headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }, data: body 
       
    }).then(res=>{
        setSelectedPosition(res.data.positions)
        // console.log(res.data.positions[0].position)
    
        // console.log(res);
    }).catch((e)=>{
        console.log(e);
    })


    // props.history.push(  <button className="material-button" onClick={()=> props.history.push('/Admin')}>Главная</button>)
}

    function selecetiveCheck(event) {
        let max = 3;
        let checkedChecks = document.querySelectorAll(".control:checked");
        
        if (checkedChecks.length >= max + 1){
            return false;
        }
    }

    const handleChange = event => {
        var checkboxes = document.querySelectorAll(".control");
        let checked = [];
        
        for (var i = 0; i < checkboxes.length; i++){
            
            checkboxes[i].onclick = selecetiveCheck;
            if(checkboxes[i].checked){
                checked.push(checkboxes[i].value);
            }
        }
        setCheckedItems({
            ...checkedItems,
            checked
        });
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
      
    async function Submitform(e) {
        try {
            e.preventDefault();
            const body = {
                groupname: groupname,
                deadline_start:startDate,
                deadline_end:endDate,
                branch: getbranch,
                department: getdepartment,
                position: getposition,
                questionCategories: checkedItems.checked

                
            };
            const response = await axios({
                url: "http://172.16.1.188:8000/groups/create", method: "POST", headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }, data: body  
            }).catch((e)=>{
                console.log(e);
                alert("mavjud guruh tanlangan")
            })
       
            if(props.isAdmin.LoggedIn){
                if(props.isAdmin.data.isAdmin){                   
                    props.history.push('/Admin/Groups/');
                } else{
                    props.history.push('/user/assignedtests');
                }  
            }
        }
        catch (error) {
            
            console.log(error)
        }
    }
    async function SubmitMultipleform(e) {
       
        try {
            e.preventDefault();
            const bodyy = {
                groupname: groupname,
                deadline_start:startDate,
                deadline_end:endDate,
                branches: getbranchmulti,
                questionCategories: checkedItems.checked
     
            };
            const response = await axios({
                url: "http://172.16.1.188:8000/groups/createMultiBranch", method: "POST", headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }, data: bodyy  
            }).catch((e)=>{
                console.log(e);
                alert("mavjud guruh tanlangan")
            })
       
            if(props.isAdmin.LoggedIn){
                if(props.isAdmin.data.isAdmin){                   
                    props.history.push('/Admin/Groups/');
                } else{
                    props.history.push('/user/assignedtests');
                }  
            }
        }
        catch (error) {
            
            console.log(error)
        }
    }

    async function SubmitMultipleformdepartment(e) {
       
        try {
            e.preventDefault();
            const bodyy = {
                groupname: groupname,
                deadline_start:startDate,
                deadline_end:endDate,
                branches: getbranchmulti,
                departments: getdepartmentmulti,
                questionCategories: checkedItems.checked
     
            };
            const response = await axios({
                url: "http://172.16.1.188:8000/groups/createSet", method: "POST", headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }, data: bodyy  
            }).catch((e)=>{
                console.log(e);
                alert("mavjud guruh tanlangan")
            })
       
            if(props.isAdmin.LoggedIn){
                if(props.isAdmin.data.isAdmin){                   
                    props.history.push('/Admin/Groups/');
                } else{
                    props.history.push('/user/assignedtests');
                }  
            }
        }
        catch (error) {
            
            console.log(error)
        }
    }
// MultiSelect Form
    function MultiSelect(e) {
        // const selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value)
        const selectedOptions = [...e.target.selectedOptions].map((o) => o.value);
        setGetBranchmulti(selectedOptions);
      }
// MultiSelect Form for department
function MultiSelectdepartment(e) {
    // const selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value)
    const selectedOptions = [...e.target.selectedOptions].map((o) => o.value);
    setGetDepartmentmulti(selectedOptions);
  }
  function MultiSelectQuestion(e) {
    // const selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value)
    const selectedOptions = [...e.target.selectedOptions].map((o) => o.value);
    setGetDepartmentmulti(selectedOptions);
  }
    return (
        <div className="container mb-4">
        <form action="" onSubmit={Submitform}>
            <div className="head">
                <div className="form-group">
                    <h4>{languages[props.language.key].Admin.AdminUser.GroupCreate}</h4>
                    <h6>{languages[props.language.key].Admin.AdminResult.CreateGroupByOne}</h6>
                    <div className="flex1">
                        <div className="group-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.GroupCreate}</h5>
                            <input className="groupname" type="text" onChange={(e)=>{ setgroupname(e.target.value) }} />
                            <h5>{languages[props.language.key].Admin.AdminUser.Teststart}</h5>
                            <input className="groupname " name="date_start" type="datetime-local" onChange={starthandle} />
                            <h5>{languages[props.language.key].Admin.AdminUser.TestEnd}</h5>
                            <input className="groupname" name="date_end" type="datetime-local" onChange={endhandle} />
                        </div>
                        <div className="group2-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.branch}</h5>
                            <select className="groupname " name="branch" value={getbranch} onChange={(e)=>{ setGetBranch(e.target.value) }} onClick={handleChangebranch}>
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{branch.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.branch }}></option>))}</select>
                            <br/>
                            <h5>{languages[props.language.key].Admin.AdminUser.Department}</h5>
                            <select className="groupname " name="department" value={getdepartment} onChange={(e)=>{ setGetDepartment(e.target.value) }}  onClick={handleChangeposition}>
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.ChooseDepartment}</option>{selecteddepartment.map((item,its)=> (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = { {__html: item.department} }></option>))}</select>
                            <br/>
                            <h5>{languages[props.language.key].Admin.AdminUser.Position}</h5>
                            <select className="groupname" name="position" defaultValue={getposition} onChange={(e)=>{ setGetPosition(e.target.value) }}>
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.ChoosePosition}</option>{selectedPosition.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML= { {__html: item.position }}></option>))}</select>
                        </div>
                    </div>
                    <br/>
                    <h6>{languages[props.language.key].Admin.AdminUser.QuestionCategory}</h6>
                    <div className="group4-flexbox">
                        <div className="row-md-4 d-flex flex-wrap">{checkbox.map((item,its) => (
                            <div key={its} style={{lineHeight: "normal",backgroundColor: "rgb(253, 253, 253)",margin: "5px",border: "0.5px solid rgb(200, 200, 200)",borderRadius: "10px",padding: "4px"}}> <span style={{fontSize: "18px"}}>{item.category}</span>
                                <label className="switch">
                                    <input className="control" type="checkbox" value={item.category} checked={checkedItems[item.category]} onChange={handleChange} /> <span className="slider round"></span>
                                </label>
                            </div>))}</div>
                    </div>
                </div>
                <input type="button" style={{marginLeft: "45%"}} className="btn btn-success" value={languages[props.language.key].Admin.AdminUser.Save} onClick={Submitform} />
            </div>
        </form>
        <hr className="mt-2 mb-3" style={{ color: "black" }} />
        <form action="" onSubmit={SubmitMultipleform}>
            <div className="head">
                <div className="form-group">
                    <h4>{languages[props.language.key].Admin.AdminUser.GroupCreate}</h4>
                    <h6>{languages[props.language.key].Admin.AdminResult.CreateGroupByMany}</h6>
                    <div className="flex1">
                        <div className="group-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.GroupCreate}</h5>
                            <input className="groupname" type="text" onChange={(e)=>{ setgroupname(e.target.value) }} />
                            <h5>{languages[props.language.key].Admin.AdminUser.Teststart}</h5>
                            <input className="groupname " name="date_start" type="datetime-local" onChange={starthandle} />
                            <h5>{languages[props.language.key].Admin.AdminUser.TestEnd}</h5>
                            <input className="groupname" name="date_end" type="datetime-local" onChange={endhandle} />
                        </div>
                        <div className="group2-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.branch}</h5>
                            <select className="groupname " name="branch" value={getbranchmulti}   multiple={true}
                    onChange={(e) => MultiSelect(e)} >
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{branch.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.branch }}></option>))}</select>
                            <br/>
                          
                          
                        </div>
                    </div>
                    <br/>
                    <h6>{languages[props.language.key].Admin.AdminUser.QuestionCategory}</h6>
                    <div className="group4-flexbox">
                        <div className="row-md-4 d-flex flex-wrap">{checkbox.map((item,its) => (
                            <div key={its} style={{lineHeight: "normal",backgroundColor: "rgb(253, 253, 253)",margin: "5px",border: "0.5px solid rgb(200, 200, 200)",borderRadius: "10px",padding: "4px"}}> <span style={{fontSize: "18px"}}>{item.category}</span>
                                <label className="switch">
                                    <input className="control" type="checkbox" value={item.category} checked={checkedItems[item.category]} onChange={handleChange} /> <span className="slider round"></span>
                                </label>
                            </div>))}</div>
                    </div>
                </div>
                <input type="button" style={{marginLeft: "45%"}} className="btn btn-success" value={languages[props.language.key].Admin.AdminUser.Save} onClick={SubmitMultipleform} />
            </div>
        </form>
        <hr className="mt-2 mb-3" style={{ color: "black" }} />
        <br/>
           {/* <form action="" onSubmit={SubmitMultipleformdepartment}>
            <div className="head">
                <div className="form-group">
                    <h4>{languages[props.language.key].Admin.AdminUser.GroupCreate}</h4>
                    <h6>Hamma filial va lavozim bo'yicha guruh yaratish</h6>
                    <div className="flex1">
                        <div className="group-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.GroupCreate}</h5>
                            <input className="groupname" type="text" onChange={(e)=>{ setgroupname(e.target.value) }} />
                            <h5>{languages[props.language.key].Admin.AdminUser.Teststart}</h5>
                            <input className="groupname " name="date_start" type="datetime-local" onChange={starthandle} />
                            <h5>{languages[props.language.key].Admin.AdminUser.TestEnd}</h5>
                            <input className="groupname" name="date_end" type="datetime-local" onChange={endhandle} />
                        </div>
                        </div>
                        <div className="group-flexbox">
                            <h5>{languages[props.language.key].Admin.AdminUser.branch}</h5>
                            <select className="groupname " name="branch" value={getbranchmulti}   multiple={true}
                    onChange={(e) => MultiSelect(e)} >
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{branch.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.branch }}></option>))}</select>
                            <br/>
                          
                          
                        </div>
                      
                        <div className="group-flexbox">
                        <h5>{languages[props.language.key].Admin.AdminUser.Department}</h5>
                        
                            <select className="groupname " name="department" value={getdepartmentmulti}   multiple={true}
                    onChange={(e) => MultiSelectdepartment(e)} >
                                <option value="" defaultValue hidden>{languages[props.language.key].Admin.AdminUser.Choosebranch}</option>{department.map((item,its) => (
                                <option key={its} value={item.value} dangerouslySetInnerHTML = {{ __html: item.department }}></option>))}</select>
                            <br/>
                          
                          
                        </div>
                  
                    <br/>
                    <h6>{languages[props.language.key].Admin.AdminUser.QuestionCategory}</h6>
                    <div className="group4-flexbox">
                        <div className="row-md-4 d-flex flex-wrap">{checkbox.map((item,its) => (
                            <div key={its} style={{lineHeight: "normal",backgroundColor: "rgb(253, 253, 253)",margin: "5px",border: "0.5px solid rgb(200, 200, 200)",borderRadius: "10px",padding: "4px"}}> <span style={{fontSize: "18px"}}>{item.category}</span>
                                <label className="switch">
                                    <input className="control" type="checkbox" value={item.category} checked={checkedItems[item.category]} onChange={handleChange} /> <span className="slider round"></span>
                                </label>
                            </div>
                            // <select className="groupname " name="branch"  
                            // onChange={(e) => MultiSelectQuestion(e)} >
                            //             <option value="" defaultValue hidden></option>{checkbox.map((item,its) => (
                            //             <option key={its} value={item.value} checked={checkedItems[item.category]}  dangerouslySetInnerHTML = {{ __html: item.category}}></option>))}</select>
                            ))}</div>
                    </div>
                </div>
                <input type="button" style={{marginLeft: "45%"}} className="btn btn-success" value={languages[props.language.key].Admin.AdminUser.Save} onClick={SubmitMultipleformdepartment} />
            </div>
        </form> */}
        <hr className="mt-2 mb-3" style={{ color: "black" }} />
        <div id="snackbarfayl">{languages[props.language.key].Admin.AdminUser.Nomorethan3category}</div>
    </div>
    )

}

const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(withRouter(GroupCreate));