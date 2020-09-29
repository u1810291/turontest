import React, { useState, useEffect} from 'react';
import { connect } from "react-redux";
import {requestGetAdminPermissions} from "../../store/actions/AdminActions";
import Logo from '../../assets/img/header__logo.svg'
import { LoginLoader } from "../../components/temps/Loader";
import './login.css';

const  Login = (props) => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [FormError,setErrorForm] = useState(false);
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
    const onSubmit = async e => {
        e.preventDefault();
        try{
            if(validation()){
                let data = await props.requestGetAdminPermissions(username,password,props,setErrorForm);
            }else {
                setErrorForm(true);
            }
        }catch(e){
            console.log(e);
        }
    };
    
    useEffect(() => {
        sessionStorage.clear();
    }, [])

     return (
       
        /* <div id="cover-caption">
            <div className="container">
                <div className="row text-white">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4"> 
                        <div className="px-2">
                            <form className="form-signin" onSubmit={onSubmit}>
                     
                                <br />
                                {FormError ? <div className="ErrorField ">
                                        <p style={{fontSize:"20px",color: "red",backgroundColor:"white"}}>Неверное имя пользователя или пароль</p>
                                    </div>
                                    : null
                                }
                                <input style={{margin:"0px",opacity:"0.95"}} type="text"  required title="заполните это поле" className="Customform-control LoginInput" placeholder="Логин"
                                    value={username}
                                    onChange={e => setUsername(e.currentTarget.value)} />
                                <br />
                                <input type="password" style={{margin:"0px",opacity:"0.95"}} required className="Customform-control LoginInput" placeholder="Пароль"
                                    value={password}
                                    onChange={e => setPassword(e.currentTarget.value)}   />
                                    <br />
                                    {props.isAdmin.loading ? <LoginLoader width={20} height={20} /> : <button  className="btn btn-success" type="submit">Войти</button> }
                                    <br/>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div> */
        
        <div className="login-bg" >
        
        <div className="container" >
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card-signin my-5">
          <div className="card-body">
            <form className="form-signin"  onSubmit={onSubmit}>
                {/* <logo /> */}
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
            <h5 className="card-title text-center">Авторизация доступа</h5>

                <br/>
                {FormError ? <div className="ErrorField ">
                                        <p style={{fontSize:"20px",color: "red",backgroundColor:"white"}}>Неверное имя пользователя или пароль</p>
                                    </div>
                                    : null
                                }
              <div className="form-label-group">
                <input type="username" id="inputlogin" className="form-control"  placeholder="Логин" value={username}   onChange={e => setUsername(e.currentTarget.value)}  required autoFocus />
                <label for="inputlogin">Логин</label>
              </div>

              <div className="form-label-group">
                <input type="password" id="inputPassword" className="form-control"   value={password}
                                    onChange={e => setPassword(e.currentTarget.value)} placeholder="Пароль" required />
                <label for="inputPassword">Пароль</label>
              </div>
              {/* <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button> */}
              <br />
                                    {props.isAdmin.loading ? <LoginLoader width={20} height={20} /> : <button  className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Войти</button> }
                                    <br/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
   </div>
    );
}
const mapStateToProps = ({ isAdmin,router }) => ({ isAdmin,router });
export default connect(mapStateToProps,{ requestGetAdminPermissions })(Login);