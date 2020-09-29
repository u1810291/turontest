import React,{useState,useEffect} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {FileReducer} from "../../../store/reducers/FileUploadReducer";

import { languages } from "../../../utils/constants";
import "./fileUploader.css";

function QuestionUpload(props) {
    const [data, dispatch] = React.useReducer(
        FileReducer, { dropDepth: 0, inDropZone: false, fileList: [] }
    );
    const [file,setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [time,setTime] = useState(0);
       
    function submitForm(contentType, data, setResponse) {
        
        axios({
            url: `http://172.16.1.188:8000/questions/upload/${title}/${time}`,
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
                   
                    props.history.push('/Admin/QuestionCategories');
                } else{
                    props.history.push('/user/assignedtests');
                }  
            }
           
            
        }).catch((error) => {
            setResponse(error);
        })
    
    }
    function uploadWithFormData(e) {
        e.preventDefault()
        if(file){
            const formData = new FormData();
            console.log('log1');
            formData.append("title", title);
            formData.append("excel", file);
            console.log('log2');
            submitForm("application/x-www-form-urlencoded", formData, (msg) => console.log(msg));
            console.log('log3',formData);
            
            //console.log(file);
            
        }else{
            if(data.fileList.length === 1){
                const formData = new FormData();
                console.log('log1');
                formData.append("title", title);
                formData.append("excel", data);
                console.log('log2');
                submitForm("application/x-www-form-urlencoded", formData, (msg) => console.log(msg));
                console.log('log3',formData);
               
                //console.log(file);
            }else{
                var button = document.getElementById("snackbarfayl");
                button.className = "show";
                setTimeout(function(){ button.className = button.className.replace("show", ""); }, 3000);
            }
        }
    }
    // console.log("Data: ",data);

       
  const [news,setNew]=useState([]);
  const [category,setCategory]=useState("");
  const [question,setQuestion]=useState("");
  const [variantA,setVariantA]=useState("");
  const [variantB,setVariantB]=useState("");
  const [variantC,setVariantC]=useState("");
  const [variantD,setVariantD]=useState("");
  const [correctvariant,setCorrectVariant]=useState("");
  const [singleuptime,setsingleupTime] = useState(0);

 
  async function getQuestionCategories(){
    try{

        await axios({url: 'http://172.16.1.188:8000/questions/categories/all', method:"GET", headers: {
             "Content-Type": "application/json",
             'Authorization': `Bearer ${sessionStorage.getItem("token")}`
         }}).then(res => {
             console.log(res)
            setNew(res.data.rows);
            
         }).catch(e => {
             console.log(e);
         });
    }catch(e){
        console.log(e);
    }
}
useEffect(() => {
    //if(questions === null || questions === undefined || questions === []){
        getQuestionCategories();
    //}
}, []);

