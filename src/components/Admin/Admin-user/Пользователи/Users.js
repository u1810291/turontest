import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import UserPagination from './UserPagination';
import UserDetailed from './UsersList';
import { languages } from "../../../../utils/constants";


const Users = (props) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    useEffect(() => {
        
            setLoading(true);
           axios({url: 'http://172.16.1.188:8000/users/all', method:"GET", headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }}).then(res => {
                // console.log(res)
                setUsers(res.data.rows);
                setLoading(false);
            }).catch(e => {
                console.log(e);
            

            });
            
    
}, []);

    // get curent users

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // change page

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // userupload

    const [file,setFile] = useState(null);
    function submitForm(contentType, data, setResponse) {
        axios({
            url: `http://172.16.1.188:8000/users/upload/`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': contentType,
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            setResponse(response.data);
            
            if(props.isAdmin.LoggedIn){
                if(props.isAdmin.data.isAdmin){
                //   alert('Спaсибо Файл Загружен')
                   
                    props.history.push('/Admin/UsersList');
                } else{
                    props.history.push('/Admin/UsersList');
                }  
            }
           
            
        }).catch((error) => {
            setResponse(error);
        })
    
    }
    function uploadWithFormDataUser() {
        if(file){
            const formData = new FormData();
            console.log('log1');
        
            formData.append("excel", file);
            console.log('log2');
            submitForm("application/x-www-form-urlencoded", formData, (msg) => console.log(msg));
            console.log('log3',formData);
            
            console.log(file);
            
        }else{
            
                var button = document.getElementById("snackbarfayl");
                button.className = "show";
                setTimeout(function(){ button.className = button.className.replace("show", ""); }, 3000);
            
        }
    }

    return (

        <div className='container mb-4'>
            <h3>{languages[props.language.key].Admin.Users.Users}</h3>
            <div className="border" style={{border: "1px solid black",width: "100%",padding: "10px"}}>
                    <div className="row">
                        <div className="col-md-4 align-self-center">
                            <input  type="file" name="file-input" id="files" className="input-file" multiple={false} style={{marginLeft: "85%"}} onChange={(e)=>setFile(e.target.files[0])} accept=".xlsx" />
                            <label htmlFor="files" className="btn btn-success js-labelFile">
                                <span className="js-fileName">{languages[props.language.key].Admin.upload.Upload}</span>
                            </label>
                        </div>
                        
                        <div className="col-md-4 row">
                            <input type="button" className="btn btn-success" value={languages[props.language.key].Admin.AdminUser.Save} onClick={uploadWithFormDataUser} />
                        </div>
                </div>
            </div>
            <UserDetailed users={currentUsers} loading={loading} setUsersPerPage={setUsersPerPage}/>
            <UserPagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
        </div>

    );
}

const mapStatetoProps = ({ isAdmin,router,language}) => ({isAdmin,router,language});
export default connect(mapStatetoProps)(Users);