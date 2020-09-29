import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Editusers = (props) => {

    const [edituser, setEdituser] = useState({id:'', branch: '', department: '', position: '' ,});
    const additional = props.match.params.id;
    const [id, setIDD] = (additional);
  
    useEffect(() => {

        async function GetDataUsers() {
            try {
                const res = await axios({

                    url: `http://172.16.1.188:8000/user/${id}`,
                    method: 'get',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
                const body = await (res.data)
                setEdituser(body);
                console.log(res.data);

            }
            catch (error) {
                console.log(error);
            }

        }
        GetDataUsers();
    }, []);


    const UpdateUser = (e) => {
        e.preventDefault();
        
        try {

            const data = {branch: edituser.branch, department: edituser.department, position: edituser.position };
            axios({
                url: `http://172.16.1.188:8000/users/edit/${id}`, method: "PATCH", headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`

                }, data})
            console.log(data)
            props.history.push('/Пользователи/');
        } catch (error) {
            console.log(error)
        }

    };

    const onChange = (e) => {
        e.persist();
        setEdituser({ ...edituser, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mb-4'>
            <form onSubmit={UpdateUser}  style={{marginTop: "20px",marginBottom:"20px"}}>
                <h1 style={{color: "dodgerblue"}}>Update user</h1>

                <div className='container mb-4'>
                    <div class="row">
                        <div className="col-md-2"></div>
                        <div className="mt-5 mb-5 inputdes col-md-4">
                            <div className="col-md-4">
                                <span>ID:</span>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" name="id" id="id" placeholder="id" value={edituser.id} onChange={onChange} />
                            </div>
                        </div> 
                        
                        <div className="mt-5 mb-5 inputdes col-md-4">
                            <div className="col-md-4">
                                <span>Департамент</span>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" placeholder="department" name="department" id="department" value={edituser.department} onChange={onChange} />
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="inputdes container">
                        <div class="row">
                            <div className="col-md-2"></div>
                            <div className="mb-5 inputdes col-md-4">
                                <div className="col-md-4">
                                    <p>Филиал</p>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" placeholder="branch" name="branch" id="branch" value={edituser.branch} onChange={onChange} />
                                </div>
                            </div>
                            <div className="    mb-5 inputdes col-md-4">
                                <div className="col-md-4">
                                    <p>Дольжность</p>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" placeholder="position" name="position" id="position" value={edituser.position} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="inputdes">
                        <p>surname</p>
                        <input type="text" name="surname" id="surname" placeholder="surname" value={edituser.surname} onChange={onChange} />
                    </div>
                    <div className="inputdes">
                        <p>firstname</p>
                        <input type="text" name="firstname" id="firstname" placeholder="firstname" value={edituser.firstname} onChange={onChange} />
                    </div>
                    <div className="inputdes">
                        <p>lastname</p>
                        <input type="text" name="lastname" id="lastname" placeholder="lastname" value={edituser.lastname} onChange={onChange} />
                    </div>
                    <div className="inputdes">
                        <p>username</p>
                        <input type="text" name="username" id="username" placeholder="username" value={edituser.username} onChange={onChange} />
                    </div> 
                     <div className="inputdes">
                        <p>isActive</p>
                        <input type="text" name="isActive" id="isActive" placeholder="isActive" value={edituser.isActive} onChange={onChange} />
                    </div>
                    <div className="inputdes">
                        <p>isAdmin</p>
                        <input type="text" name="isAdmin" id="isAdmin" placeholder="isAdmin" value={edituser.isAdmin} onChange={onChange} />
                </div>*/}
                    {/* <div className="inputdes">
                        <p>groupId</p>
                        <input type="text" name="groupId" id="groupId" placeholder="groupId" value={edituser.groupId} onChange={onChange} />
                    </div>  */}
                    <div className="row mt-2 mb-2">
                        <div class="col-md-4"></div>
                        <div className="col-md-4">
                            <div className="col-md-6 row mb-4">
                                <button type="submit" className="material-button" style={{width: "100%"}}><span>Сохранить</span></button>
                            </div>
                            <div className="col-md-6 row mb-4">
                                <button className="material-button" style={{width: "100%"}}><span>Отмена</span></button>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}
export default Editusers;