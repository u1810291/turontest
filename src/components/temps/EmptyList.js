import React from "react";
import EmptyListImg from '../../assets/img/nodata2.png';

// import { Link } from "react-router-dom";
// import App from "../App";

const EmptyList = (props) => {  
        return(
            <div className="container">
            <div className="notfound">
                <img src={EmptyListImg} alt="Пустой лист" />
                <h2>{props.emptyText}</h2>
            </div>
            </div>
        );
}
export default EmptyList;