async function Submitform(e) {
    e.preventDefault()
  try {
      const body = {
        question: question,
        a:variantA,
        b:variantB,
        c:variantC,
        d:variantD,
        right_answer:correctvariant
      };
     
      // console.log(body);
      const response = await axios({
          url: `http://172.16.1.188:8000/questions/uploadSingle/${category}`, method: "POST", headers: {
              'Content-Type': "application/json",
              'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          }, data: body  
      }).then((response)=>{
        if(response.status === 200 || response.status === 201) {
         
            console.log("OK!");
        }else if(response.status === 400 || response.status === 401){
            console.log("NOT OK!");
        }else{
            console.log("ERROR!")
        }
      }).catch((e)=>{
        console.log(e);
    })
  }
  catch (error) {
      
      console.log(error)
  }
}
    return (
    <div className="container">
        <div className="uploadform mt-3 mb-4">
            <h3 className="QuestionHeading">{languages[props.language.key].Admin.upload.addQuestions}</h3>
        </div>
        <div className="questUp mt-3 mb-4 row">
            <div className="col-md-4">
                <h3 className="QuestionHeading">{languages[props.language.key].Admin.upload.CategoryName}</h3>
                <input className="Name" type="text" value={title} onChange={(e)=>{ setTitle(e.target.value) }} placeholder="IT" required={true} />
            </div>
            <div className="col-md-4">
                <h3 className="QuestionHeading">{languages[props.language.key].Admin.upload.timetocategory}</h3>
                <input className="Name" type="text" value={time} onChange={(e)=>{ setTime(e.target.value) }} placeholder="20" />
                
            </div>
            <div className="col-md-4">
                <h3 className="QuestionHeading">{languages[props.language.key].Admin.upload.Upload}</h3>
                <div>
                    <input type="file" name="file-input" id="files" className="input-file" multiple={false} onChange={(e)=>setFile(e.target.files[0])} accept=".xlsx" />
                        <label htmlFor="files" className="btn btn-success js-labelFile">
                            <span className="js-fileName">{languages[props.language.key].Admin.upload.Upload}</span>
                        </label>
                </div>
            </div>
        </div>
        <input type="button" style={{marginLeft: "45%"}} className="btn btn-success" value={languages[props.language.key].Admin.AdminUser.Save} onClick={uploadWithFormData} />
        <div id="snackbarfayl" className="mt-2 mb-2">{languages[props.language.key].Admin.upload.FileRequired}</div>
        <div className="container mb-4 mt-3">
            <div className="uploadform">
                <h3>{languages[props.language.key].Admin.upload.SingleUpload}</h3>
            </div>
            <form action='' onSubmit={Submitform}>
                <div className="input-group singleUpload" style={{alignSelf: "center"}}>
                    <div className="input-group-prepend"> <span className="input-group-text">{languages[props.language.key].Admin.upload.Question}</span>
                    </div>
                    <textarea className="form-control" type="text" aria-label="With textarea" value={question} onChange={(e)=>{setQuestion(e.target.value)}}></textarea>
                </div>
                <br/>
                <div className="input-group mb-3 singleUpload">
                    <div className="input-group-prepend"> <span className="input-group-text" id="inputGroup-sizing-sm">{languages[props.language.key].Admin.upload.VariantA}</span>
                    </div>
                    <textarea className="form-control" type="text" aria-label="With textarea" aria-describedby="inputGroup-sizing-sm" value={variantA} onChange={(e)=>{setVariantA(e.target.value)}}/></div>
                <div className="input-group mb-3 singleUpload">
                    <div className="input-group-prepend"> <span className="input-group-text" id="inputGroup-sizing-sm">{languages[props.language.key].Admin.upload.VariantB}</span>
                    </div>
                    <textarea className="form-control" type="text" aria-label="With textarea" aria-describedby="inputGroup-sizing-sm" value={variantB} onChange={(e)=>{setVariantB(e.target.value)}}/></div>
                <div className="input-group mb-3 singleUpload">
                    <div className="input-group-prepend"> <span className="input-group-text" id="inputGroup-sizing-sm">{languages[props.language.key].Admin.upload.VariantC}</span>
                    </div>
                    <textarea className="form-control" type="text" aria-label="With textarea" aria-describedby="inputGroup-sizing-sm" value={variantC} onChange={(e)=>{setVariantC(e.target.value)}}/></div>
                <div className="input-group mb-3 singleUpload">
                    <div className="input-group-prepend"> <span className="input-group-text" id="inputGroup-sizing-sm">{languages[props.language.key].Admin.upload.VariantD}</span>
                    </div>
                    <textarea className="form-control" type="text" aria-label="With textarea" aria-describedby="inputGroup-sizing-sm" value={variantD} onChange={(e)=>{setVariantD(e.target.value)}}/></div>
                <div className="input-group mb-3 singleUpload">
                    <div className="input-group-prepend"> <span className="input-group-text" id="inputGroup-sizing-sm">{languages[props.language.key].Admin.upload.RightAnswer}</span>
                    </div>
                    <textarea className="form-control" type="text" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={correctvariant} onChange={(e)=>{setCorrectVariant(e.target.value)}}/></div>
                <select className="custom-select mb-4 mt-2" name="text" value={category} onChange={(e)=>{setCategory(e.target.value) }}>
                    <option value="" defaultValue hidden>{languages[props.language.key].Admin.upload.ChooseCategory}</option>{news.map((item,its) => (
                    <option key={its} value={item.value}>{item.category}</option>))}
                </select>
                <div style={{alignSelf: "center"}}>
                    <input className="btn btn-success" type="submit" value={languages[props.language.key].Admin.AdminUser.Save} />
                </div>
            </form>
        </div>
    </div>
    )
}
const mapStateToProps = ({router,isAdmin,language}) => ({router,isAdmin,language});
export default connect(mapStateToProps)(withRouter(QuestionUpload));
